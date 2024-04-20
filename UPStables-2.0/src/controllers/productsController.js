const db = require("../database/models");
const { Op } = require("sequelize");
const fs = require('fs')
const { validationResult } = require("express-validator");
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const path = require('path');
const idCart = require('../../public/javascripts/carrito')

const productsController = {
  //pedido a base de datos, listar productos
  list: function (req, res, next) {
    db.Producto.findAll({
      include: [
        { model: db.Categoria, as: "categorias" },
        { model: db.Marca, as: "marcas" },
        { model: db.Imagen, as: "imagenes" },
      ],
    })
      .then((productos) => {
        res.render("products/productsList", {
          title: "List Products",
          usuario: req.session.user,
          productos,
          toThousand
        });
      })
      .catch((err) => console.log(err))
  },
// Vistas de los estabilizadores, ups y ofertas

Ups: function (req, res, next) {
  db.Producto.findAll({
    include: [
      {
        model: db.Categoria,
        as: "categorias",
        where: { categoria: 'UPS' } // Filtra por la categoría UPS
      },
      { model: db.Marca, as: "marcas" },
      { model: db.Imagen, as: "imagenes" },
    ],
  })
  .then((productos) => {
    res.render("products/UPS", {
      title: "UPS",
      usuario: req.session.user,
      productos,
      toThousand
    });
  })
  .catch((err) => console.log(err));
},

Estabilizadores: function (req, res, next) {
  db.Producto.findAll({
    include: [
      {
        model: db.Categoria,
        as: "categorias",
        where: { categoria: 'Estabilizadores' } // Filtra por la categoría Estabilizadores
      },
      { model: db.Marca, as: "marcas" },
      { model: db.Imagen, as: "imagenes" },
    ],
  })
  .then((productos) => {
    res.render("products/Estabilizadores", {
      title: "Estabilizadores",
      usuario: req.session.user,
      productos,
      toThousand
    });
  })
  .catch((err) => console.log(err));
},

Ofertas: function (req, res, next) {
  db.Producto.findAll({
    include: [
      { model: db.Marca, as: "marcas" },
      { model: db.Imagen, as: "imagenes" },
      { model: db.Categoria, as: "categorias" } // Incluir la asociación con la categoría
    ],
    where: { 
      id_categorias: {
        [db.Sequelize.Op.ne]: null // Excluye los productos que no tienen categoría asignada
      },
      descuento: {
        [db.Sequelize.Op.ne]: 0 // Filtra por productos con descuento diferente de cero
      }
    }
  })
  .then((productos) => {
    res.render("products/ofertas", {
      title: "Ofertas",
      usuario: req.session.user,
      productos,
      toThousand
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
        console.log(producto,"holaaa")
        res.render("products/productDetail", {
          title: producto.modelo,
          producto,
          usuario: req.session.user,
          usuario: req.session.user,
          toThousand
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
          usuario: req.session.user,
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
          usuario: req.session.user,
          usuario: req.session.user,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },

  formCreate: function (req, res, next) {
    res.render("products/formCreate", {
      title: "Formulario Crear",
      usuario: req.session.user,
      usuario: req.session.user,
    });
  },

  // CREACIÓN DEL PRODUCTO CON BASE DE DATOS
  create: function (req, res, next) {
    const {
      id_categorias,
      id_marcas,
      modelo,
      descripcion,
      precio,
      stock,
      potencia,
      tomas,
      descuento,
    } = req.body;

    const errors = validationResult(req);

    if (errors.isEmpty()) {
      db.Producto.create({
        modelo: modelo.trim(),
        descripcion: descripcion.trim(),
        precio: +precio,
        stock: +stock,
        potencia: +potencia,
        id_marcas: +id_marcas,
        id_categorias: +id_categorias,
        tomas: +tomas,
        descuento: +descuento,
      })
        .then((producto) => {
          const imagenes = req.files;
          if (imagenes.length > 0) {
            imagenes.forEach((imagen) => {
              const imagenProducto = {
                nombre: imagen.filename,
                ubicacion: "/images/products/",
                id_producto: producto.id,
              };
              db.Imagen.create(imagenProducto)
                .then(() => {
                  res.redirect(`/products/productDetail/${producto.id}`);
                })
                .catch((error) => {
                  console.log(error);
                });
        })      

          } else {
            const imagenDefault = {
              nombre: "default.jpg",
              ubicacion: "/images/products/",
              id_producto: producto.id,
            };
            db.Imagen.create(imagenDefault)
              .then(() => {
                res.redirect(`/products/productDetail/${producto.id}`);
              })
              .catch((error) => {
                // Error al crear la imagen
                console.log(error);
              });
          }
        })
        .catch((error) => {
          // Error al crear el producto
          console.log(error);
        });
    } else {
      res.render("products/formCreate", {
        title: "Formulario Crear",
        errors: errors.mapped(),
        oldData: req.body,
        usuario: req.session.user,
      });
    }
  },  

  formUpdate: (req, res) => {
    const { id } = req.params;
    db.Producto.findByPk(id, {
      include: [
        { model: db.Categoria, as: "categorias" }, // Relación con Categoría
        { model: db.Marca, as: "marcas" }, // Relación con Marca
        { model: db.Imagen, as: "imagenes" }, // Relación con Imagen
      ],
    })
      .then((producto) => {
        if (!producto) {
          throw new Error('Producto no encontrado');
        }
        res.render("products/formUpdate", {
          title: "Formulario Modificar",
          producto,
          usuario: req.session.user
        });
      })
      .catch((err) => {
        console.log("Error en la actualización del formulario:", err);
        res.status(500).send("Error interno del servidor");
      });
  },
  update: function (req, res, next) {
    const { id } = req.params;
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
    
    // Procesar los archivos de imagen si se han subido
    const files = req.files;

    db.Producto.findByPk(id)
        .then(producto => {
            if (!producto) {
                throw new Error('Producto no encontrado');
            }

            // Actualizar los campos del producto con los valores del formulario
            producto.modelo = modelo.trim();
            producto.descripcion = descripcion.trim();
            producto.potencia = +potencia;
            producto.tomas = +tomas;
            producto.precio = +precio;
            producto.descuento = +descuento;
            producto.stock = +stock;

            // Si hay una nueva marca seleccionada en el formulario, actualizarla
            if (marca) {
                producto.id_marcas = marca;
            }

            // Si hay una nueva categoría seleccionada en el formulario, actualizarla
            if (categoria) {
                producto.id_categorias = categoria;
            }

            // Guardar los cambios en la base de datos
            return producto.save();
        })
        .then(updatedProduct => {
            // Redirigir al usuario a la página de detalles del producto actualizado
            res.redirect(`/products/productDetail/${id}`);
        })
        .catch(err => {
            console.log('Error al actualizar el producto:', err);
            res.status(500).send('Error interno del servidor');
        });
},

delete: async (req, res) => {
  const id = parseInt(req.params.id)
  let pathFile;
  const producto = await db.Producto.findByPk(
    id,
    {include:[{ model: db.Imagen, as: "imagenes" }]}
  )
  console.log(producto.imagenes)
  if(producto.imagenes) {
  producto.imagenes.forEach(imagen => {
    db.Imagen.destroy({
      where: {id_producto:id}
    })
    pathFile = path.join('public',imagen.ubicacion,'/',imagen.nombre)
    fs.unlink(pathFile, (err) => {
      if (err) throw new Error;
    })
  })
 }
  try {
    const removeProduct = await db.Producto.destroy({
      where: {id}
    })
    res.redirect("/products/dashboard");
  } catch (error) {
    console.log(error);
  }
},

  cart: function (req, res, next) {
    const carritoProducto = localStorage.getItem('id')
    console.log(carritoProducto,'putoooooo');
    // db.Producto.findAll({
    //   include: [
    //     { model: db.Categoria, as: "categorias" }, // Relación con Categoría
    //     { model: db.Marca, as: "marcas" }, // Relación con Marca
    //     { model: db.Imagen, as: "imagenes" }, // Relación con Imagen
    //   ],
    //   limit: 2,
    // })
    //   .then((productos) => {
    //     //let cantidad = 3
    //     let subtotal = 0;
    //     let total = 0;
    //     let impuestos = 0;
    //     const cuenta = productos.forEach((element) => {
    //       subtotal = +element.precio + subtotal;
    //       total = subtotal * 1.21;
    //       impuestos = subtotal * 0.21;
        // });
        // const data = {
      //     // cantidad,
      //     subtotal,
      //     total,
      //     impuestos,
      //   };
      //   res.render("products/newCart", {
      //     title: "Carrito de Compras",
      //     productos,
      //     data,
      //     usuario: req.session.user,
      //   });
      // })
      // .catch((err) => console.log(err));
  },
};

module.exports = productsController;
