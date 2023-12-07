const subtitulo = "registrate";
const formRegistro = ['NoMBre','Apellido','Domicilio','email','ConTRaseña','confiRMAR contraseña'];

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
        res.redirect('/');
      },

    login: function(req, res, next) {
        res.render('/users/login', { title: 'Login' });
      },

    logeado: function(req, res, next) {
        res.render('index', { title: 'Home' });
      },
}

module.exports = userController;