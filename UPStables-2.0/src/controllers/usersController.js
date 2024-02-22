const { title } = require('process');
const {leerArchivo,escribirArchivo} = require('../database/jsonFunctions');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const db = require('../database/models');

const userController = {
    register: function(req, res, next) {
        res.render('users/register', { title: 'Registro', subtitulo:"Registrate" });
      },

    createUser: function(req, res, next) {
        const errors= validationResult(req);
        if (!errors.isEmpty()){
          res.render('users/register', { title: 'Registro',subtitulo:"Registrate", errors:errors.mapped(), oldData:req.body});
         } else {
          const {nombre,apellido,domicilio,email,password,image} = req.body;
          const newUser = {
            nombre: nombre.trim(),
            apellido: apellido.trim(),
            domicilio: domicilio,
            email: email.trim(),
            image:req.file ? req.file.filename : "user-default.png", 
            password: bcrypt.hashSync(password,10),
          };
          db.Usuario.create(newUser)
          .then((newUser)=>{
            res.redirect('/users/login');
          })
          .catch((err)=>{
            console.log(err);
          })
          
        }
      },

    registerAdmin:  function(req, res, next) {
        res.render('users/registerAdmin', { title: 'RegistroAdmin',usuario: req.session.user});
      },

    createUserAdmin: function(req,res,next){
       const errors= validationResult(req);
       if (!errors.isEmpty()){
           res.render('users/registerAdmin', { title: 'Registro', errors:errors.mapped(), oldData:req.body});
         } else {
         const {nombre,apellido,domicilio,email,password,categoria,image} = req.body;
         const newAdmin = {
           nombre: nombre.trim(),
           apellido: apellido.trim(),
           domicilio: domicilio.trim(),
           email: email.trim(),
           image:req.file ? req.file.filename : "user-default.png", 
           password: bcrypt.hashSync(password,10),
           categoria
         }
         db.Usuario.create(newAdmin)
         .then((newAdmin)=>{
          res.redirect('/users/perfilAdmin')
         })
         .catch((err)=>{
          console.log(err);
         })
       }
      },

    login: function(req, res, next) {
        res.render('users/login', { title: 'Login' });
      },

    loginUp: function(req, res, next) {
      const errores = validationResult(req);
      if(!errores.isEmpty()){
        res.render('./users/login', {errores:errores.mapped(), old: req.body, title: "Login"})
      }
      const {email} = req.body;
      db.Usuario.findOne({
        attributes: {exclude: ["password"]},
        where: {
          email,
        }
      })
      .then((user)=>{
        req.session.user = user;
        res.cookie('user',user,{maxAge: 1000 * 60 * 10 });
        
        if(req.body.remember == "on") {
          res.cookie('rememberMe',"true", {maxAge: 1000 * 60 * 5 });        
        }
        
      res.redirect('/')
      })
      .catch((err)=>{
        console.log(err);
      })
        
      },

      // contralador de la actualizacion de usuario
    profile:(req,res)=>{
        const {email} = req.params;
        
        const users = leerArchivo('users');
        const user = users.find(elemento => elemento.email == email);
        
        res.render('./users/formUpdateUser', { title: 'Editar Usuario',subtitulo: "Editar Usuario", usuario: req.session.user });
      },

    processUpdate:(req,res)=>{
       // const {id} = req.params;
        const {nombre,apellido,email,domicilio,age,date,categoria} = req.body;
        const users = leerArchivo('users');
        const usuarios = users.map(element => {
          if (element.email == email) {
            return {
              nombre: nombre.trim(),
              apellido:apellido.trim(),
              email:email.trim(),
              domicilio,
              age,
              date,
              image:req.file ? req.file.filename : element.image, 
              password: element.password,
              categoria
            }
          }
          return element
        });
        escribirArchivo(usuarios,'users');
        const userUpdate = usuarios.find(elemento => elemento.email == email);
        req.session.user = userUpdate;
        console.log("This is sessionUserUpdate....",req.session.user);
        delete userUpdate.password
        res.cookie('user',(userUpdate))
        if(userUpdate.categoria) {
          res.redirect('/users/perfilAdmin');
        } else {
          res.redirect('/users/perfilUser');
        }
        
      },

    perfilAdmin: function(req,res,next){
        res.render('users/perfil-admin', {title:'Mi Perfil', usuario: req.session.user})  
        console.log("This is sessionUsuario....",{usuario:req.session.user});
      },

    perfilUser: function(req,res,next){
         res.render('users/perfil-user', {title:'Mi Perfil', usuario: req.session.user})
      },  

    logout: function(req,res,next){
      res.clearCookie('user')
      req.session.destroy()
      return res.redirect('/')
      }
}

module.exports = userController;