const indexController = {
    home: function(req, res, next) {
        res.render('index', { title: 'Home' });
      },
}

module.exports = indexController;