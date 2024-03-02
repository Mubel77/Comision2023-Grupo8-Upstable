const { title } = require("process");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const db = require("../database/models/index.js");
const { log } = require("console");

const userController = {
  register: function (req, res, next) {
    res.render("users/register", {
      title: "Registro",
      subtitulo: "Registrate",
    });
  },

  createUser: function (req, res, next) {
    const errors = validationResult(req);
    console.log("Esto es BODYY:", req.body);
    if (!errors.isEmpty()) {
      console.log("HAY ERRORES", errors);
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
          console.log("NEW USER....!! :", usuario);
          const { nombre_calle, numero_calle } = req.body;
          //const id_usuario = usuario.id;
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
      console.log("HAY ERRORES EN LOGIN:", errores);
      res.render("./users/login", {
        errores: errores.mapped(),
        old: req.body,
        title: "Login",
      });
    } else {
      console.log("PASO, NO HAY ERRORES");
      const { email } = req.body;
      db.Usuario.findOne({
        attributes: { exclude: ["password"] },
        where: {
          email,
        },
      })
        .then((user) => {
          req.session.user = user.dataValues;
          res.cookie("user", user, { maxAge: 1000 * 60 * 10 });

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

  // contralador de la actualizacion de usuario
  formUpdateUser: (req, res) => {
    const {email} = req.session.user
    const user = db.Usuario.findOne({
      where:{email:email},
      include:[
        {model: db.Direccion, as:'direcciones'},
        {model: db.Telefono, as:'telefonos'}
      ]
    });
    const domicilios = db.Direccion.findAll({
      where:{id_usuario:req.session.user.id},
      include:[{model: db.Usuario, as:'usuarios'}]
    });
    const telefonos = db.Telefono.findAll({
      where:{id_usuario:req.session.user.id},
      include:[{model: db.Usuario, as:'usuarios'}]
    });

    Promise.all([user,domicilios,telefonos])
      .then((usuario)=>{
        console.log('This is PROMISE ALL....',usuario);
        res.render("./users/formUpdateUser", {
        title: "Editar Usuario",
        subtitulo: "Editar Usuario",
        user: req.session.user,
        usuario
        })
      })

  },
  //Proceso de actualizacion de usario del 6 sprint(Mauricio)
  processUpdate: (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, email, domicilio, age, date, categoria } =
      req.body;
    const image = req.file ? req.file.filename : req.body.image; // corregir acceso a la imagen
    db.Usuario.update(
      {
        nombre: nombre.trim(),
        apellido: apellido.trim(),
        email: email.trim(),
        domicilio,
        age,
        date,
        image,
        categoria,
      },
      {
        where: {
          id,
        },
      }
    )
      .then((userUpdate) => {
        if (userUpdate.categoria) {
          res.redirect(`/users/perfilAdmin/${id}`);
        } else {
          res.redirect(`/users/perfilUser/${id}`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  perfilAdmin: function (req, res, next) {
    res.render("users/perfil-admin", {
      title: "Mi Perfil",
      usuario: req.session.user,
    });
    console.log("This is sessionUsuario....", { usuario: req.session.user });
  },

  perfilUser: function (req, res, next) {
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
