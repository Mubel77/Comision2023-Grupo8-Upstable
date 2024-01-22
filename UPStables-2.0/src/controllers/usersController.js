const { title } = require('process');
const {leerArchivo,escribirArchivo} = require('../database/jsonFunctions');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator')
const subtitulo = "registrate";
const formRegistro = ['NoMBre','Apellido','Domicilio','email','ConTRaseña','confiRMAR contraseña'];
const formLogeo = ['email','ConTRaseña'];

function tipo(element) {
  switch (element.toLowerCase()) {

    case "email":
      type = "email";
      break;

    case "contraseña":
      type = "password";
      break;

    case "confirmar contraseña":
      type = "password";
      break;

    default:
      type = "text";
      break;
  };

  return type;
}

 function etiqueta(element) {
   let palabraCapital = element.toUpperCase().charAt(0) + element.substring(1, element.length).toLowerCase();
   return palabraCapital;
 }

const userController = {
    register: function(req, res, next) {
      res.render('users/register', { title: 'Registro', subtitulo });
      },

    createUser: function(req, res, next) {
        const errors= validationResult(req);
        if (!errors.isEmpty()){
          res.render('users/register', { title: 'Registro',subtitulo, errors:errors.mapped(), oldData:req.body});
         } else {
          const users = leerArchivo('users');
          const {nombre,apellido,domicilio,email,password,image} = req.body;
          const newUser = {
            nombre: nombre.trim(),
            apellido: apellido.trim(),
            domicilio: domicilio,
            email: email.trim(),
            image:req.file ? req.file.filename : "user-default.png", 
            password: bcrypt.hashSync(password,10),
          };
          users.push(newUser);
          escribirArchivo(users, 'users');
          res.redirect('/');
        }
      },
      registerAdmin:  function(req, res, next) {
        res.render('users/registerAdmin', { title: 'RegistroAdmin',subtitulo,});
      },
      createUserAdmin: function(req,res,next){
       const errors= validationResult(req);
    
       if (!errors.isEmpty()){
           res.render('users/registerAdmin', { title: 'Registro',subtitulo, errors:errors.mapped(), oldData:req.body});
         } else {
          const users = leerArchivo('users');
         const {nombre,apellido,domicilio,email,password,categoria,image} = req.body;
         const newAdmind = {
           nombre: nombre.trim(),
           apellido: apellido.trim(),
           domicilio: domicilio.trim(),
           email: email.trim(),
           image:req.file ? req.file.filename : "user-default.png", 
           password: bcrypt.hashSync(password,10),
           categoria

         }
         users.push( newAdmind);
         escribirArchivo(users,'users');
         res.redirect('/')

       }
    },

    login: function(req, res, next) {
        res.render('users/login', { title: 'Login', formLogeo,tipo,etiqueta });
      },

    loginUp: function(req, res, next) {
      const errores = validationResult(req);
      if(!errores.isEmpty()){
        res.render('./users/login', {errores:errores.mapped(), old: req.body, title: "Login"})
      }
      const {email, password} = req.body;
      const users = leerArchivo("users");
      const user = users.find(usuario=> usuario.email == email);
      
        // delete user.password;
        req.session.user = user;
        res.cookie('user',user,{maxAge: 1000 * 60 * 5 });
        
        if(req.body.remember == "on") {
          res.cookie('rememberMe',"true", {maxAge: 1000 * 60 * 5 });        
        }
        
      res.redirect('/')
      },

      // contralador de la actualizacion de usuario
      profile:(req,res)=>{
        const {email} = req.params;
        
        const users = leerArchivo('users');
        const user = users.find(elemento => elemento.email == email);
        res.render('./users/formUpdateUser', { title: 'Editar Usuario', user,subtitulo: "Editar Usuario", user: req.session.user });
      },
      processUpdate:(req,res)=>{
       // const {id} = req.params;
        const {nombre,apelllido,email,age,date} = req.body;
        const users = leerArchivo('users');
        const usuarios = users.map(element => {
          if (element.email == email) {
            return {
              nombre: nombre.trim(),
              apellido:apelllido.trim(),
              email:email.trim(),
              age,
              date,
              image:req.file ? req.file.filename : element.image, 
              password: element.password,
            }
          }
          return element
        });
        escribirArchivo(usuarios,'users');
        const userUpdate = usuarios.find(elemento => elemento.email == email);
        req.session.user = userUpdate;
        delete userUpdate.password
        res.cookie('user',(userUpdate))
        res.redirect(`/users/profile/${id}`);
      },
    perfilAdmin: function(req,res,next){
        res.render('users/perfil-admin', {title:'Mi Perfil', usuario: req.session.user})  
      },

    perfilUser: function(req,res,next){
         res.render('users/perfil-user', {title:'Mi Perfil', usuario: req.session.user})
    },  

    logout: function(req,res,next){
      res.send('Deberia cerrarse la sesion pero....')
    }

}

module.exports = userController;