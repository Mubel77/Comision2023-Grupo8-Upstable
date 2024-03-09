const db = require("../database/models");
const { Op } = require("sequelize");
const { validationResult } = require("express-validator");

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
        res.render("products/productDetail", {
          title: producto.modelo,
          producto,
          usuario: req.session.user,
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
            });
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

  formUpdate: function (req, res, next) {
    const { id } = req.params;
    db.Producto.findByPk(id, {
      include: [
        { model: db.Categoria, as: "categorias" }, // Relación con Categoría
        { model: db.Marca, as: "marcas" }, // Relación con Marca
        { model: db.Imagen, as: "imagenes" }, // Relación con Imagen
      ],
    })
      .then((producto) => {
        res.render("products/formUpdate", {
          title: "Formulario Modificar",
          producto,
          usuario: req.session.user,
        });
      })
      .catch((err) => console.log(err));
  },

  update: function (req, res, next) {
    const { id } = req.params;
    const producto = ({
      id_marcas,
      modelo,
      descripcion,
      precio,
      stock,
      potencia,
      id_categorias,
      tomas,
      descuento,
    } = req.body);

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      db.Producto.update(
        {
          modelo: modelo.trim(),
          id_marcas: id_marcas,
          id_categorias: id_categorias,
          descripcion: descripcion.trim(),
          potencia: +potencia,
          tomas: +tomas,
          precio: +precio,
          descuento: +descuento,
          stock: +stock,
        },
        {
          where: { id: id },
        }
      )
        .then((updatedProduct) => {
          res.redirect(`/products/productDetail/${id}`);
        })
        .catch((err) => console.log(err));
    } else {
      const { id } = req.params;
      db.Producto.findByPk(id, {
        include: [
          { model: db.Categoria, as: "categorias" }, // Relación con Categoría
          { model: db.Marca, as: "marcas" }, // Relación con Marca
          { model: db.Imagen, as: "imagenes" }, // Relación con Imagen
        ],
      })
        .then((producto) => {
          res.render("products/formUpdate", {
            title: "Formulario Modificar",
            producto,
            errors: errors.mapped(),
            oldData: req.body,
            usuario: req.session.user,
          });
        })
        .catch((err) => console.log(err));
    }
  },

  delete: function (req, res, next) {
    // const { id } = req.params;
    // db.Producto.findByPk(id, {
    //   include: [
    //     { model: db.Categoria, as: "categorias" }, // Relación con Categoría
    //     { model: db.Marca, as: "marcas" }, // Relación con Marca
    //     { model: db.Imagen, as: "imagenes" }, // Relación con Imagen
    //   ],
    // }).then((producto) => {
    //   db.Producto.destroy({
    //     where: {
    //       id: producto.id,
    //     },
    //   })
    //     .then((product) => {
    //       fs.unlink(`./public/images/${product.imagen}`, (err) => {
    //         if (err) throw new Error();
    //         console.log(`borrar el archivo ${product.imagen}`);
    //       });
    //       res.redirect("/products/list");
    //     })
    //     .catch((error) => {
    //       console.log("....This is ERROR....", error);
    //     });
    // });
  },

  cart: function (req, res, next) {
    db.Producto.findAll({
      include: [
        { model: db.Categoria, as: "categorias" }, // Relación con Categoría
        { model: db.Marca, as: "marcas" }, // Relación con Marca
        { model: db.Imagen, as: "imagenes" }, // Relación con Imagen
      ],
      limit: 2,
    })
      .then((productos) => {
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
        res.render("products/productCart", {
          title: "Carrito de Compras",
          productos,
          data,
          usuario: req.session.user,
        });
      })
      .catch((err) => console.log(err));
  },
};

module.exports = productsController;
