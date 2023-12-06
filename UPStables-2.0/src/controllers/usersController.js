const userController = {
    register: function(req, res, next) {
        res.render('/users/register', { title: 'Registro' });
      },

    createUser: function(req, res, next) {
        res.redirect('/');
      },

    login: function(req, res, next) {
        res.render('/users/login', { title: 'Login', formLogeo,tipo,etiqueta });
      },

    loginUp: function(req, res, next) {
        res.redirect('/');
      },
}

module.exports = userController;