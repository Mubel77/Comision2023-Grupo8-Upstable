const db = require("../database/models");
const { Op } = require("sequelize");

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
          //usuario: req.session.user,
        });
      })
      .catch((err) => console.log(err));
  },
  update: function (req, res, next) {
    const { id } = req.params;
    const producto = ({
      marca,
      modelo,
      descripcion,
      precio,
      stock,
      potencia,
      categoria,
      tomas,
      descuento,
    } = req.body);
    const files = req.files;
    console.log('This is PRODUCTOOO...',producto);
    // console.log('This is FILESSSSS...',files);

    db.Producto.update(
      {
        modelo: modelo.trim(),
        id_marcas: 1,
        id_categorias: 1,
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
  },

  delete: function (req, res, next) {
    const { id } = req.params;
    db.Producto.destroy({
      where: {
        id: id,
      },
    });
    fs.unlink(`./public/images/${product.imagen}`, (err) => {
      if (err) throw err;
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
