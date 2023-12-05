const userController = {
    register: function(req, res, next) {
        res.render('/users/register', { title: 'Registro' });
      },

    createUser: function(req, res, next) {
        res.render('index', { title: 'Home' });
      },

    login: function(req, res, next) {
        res.render('/users/login', { title: 'Login' });
      },

    logeado: function(req, res, next) {
        res.render('index', { title: 'Home' });
      },
}

module.exports = userController;