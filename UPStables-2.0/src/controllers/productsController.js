const productsCart = [
  {
  id:1,
  nombre:"Producto1",
  descripcion:"Estabilizador De Tensión Trv - Micro Volt L - 1200va(pico) F.",
  imagen:"/images/estabilizador 1.png",
  price:"50.000"
},
{
  id:2,
  nombre:"Producto2",
  descripcion:"Estabilizador De Tensión Trv - Micro Volt L - 1200va(pico) F.",
  imagen:"/images/estabilizador 1.png",
  price:"50.000"
}
];


const productsController = {
    detail: function(req, res, next) {
        res.render('/products/productDetail', { title: 'Detalle Producto' });
    },
    
    dashboard: function(req, res, next) {
        res.render('/products/dashboard', { title: 'Dashboard' });
    },

    formCreate: function(req, res, next) {
      res.render('/products/formCreate', { title: 'Formulario Crear' });
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
      res.render('products/productCart', { title: 'Carrito de Compras', productsCart, cartItemCount: productsCart.length });
  },
}

module.exports = productsController;