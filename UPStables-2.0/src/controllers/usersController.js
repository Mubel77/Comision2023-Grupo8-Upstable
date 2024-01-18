const {leerArchivo,escribirArchivo} = require('../database/jsonFunctions');
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
        res.render('users/register', { title: 'Registro', subtitulo,formRegistro,tipo,etiqueta});
      },

    createUser: function(req, res, next) {
        // const errors= validationResult(req);
    
        // if (errors.errors.length > 0){
        //   res.render('register', { title: 'Registro', errors:errors.mapped(), oldData:req.body});
        // } else {
          const users = leerArchivo('users');
          const {nombre,apellido,domicilio,email,password} = req.body;
          const newUser = {
            nombre: nombre.trim(),
            apellido: apellido.trim(),
            domicilio: domicilio,
            email: email.trim(),
            password: password
          };
          users.push(newUser);
          escribirArchivo(users, 'users');
          res.redirect('/');
        // }
      },
      registerAdmin:  function(req, res, next) {
        res.render('users/registerAdmin', { title: 'RegistroAdmin'});
      },
      createUserAdmin: function(req,res,next){
      //   // const errors= validationResult(req);
    
      //   if (errors.errors.length > 0){
      //     res.render('register', { title: 'Registro', errors:errors.mapped(), oldData:req.body});
      //   } else {
      //   const users = leerArchivo('users');
      //   const {nombre,apellido,domicilio,email,contraseña,categoria} = req.body;
      //   const newAdmind = {
      //     nombre: nombre.trim(),
      //     apellido: apellido.trim(),
      //     domicilio: domicilio.trim(),
      //     email: email.trim(),
      //     contraseña: contraseña.trim(),
      //     categoria:categoria.trim()
      //   }
      //   users.push( newAdmind);
      //   escribirArchivo(users,'users');
      //   res.redirect('/')

      // }
    },

    login: function(req, res, next) {
        res.render('users/login', { title: 'Login', formLogeo,tipo,etiqueta });
      },

    loginUp: function(req, res, next) {
        res.redirect('/');
      },
    perfilAdmin: function(req,res,next){

      },
    logout: function(req,res,next){
      
    }

}

module.exports = userController;