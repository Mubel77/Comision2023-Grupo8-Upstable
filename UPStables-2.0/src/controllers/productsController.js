const fs = require("fs");
const path = require("path");
const json = fs.readFileSync(path.join(__dirname,"../database/productos.json"),"utf-8")
const productos = JSON.parse(json);
const jsonCarrito = fs.readFileSync(path.join(__dirname,"../database/productosCarrito.json"),"utf-8")
const productsCart= JSON.parse(jsonCarrito);
const formRegistro=['id','nombre','marca','modelo','descripcion','precio','imagen']

const productsController = {
    detail: function(req, res, next) {
      const{id}= req.params;
      const producto= productos.find(producto=> producto.id == id)
        res.render('products/productDetail', { title: producto.nombre, producto });
    },
    
    dashboard: function(req, res, next) {
        res.render('products/dashboard', { title: 'Dashboard', productos });
    },

    formCreate: function(req, res, next) {
      res.render('products/formCreate', { title: 'Formulario Crear',formRegistro });
    },

    create: function(req, res, next) {
      res.redirect('/products/dashboard');
    },

    formUpdate: function(req, res, next) {
     res.render('products/formUpdate', { title: 'Formulario Modificar',formRegistro});

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