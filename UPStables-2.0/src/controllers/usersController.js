const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const db = require("../database/models/index.js");
const { parse, format } = require("@formkit/tempo");
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
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
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
        nombre_calle,
        numero_calle,
        prefijo,
        numero,
        email,
        password,
        fecha_nacimiento,
        rol_id,
      } = req.body;
      const newAdmin = {
        rol_id,
        nombre,
        apellido,
        email,
        imagen:"/images/users/user-default.png",
        fecha_nacimiento: fecha_nacimiento,
        password: bcrypt.hashSync(password, 10)
      };
      db.Usuario.create(newAdmin)
        .then(admin => {
          const nuevoDomicilio = {
            id_usuario: admin.id,
            nombre_calle,
            numero_calle
          };
          db.Direccion.create(nuevoDomicilio)
            .then(()=> {
              const nuevoTelefono = {
                id_usuario: admin.id,
                prefijo,
                numero
              }
              db.Telefono.create(nuevoTelefono)
                .then(()=>{
                  res.redirect('/users/dashboard')
                })
             })
             .catch((error)=> console.log(error))
        })
        .catch((error)=> console.log(error))
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
            res.cookie("rememberMe", "true", { maxAge: 1000 * 60 * 30 });
          }
          res.redirect("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },

  dashboardUsers: function (req, res, next) {
    db.Usuario.findAll({
      include: [
        { model: db.Rol, as: "roles" },
        { model: db.Direccion, as: "direcciones" },
        { model: db.Telefono, as: "telefonos" },
      ],
    })
      .then((usuarios) => {
        const users = usuarios.forEach(user => {
          let dato = user.dataValues.fecha_nacimiento         
          let fecha = format(dato,"DD/MM/YYYY");
          user.dataValues.fecha_nacimiento = fecha
        })
        res.render("users/dashboard", {
          title: "dashboard",
          usuarios,
          usuario: req.session.user
        });
      })
      .catch((err) => console.log(err));
  },

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
        { model: db.Rol, as: "roles" },
        { model: db.Direccion, as: "direcciones" },
        { model: db.Telefono, as: "telefonos" },
      ],
    })
      .then((usuarios) => {
        console.log(usuarios);
        res.render("users/dashboard", {
          title: "Dashboard",
          usuarios,
          usuario: req.session.user
        });
      })
      .catch((err) => console.log(err));
  },

  formUpdateUser: (req, res) => {
    db.Usuario.findByPk(req.session.user.id,{include: [
      { model: db.Rol, as: "roles" },
      { model: db.Direccion, as: 'direcciones' },
      { model: db.Telefono, as: 'telefonos' }
    ]})
      .then((respuesta) => {
        let dato = respuesta.dataValues.fecha_nacimiento
        let fecha = format(dato,"DD/MM/YYYY");
        respuesta.dataValues.fecha_nacimiento = fecha

        res.render("./users/formUpdateUser", {
          title: "Editar Usuario",
          subtitulo: "Editar Usuario",
          usuario: req.session.user,
          respuesta
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },

  processUpdate: async (req, res) => {
    try {
      const {
        nombre,
        apellido,
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
        res.render("./users/formUpdateUser", {
          title: "Editar Usuario",
          subtitulo: "Editar Usuario",
          usuario: req.session.user,
          old: req.body,
        });
      } else {
        let fecha = parse({
          date: fecha_nacimiento,
          format: "DD-MM-YYYY"
        });

        const usuarioUpdate = {
          nombre: nombre.trim(),
          apellido: apellido.trim(),
          email: email.trim(),
          imagen: req.file
            ? `/images/users/${req.file.filename}`
            : `${req.session.user.imagen}`,
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
            if (req.session.user.telefonos.length >= 1) {
              //Si existe un registro de telefono
              return await db.Telefono.update(telefUpdate, {
                where: { id_usuario: req.session.user.id },
              });
            } else {
              //Si no existe un registro de telefono
              return await db.Telefono.create(telefUpdate);
            }
          } catch (error) {
            console.log(error);
          }
        }

        Promise.all([actualizarUsuario, actualizarDomicilio, telefono()])
          .then(() => {
            db.Usuario.findByPk(req.session.user.id,{include: [
              { model: db.Rol, as: "roles" },
              { model: db.Direccion, as: 'direcciones' },
              { model: db.Telefono, as: 'telefonos' }
            ]})
              .then((user) => {
//res.send(user)
                req.session.user = user;
                res.cookie("user", user, { maxAge: 1000 * 60 * 30 });
                if (user.roles.id == 1){
                res.render("./users/perfilClient", {
                  title: "Mi Perfil",
                  usuario: req.session.user
                });
              } else {
                res.render("./users/perfil-admin", {
                  title: "Mi Perfil",
                  usuario: req.session.user
                });
              }
              })
              .catch((err) => {
                console.log(err);
              });

          })
          .catch((err) => {
              console.log(err);
          });
      }
    } catch (error) {
      console.log(error);
    }
  },

  formUpdateAdmin: (req, res) => {
    const userId = req.params.id;
    db.Usuario.findByPk(userId, {
      include: [
        { model: db.Rol, as: "roles" },
        { model: db.Direccion, as: "direcciones" },
        { model: db.Telefono, as: "telefonos" },
      ],
      attributes: { exclude: ["password"] },
    }).then((userUpdate) => {
        let dato = userUpdate.dataValues.fecha_nacimiento
        let fecha = format(dato,"DD/MM/YYYY");
        userUpdate.dataValues.fecha_nacimiento = fecha
      res.render("./users/formUpdateAdmin", {
        title: "Editar Empleado",
        userId,
        usuario: req.session.user,
        userUpdate,
      });
    });
  },

  updateAdmin: async (req, res) => {
    try {
    const userId = req.params.id;
    const errors = validationResult(req);
    const {
      nombre,
      apellido,
      nombre_calle,
      numero_calle,
      codigo_postal,
      localidad,
      provincia,
      prefijo,
      numero,
      email,
      rol_id,
      fecha_nacimiento,
    } = req.body;

    const file = req.files

    if (!errors.isEmpty()) {
      res.render("./users/formUpdateAdmin", {
        title: "Editar Empleado",
        userId,
        usuario: req.session.user,
        errors: errors.mapped(),
        old: req.body,
      });
    } else {
      let fecha = parse({
        date: fecha_nacimiento,
        format: "DD/MM/YYYY",
      });

      const usuarioUpdate = {
        rol_id,
        nombre: nombre.trim(),
        apellido: apellido.trim(),
        email: email.trim(),
        // imagen: file
        //   ? `/images/users/${req.file.filename}`
        //   : undefined ,
        fecha_nacimiento: fecha,
      };

      const domicilioUpdate = {
        id_usuario: userId,
        nombre_calle: nombre_calle,
        numero_calle: numero_calle,
        codigo_postal: codigo_postal,
        localidad: localidad,
        provincia: provincia,
      };

      const telefUpdate = {
        id_usuario: userId,
        numero: numero,
        prefijo: prefijo,
      };

      const actualizarUsuario = await db.Usuario.update(usuarioUpdate, {
        where: { id: userId },
      });

      const actualizarDomicilio = await db.Direccion.update(domicilioUpdate, {
        where: { id_usuario: userId },
      });

      async function telefono() {
        const user = await db.Usuario.findByPk(userId, {
          include: [
            { model: db.Telefono, as: "telefonos" },
          ],
          attributes: { exclude: ["password"] }
        })
        try {
          if (user.telefonos.length >= 1) {
            //Si existe un registro de telefono
            return await db.Telefono.update(telefUpdate, {
              where: { id_usuario: user.id },
            });
          } else {
            //Si no existe un registro de telefono
            return await db.Telefono.create(telefUpdate);
          }
        } catch (error) {
          console.log(error);
        }
      }

      Promise.all([actualizarUsuario, actualizarDomicilio, telefono()])
      .then(() => {
          res.redirect("/users/dashboard");
        }
      );
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
  },

  perfilUser: function (req, res, next) {
    res.render("users/perfilClient", {
      title: "Mi Perfil",
      usuario: req.session.user
    });
  },

  logout: function (req, res, next) {
    res.clearCookie("user");
    req.session.destroy();
    return res.redirect("/");
  }
  
};

module.exports = userController;
