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
        let users = leerArchivo('users');
        const {nombre,apellido,domicilio,email,contraseña} = req.body;
        const newUser = {
          nombre: nombre.trim(),
          apellido: apellido.trim(),
          domicilio: domicilio.trim(),
          email: email.trim(),
          contraseña: contraseña.trim()
        }
        users.push(newUser);
        escribirArchivo(users,'users');
        res.redirect('/')
      },
      registerAdmin: function(req,res,next){

      },
      createUserAdmin: function(req,res,next){

      },

    login: function(req, res, next) {
        res.render('users/login', { title: 'Login', formLogeo,tipo,etiqueta });
      },

    loginUp: function(req, res, next) {
      const errores = validationResult(req);
      console.log(errores);
      
      if(!errores.isEmpty()){
        res.render('./users/login', {errores:errores.mapped(), old: req.body, title: "Login"})
      }

      const {email} = req.body;
      const users = leerArchivo("users");
      const user = users.find(usuario=> usuario.email == email);

      req.session.user = user;

      if (req.body.remember) {
        res.cookie('userEmail', user.email, {maxAge:1000 * 60})
        res.cookie('rememberMe',"true", {maxAge: 1000 * 60});
      }
        res.redirect('/');
      },

    perfilAdmin: function(req,res,next){

      },
    logout: function(req,res,next){
      
    }

}

module.exports = userController;