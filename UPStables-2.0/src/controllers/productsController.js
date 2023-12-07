const formRegistro=['id','nombre','marca','modelo','descripcion','precio','imagen']

const productsController = {
    detail: function(req, res, next) {
        res.render('/products/productDetail', { title: 'Detalle Producto' });
    },
    
    dashboard: function(req, res, next) {
        res.render('products/dashboard', { title: 'Dashboard', productos });
    },

    formCreate: function(req, res, next) {
      res.render('products/formCreate', { title: 'Formulario Crear',formRegistro });
    },

    create: function(req, res, next) {
      res.redirect('/dashboard');
    },

    formUpdate: function(req, res, next) {
      res.render('/products/formUpdate', { title: 'Formulario Modificar' });
    },

    update: function(req, res, next) {
      res.redirect('/productDetail/:id');
    },

    delete: function(req, res, next) {
      res.redirect('/dashboard');
    },

    cart: function(req, res, next) {
        res.render('/products/productCart', { title: 'Carrito de Compras' });
      },
}

module.exports = productsController;