const productsController = {
    detail: function(req, res, next) {
        res.render('/products/productDetail', { title: 'Detalle Producto' });
      },

    cart: function(req, res, next) {
        res.render('/products/productCart', { title: 'Carrito de Compras' });
      },
}

module.exports = productsController;