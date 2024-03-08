const { title } = require("process");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const db = require("../database/models/index.js");
const { log, error } = require("console");
const { parse } = require("@formkit/tempo");

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
        imagen: req.file
          ? `/images/users/${req.file.filename}`
          : "/images/users/user-default.png",
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
              res.send("No se puedo crear la direccion");
              //console.log(err);
            });
        })
        .catch((err) => {
          res.send("No se puedo crear el usuario");
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
        include: [
          { model: db.Rol, as: "roles" },
          { model: db.Direccion, as: "direcciones" },
          { model: db.Telefono, as: "telefonos" },
        ],
        attributes: { exclude: ["password"] },
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

  // contralador de la actualizacion de usuario
  formUpdateUser: (req, res) => {
    db.Usuario.findByPk(req.session.user.id)
      .then(() => {
        
        res.render("./users/formUpdateUser", {
          title: "Editar Usuario",
          subtitulo: "Editar Usuario",
          usuario: req.session.user,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  //Proceso de actualizacion de usario del 6 sprint(Santi)
  processUpdate: async (req, res) => {
    try {
      const {
        nombre,
        apellido,
        password,
        prefijo,
        numero,
        numero_calle,
        nombre_calle,
        codigo_postal,
        localidad,
        provincia,
        email,
        fecha_nacimiento,
      } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log("-->HAY ERRORES EN UPDATE<--", errors);
        res.render("./users/formUpdateUser", {
          title: "Editar Usuario",
          subtitulo: "Editar Usuario",
          usuario: req.session.user,
          errors: errors.mapped(),
          old: req.body,
        });
      } else {
        
        let fecha = parse({
          date: fecha_nacimiento,
          format: "YYYY-MM-DD HH:mm:ss",
        });
        console.log("IMAGEN:", req.file);
        const usuarioUpdate = {
          rol_id: 1,
          nombre: nombre.trim(),
          apellido: apellido.trim(),
          email: email.trim(),
          imagen: req.file ? `/images/users/${req.file.filename}`: "/images/users/user-default.png",
          fecha_nacimiento: fecha,
        };
        const domicilioUpdate = {
          id_usuario: req.session.user.id,
          nombre_calle: nombre_calle,
          numero_calle: numero_calle,
          codigo_postal: codigo_postal,
          localidad: localidad,
          provincia: provincia,
        };
        const telefUpdate = {
          id_usuario: req.session.user.id,
          numero: numero,
          prefijo: prefijo,
        };
        const actualizarUsuario = await db.Usuario.update(usuarioUpdate, {
          where: { id: req.session.user.id },
        });
        
        const actualizarDomicilio = await db.Direccion.update(domicilioUpdate, {
          where: { id_usuario: req.session.user.id },
        });
        
        async function telefono() {
          try {
            if (req.session.user.telefonos.length >= 1) { //Si existe un registro de telefono
              return await db.Telefono.update(telefUpdate, {
                where: { id_usuario: req.session.user.id },
              });
            } else { //Si no existe un registro de telefono
              return await db.Telefono.create(telefUpdate);
            }
          } catch (error) {
            console.log(error);
          }
          
        }
        Promise.all([actualizarUsuario, actualizarDomicilio, telefono()])
          .then(() => {
            res.redirect("/users/perfil-user");
          })
        }
  } catch (error) {
    console.log(error);
  }
  },
  perfilAdmin: function (req, res, next) {
    res.render("users/perfil-admin", {
      title: "Mi Perfil",
      usuario: req.session.user,
    });
    console.log("This is sessionUsuario....", { usuario: req.session.user });
  },

  perfilUser: function (req, res, next) {
    // console.log(
    //   ".........Estoy en session soy USUARIO Id ",
    //   req.session.user.id
    // );
    // console.log("-->USUARIO<--", req.session.user);
    let fechas = new Date(req.session.user.fecha_nacimiento);
    console.log("-->FECHAA<--", fechas);
    res.render("users/perfil-user", {
      title: "Mi Perfil",
      usuario: req.session.user,
      fechas: fechas,
    });
  },

  logout: function (req, res, next) {
    res.clearCookie("user");
    req.session.destroy();
    return res.redirect("/");
  },
};

module.exports = userController;
