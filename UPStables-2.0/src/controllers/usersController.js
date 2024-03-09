const { title } = require("process");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const db = require("../database/models/index.js");
const { log, error } = require("console");
const { parse } = require("@formkit/tempo") 
const { Op } = require("sequelize");


const userController = {
  register: function (req, res, next) {
    res.render("users/register", {
      title: "Registro",
      subtitulo: "Registrate",
    });
  },

  createUser: function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("users/register", {
        title: "Registro",
        subtitulo: "Registrate",
        errors: errors.mapped(),
        oldData: req.body,
      });
    } else {
      const { nombre, apellido, email, password, fecha_nacimiento } = req.body;
      const nuevoUsuario = {
        rol_id: 1,
        nombre: nombre.trim(),
        apellido: apellido.trim(),
        email: email.trim(),
        imagen: req.file ? `/images/users/${req.file.filename}` : "/images/users/user-default.png",
        fecha_nacimiento: fecha_nacimiento,
        password: bcrypt.hashSync(password, 10),
      };
      db.Usuario.create(nuevoUsuario)
        .then((usuario) => {
          const { nombre_calle, numero_calle } = req.body;
          const nuevoDomicilio = {
            id_usuario: usuario.id,
            nombre_calle: nombre_calle,
            numero_calle: numero_calle,
          };
          db.Direccion.create(nuevoDomicilio)
          .then(() => {
            res.redirect("/users/login");
          })
            .catch((err) => {
              res.send('No se puedo crear la direccion')
            //console.log(err);
          });
        })
        .catch((err) => {
          res.send('No se puedo crear el usuario')
          //console.log(err);
        });
    }
  },

  registerAdmin: function (req, res, next) {
    res.render("users/registerAdmin", {
      title: "RegistroAdmin",
      usuario: req.session.user,
    });
  },

  createUserAdmin: function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("users/registerAdmin", {
        title: "Registro",
        errors: errors.mapped(),
        oldData: req.body,
      });
    } else {
      const {
        nombre,
        apellido,
        domicilio,
        email,
        password,
        categoria,
        imagen,
        fecha_nacimiento,
        rol_id,
      } = req.body;
      const newAdmin = {
        rol_id: rol_id,
        nombre: nombre.trim(),
        apellido: apellido.trim(),
        domicilio: domicilio.trim(),
        email: email.trim(),
        imagen: req.file ? req.file.filename : "user-default.png",
        fecha_nacimiento: fecha_nacimiento,
        password: bcrypt.hashSync(password, 10),
        categoria,
      };
      db.Usuario.create(newAdmin)
        .then((newAdmin) => {
          res.redirect("/users/perfilAdmin");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },

  login: function (req, res, next) {
    res.render("users/login", { title: "Login" });
  },

  loginUp: function (req, res, next) {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      res.render("./users/login", {
        errores: errores.mapped(),
        old: req.body,
        title: "Login",
      });
    } else {
      const { email } = req.body;
      db.Usuario.findOne({
        where: {
          email,
        },
        include:[
          {model: db.Rol, as:'roles'},
          {model: db.Direccion, as:'direcciones'},
          {model: db.Telefono, as:'telefonos'}
        ],
        attributes: { exclude: ["password"] } 
      })
        .then((user) => {
          req.session.user = user;
          res.cookie("user", user, { maxAge: 1000 * 60 * 30 });
          if (req.body.remember == "on") {
            res.cookie("rememberMe", "true", { maxAge: 1000 * 60 * 5 });
          }

          res.redirect("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
// dashboard de usuarios
  dashboardUsers: function (req, res, next) {
    db.Usuario.findAll({
      include:[
        {model: db.Rol, as:'roles'},
        {model: db.Direccion, as:'direcciones'},
        {model: db.Telefono, as:'telefonos'}
      ],
    }).then((usuarios) => {
      console.log(usuarios)
      res.render("users/dashboard", {  
        title: "dashboard",
        usuarios, 
      });
    })
    .catch((err) => console.log(err));
  },
// buscador de dashboard 
dashboardSearchUsers: function (req, res, next) {
  const { keywords } = req.query;
  let whereClause = {}; 

  if (keywords) {
    whereClause = {
      [Op.or]: [
        { nombre: { [Op.like]: `%${keywords}%` } }, // Buscar por nombre
        { apellido: { [Op.like]: `%${keywords}%` } }, // Buscar por apellido
      ],
    };
  }
  db.Usuario.findAll({
    where: whereClause,
    include: [
      { model: db.Rol, as: 'roles' },
      { model: db.Direccion, as: 'direcciones' },
      { model: db.Telefono, as: 'telefonos' }
    ],
  })
  .then((usuarios) => {
    console.log(usuarios);
    res.render("users/dashboard", {
      title: "Dashboard",
      usuarios,
    });
  })
  .catch((err) => console.log(err));
},

  // contralador de la actualizacion de usuario
  formUpdateUser: (req, res) => {
    db.Usuario.findByPk(req.session.user.id)
      .then(()=>{
        res.render("./users/formUpdateUser", {
        title: "Editar Usuario",
        subtitulo: "Editar Usuario",
        usuario: req.session.user,
        })
      })
      .catch((err) => {
        console.log(err);
      });
  },
  //Proceso de actualizacion de usario del 6 sprint(Mauricio)
  processUpdate: (req, res) => {
    const { nombre, apellido, prefijo, numero, numero_calle, nombre_calle, codigo_postal, localidad, provincia, email, fecha_nacimiento } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("./users/formUpdateUser", {
        title: "Editar Usuario",
        subtitulo: "Editar Usuario",
        usuario: req.session.user,
        errors: errors.mapped(),
        old: req.body
        })
    } else {
      db.Usuario.findByPk(req.session.user.id)
      .then((usuario)=>{
        
      })
      
      let fecha = parse({
        date: fecha_nacimiento,
        format: "YYYY-MM-DD HH:mm:ss"
        });
      const usuarioUpdate = {
        rol_id: 1,
        nombre: nombre.trim(),
        apellido: apellido.trim(),
        email: email.trim(),
        imagen: req.file ? `/images/users/${req.file.filename}` : "/images/users/user-default.png",
        fecha_nacimiento: fecha
      };
      db.Usuario.update(usuarioUpdate, {where : {id: req.session.id}})
      
        .then((usuario) => {
          const domicilioUpdate = {
            id_usuario: usuario.id,
            nombre_calle: nombre_calle,
            numero_calle: numero_calle,
            codigo_postal: codigo_postal,
            localidad: localidad,
            provincia: provincia
          };
      db.Direccion.update(domicilioUpdate, {where : {id: req.session.id}})
        .then((usuario) => {
          const telefonoUpdate = {
          id_usuario: usuario.id,
          prefijo: prefijo,
          numero: numero
        }
        })
      db.Telefono.update(telefonoUpdate, {where : {id: req.session.id}})
        // 
      })
        

      // const {fecha_nacimiento} = req.body
      // let fecha = parse({
      //   date: fecha_nacimiento,
      //   format: "YYYY-MM-DD HH:mm:ss"
      //   });
      // console.log('..............................',fecha);
      // res.send(req.body)
    }
    // const image = req.file ? req.file.filename : req.body.image; // corregir acceso a la imagen
    // db.Usuario.update(
    //   {
    //     nombre: nombre.trim(),
    //     apellido: apellido.trim(),
    //     email: email.trim(),
    //     domicilio,
    //     age,
    //     date,
    //     image,
    //     categoria,
    //   },
    //   {
    //     where: {
    //       id,
    //     },
    //   }
    // )
    //   .then((userUpdate) => {
    //     if (userUpdate.categoria) {
    //       res.redirect(`/users/perfilAdmin/${id}`);
    //     } else {
    //       res.redirect(`/users/perfilUser/${id}`);
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  },
  perfilAdmin: function (req, res, next) {
    res.render("users/perfil-admin", {
      title: "Mi Perfil",
      usuario: req.session.user,
    });
    console.log("This is sessionUsuario....", { usuario: req.session.user });
  },

  perfilUser: function (req, res, next) {
    console.log(".........Estoy en session soy USUARIO Id ",req.session.user.id);
    res.render("users/perfil-user", {
      title: "Mi Perfil",
      usuario: req.session.user,
    });
  },

  logout: function (req, res, next) {
    res.clearCookie("user");
    req.session.destroy();
    return res.redirect("/");
  },
};

module.exports = userController;
