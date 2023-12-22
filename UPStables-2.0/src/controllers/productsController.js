const fs = require("fs");
const path = require("path");
const {v4:uuidv4}=require("uuid");
const {leerArchivo,escribirArchivo}=require("../database/jsonFunctions");

const productsController = {

  list:function(req, res, next) {
    let productos = leerArchivo('products')
    res.render('products/productsList', { title: 'List Products', productos });},

    detail: function(req, res, next) {
      let productos = leerArchivo("products");
      const{id}= req.params;
      const producto= productos.find(producto=> producto.id == id);
        res.render('products/productDetail', { title: producto.nombre, producto });
    },
    
    dashboard: function(req, res, next) {
      let productos= leerArchivo("products");
        res.render('products/dashboard', { title: 'Dashboard', productos });
    },

    dashboardSearch: function(req, res, next) {
      const mensaje = "No hay elementos";
      let {keywords} = req.query;
      let productos= leerArchivo("products");
      let result = productos.filter(producto => producto.marca.toLowerCase().includes(keywords.toLowerCase()))
      res.render('products/dashboardSearch', { title: 'Dashboard', mensaje, result});
    },

    formCreate: function(req, res, next) {
      res.render('products/formCreate', { title: 'Formulario Crear'});
    },

    create: function(req, res, next) {
     let productos= leerArchivo("products");
     const{marca,modelo,descripcion,precio,stock,potencia,categoria,tomas,descuento,imagen}=req.body;
     const file=req.file;
     const id = uuidv4();
     const nuevoProducto={
      id,
      modelo: modelo.trim(),
      marca:marca.trim(),
      categoria:categoria.trim(),
      descripcion:descripcion.trim(),
      potencia:+potencia,
      tomas:+tomas,
      precio:+precio,
      descuento:+descuento,
      stock:+stock,
      imagen:file? file.filename : "default.jpg"
     }
     productos.push(nuevoProducto);
    escribirArchivo(productos,"products");
    res.redirect('/products/dashboard');
    },

    formUpdate: function(req, res, next) {
      let products= leerArchivo('products');
		const {id}=req.params;
		const productToEdit = products.find(product => product.id == id);
     res.render('products/formUpdate', { title: 'Formulario Modificar', productToEdit});
    },

    update: function(req, res, next) {
      let products= leerArchivo('products');
		const {id}=req.params;
		const {marca,modelo,descripcion,precio,stock,potencia,categoria,tomas,descuento,imagen}=req.body;
		const nuevoArray= products.map(product=>{
			if(product.id == id){
				return{
					id,
        modelo: modelo.trim(),
        marca:marca.trim(),
        categoria:categoria.trim(),
        descripcion:descripcion.trim(),
        potencia:+potencia,
        tomas:+tomas,
        precio:+precio,
        descuento:+descuento,
        stock:+stock,
        imagen:imagen ? imagen : product.imagen
				}	
			}
			return product
		})
		 escribirArchivo(nuevoArray, 'products')
		 res.redirect(`/products/productDetail/${id}`)
    },

    delete: function(req, res, next) {
      let productos= leerArchivo("products");
      const {id} = req.params;
      const nuevaLista = productos.filter(producto => producto.id != id);
      escribirArchivo(nuevaLista, "products");
      res.redirect('/products/dashboard');
    },

    cart: function(req, res, next) {
      let productsCart = leerArchivo("productosCarrito");
      res.render('products/productCart', { title: 'Carrito de Compras', productsCart, cartItemCount: productsCart.length });
  },
}

module.exports = productsController;