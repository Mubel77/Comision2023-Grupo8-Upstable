const db = require("../database/models");
const { Op } = require("sequelize");
const fs = require('fs');
const path = require('path');

const productsController = {
  //pedido a base de datos, listar productos
  list: function (req, res, next) {
    db.Producto.findAll({
      include: [
        { model: db.Categoria, as: "categorias" },
        { model: db.Marca, as: "marcas" },
        { model: db.Imagen, as: "imagenes" },
      ],
    }).then((productos) => {
      res.render("products/productsList", {
        title: "List Products",
        //usuario: req.session.user,
        productos,
      });
    })
    .catch((err) => console.log(err));
  },

  // muestro el detalle del producto con base de datos
  detail: function (req, res, next) {
    db.Producto.findByPk(req.params.id, {
      include: [
        { model: db.Categoria, as: "categorias" }, // Relación con Categoría
        { model: db.Marca, as: "marcas" }, // Relación con Marca
        { model: db.Imagen, as: "imagenes" }, // Relación con Imagen
      ],
    })
      .then((producto) => {
        //console.log("This is PRODUCTO DETAIL...",producto);
        res.render("products/productDetail", {
          title: producto.modelo,
          producto,
          //usuario: req.session.user,
        });
      })
      .catch((err) => console.log(err));
  },
  //dashboard con base de datos
  dashboard: function (req, res, next) {
    db.Producto.findAll({
      include: [
        { model: db.Categoria, as: "categorias" }, // Incluir la relación con Categoría
        { model: db.Marca, as: "marcas" }, // Incluir la relación con Marca
        { model: db.Imagen, as: "imagenes" }, // Incluir la relación con Imagen
      ],
    })
      .then((productos) => {
        res.render("products/dashboard", {
          title: "Dashboard",
          productos: productos,
          //usuario: req.session.user,
        });
      })
      .catch((err) => console.log(err));
  },
  // Busacador del dashboard con base datos
  dashboardSearch: function (req, res, next) {
    const { keywords } = req.query;
    const mensaje = "No hay elementos";
    db.Producto.findAll({
      where: {
        id_marcas: {
          [Op.like]: `%${keywords}%`, // Buscar coincidencias parciales e ignorar mayúsculas/minúsculas
        },
      },
      include: [
        { model: db.Categoria, as: "categorias" }, // Incluir la relación con Categoría
        { model: db.Marca, as: "marcas" }, // Incluir la relación con Marca
        { model: db.Imagen, as: "imagenes" }, // Incluir la relación con Imagen
      ],
    })
      .then((result) => {
        res.render("products/dashboardSearch", {
          title: "Dashboard",
          mensaje,
          result,
          //usuario: req.session.user,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },

  formCreate: function (req, res, next) {
    res.render("products/formCreate", {
      title: "Formulario Crear",
      //usuario: req.session.user,
    });
  },
// CREACIÓN DEL PRODUCTO CON BASE DE DATOS
create: function (req, res, next) {
  const {
    marca,
    modelo,
    descripcion,
    precio,
    stock,
    potencia,
    categoria,
    tomas,
    descuento,
  } = req.body;
// Crear el producto
      db.Producto.create({
        modelo: modelo.trim(),
        descripcion: descripcion.trim(),
        precio: +precio,
        stock: +stock,
        potencia: +potencia,
        id_marcas: +marca,
        id_categorias: +categoria,
        tomas: +tomas,
        descuento: +descuento,
      })
      .then((producto) => {
        const imagenes = req.files;
        imagenes.forEach(imagen  =>  {
          console.log(imagen)
          if (imagen){
            const imagenProducto = {
              nombre:imagen.filename,
              ubicacion:'/images/products/',
              id_producto: producto.id
            };
            console.log('imagenes del producto',imagenProducto)
            db.Imagen.create(imagenProducto)
            .then((imagen) => { 
              res.redirect(`/products/productDetail/${producto.id}`);
            })
            .catch((error) => {
              // Error al crear la imagen
              console.log("Error al crear la imagen asociada al producto:", error);
            });
          }else{
            const imagenDefault = {
              nombre:'default.png',
              ubicacion:'/images/products/',
              id_producto: producto.id
            }
            db.Imagen.create(imagenDefault)
            .then((imagen) => { 
              res.redirect(`/products/productDetail/${producto.id}`);
            })
            .catch((error) => {
              // Error al crear la imagen
              console.log("Error al crear la imagen asociada al producto:", error);
            });
          }
        })
      })
       .catch((error) => {
          // Error al crear el producto
          console.log("Error al crear el producto:", error);
        })
},

formUpdate: async function(req, res, next) {
  try {
    const { id } = req.params;
    const producto = await db.Producto.findByPk(id);
    const imagenActual = await db.Imagen.findOne({ where: { id_producto: id } });
    res.render('products/formUpdate', { title: 'Editar Producto', producto, imagenActual });
  } catch (error) {
    console.error('Error al mostrar formulario de edición:', error);
  }
},


// Procesar la edición de producto
update: async function(req, res, next) {
  try {
    const { id } = req.params;
    const { modelo, categoria, marca, descripcion, potencia, tomas, precio, descuento, stock } = req.body;

    // Obtén el producto por su ID
    const producto = await db.Producto.findByPk(id);
    if (!producto) {
      res.status(404).send('Producto no encontrado');
      return;
    }

    // Actualiza los campos del producto
    producto.modelo = modelo;
    producto.id_categoria = categoria;
    producto.id_marca = marca;
    producto.descripcion = descripcion;
    producto.potencia = +potencia;
    producto.tomas = +tomas;
    producto.precio = +precio;
    producto.descuento = +descuento;
    producto.stock = +stock;

    // Guarda los cambios en la base de datos
    await producto.save();

    // Manejar las imágenes
    const imagenes = req.files;
    if (imagenes && imagenes.length > 0) {
      // Eliminar imágenes anteriores del producto
      await db.Imagen.destroy({ where: { id_producto: id } });

      // Crear nuevas imágenes asociadas al producto
      for (const imagen of imagenes) {
        const nuevaImagen = {
          nombre: imagen.filename,
          ubicacion: '/images/products/',
          id_producto: id
        };
        await db.Imagen.create(nuevaImagen);
      }
    }

    // Redirige al usuario al detalle del producto
    res.redirect(`/products/productDetail/${id}`);
  } catch (error) {
    console.error('Error al procesar la edición de producto:', error);
    res.status(500).send('Error interno del servidor');
  }
},
  delete: function (req, res, next) {
    const { id } = req.params;
    db.Producto.destroy({
      where: {
        id: id,
      },
    });
    fs.unlink(`./public/images/product`, (err) => {
      //console.log(`borrar el archivo ${product.imagen}`);
    });
    res.redirect("/products/dashboard");
  },

  cart: function (req, res, next) {
    // db.Carrito_Compra.findAll({
    //   where: {
    //     usuario_id: req.session.user.id,
    //   },
    //   include: [
    //     {
    //       model: db.Producto,
    //       as: "productos",
    //     },
    //   ],
    // })
    db.Producto.findAll({
      include: [
        { model: db.Categoria, as: "categorias" }, // Relación con Categoría
        { model: db.Marca, as: "marcas" }, // Relación con Marca
        { model: db.Imagen, as: "imagenes" }, // Relación con Imagen
      ],
      limit: 2,
    })
      .then((productos) => {
        //console.log('This is PRODUCTOOO...',productos.length);
        //let cantidad = 3
        let subtotal = 0;
        let total = 0;
        let impuestos = 0;
        const cuenta = productos.forEach((element) => {
          subtotal = +element.precio + subtotal;
          total = subtotal * 1.21;
          impuestos = subtotal * 0.21;
        });
        const data = {
          // cantidad,
          subtotal,
          total,
          impuestos,
        };

        //console.log('This is DATA...',data);
        res.render("products/productCart", {
          title: "Carrito de Compras",
          productos,
          data,
          //cartItemCount: productsCart.length,
          //usuario: req.session.user,
        });
      })
      .catch((err) => console.log(err));
  },
};

module.exports = productsController;
