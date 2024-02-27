const fs = require("fs");
const path = require("path");
const {v4:uuidv4}=require("uuid");
const {leerArchivo,escribirArchivo}=require("../data/jsonFunctions");
const { log } = require("console");
const db = require('../database/models/index.js')

const productsController = {

  list:function(req, res, next) {
    let productos = leerArchivo('products')
    res.render('products/productsList', { title: 'List Products', productos, usuario: req.session.user });},

    detail: function(req, res, next) {
      let productos = leerArchivo("products");
      const{id}= req.params;
      const producto= productos.find(producto=> producto.id == id);
        res.render('products/productDetail', { title:producto.modelo, producto, productos,usuario: req.session.user });
    },
    
    dashboard: function(req, res, next) {
      let productos= leerArchivo("products");
        res.render('products/dashboard', { title: 'Dashboard', productos, usuario: req.session.user });
    },

    dashboardSearch: function(req, res, next) {
      const mensaje = "No hay elementos";
      let {keywords} = req.query;
      let productos= leerArchivo("products");
      let result = productos.filter(producto => producto.marca.toLowerCase().includes(keywords.toLowerCase()))
      res.render('products/dashboardSearch', { title: 'Dashboard', mensaje, result, usuario: req.session.user});
    },

    formCreate: function(req, res, next) {
      res.render('products/formCreate', { title: 'Formulario Crear', usuario: req.session.user});
    },

    create: function(req, res, next) {
     let productos= leerArchivo("products");
     const{marca,modelo,descripcion,precio,stock,potencia,categoria,tomas,descuento}=req.body;
     const files=req.files;
     const id = uuidv4();
     const arrayImagenes=[];
     files.forEach(element => {
      arrayImagenes.push(element.filename);
     });
     const nuevoProducto={
      id,
      modelo: modelo.trim(),
      marca:marca.trim(),
      categoria:categoria,
      descripcion:descripcion.trim(),
      potencia:+potencia,
      tomas:+tomas,
      precio:+precio,
      descuento:+descuento,
      stock:+stock,
      imagen: arrayImagenes.length > 0 ? arrayImagenes : ["default.jpg"]
     }
     productos.push(nuevoProducto);
    escribirArchivo(productos,"products");
    res.redirect(`/products/productDetail/${id}`)
    },

    formUpdate: function(req, res, next) {
      let products= leerArchivo('products');
		const {id}=req.params;
		const productToEdit = products.find(product => product.id == id);
     res.render('products/formUpdate', { title: 'Formulario Modificar', productToEdit,usuario: req.session.user});
    },

    update: function(req, res, next) {
      const images = [];
      if(req.files){
        req.files.forEach(element=>{
          images.push(element.filename)
        })
      };
      let products= leerArchivo('products');
		  const {id}=req.params;
		  const {marca,modelo,descripcion,precio,stock,potencia,categoria,tomas,descuento,imagen}=req.body;
		  const nuevoArray= products.map(product=>{
			if(product.id == id){
				return{
					id,
        modelo:modelo.trim(),
        marca:marca.trim(),
        categoria:categoria,
        descripcion:descripcion.trim(),
        potencia:+potencia,
        tomas:+tomas,
        precio:+precio,
        descuento:+descuento,
        stock:+stock,
        imagen:images.length > 0 ? images : product.imagen
				}	
			}
			return product
		});
		  escribirArchivo(nuevoArray, 'products')
		  res.redirect(`/products/productDetail/${id}`)
    },

    delete: function(req, res, next) {
      const { id } = req.params;
      db.Producto.destroy({
        where: {
          id: id,
      }
    })
      console.log("imagen", product.imagen);
      
      fs.unlink(`./public/images/${product.imagen}`, (err) => {
        if (err) throw err;
        console.log(`borrar el archivo ${product.imagen}`);
      });
    
      escribirArchivo(nuevaLista, "products");
      res.redirect('/products/dashboard');
    },

    cart: function(req, res, next) {
      let productsCart = leerArchivo("productosCarrito");
      res.render('products/productCart', { title: 'Carrito de Compras', productsCart, cartItemCount: productsCart.length, usuario: req.session.user });
  },
}

module.exports = productsController;