const db = require("../database/models");
const {Op} = require("sequelize")

const productsController = {
  //pedido a base de datos, listar productos
  list: function (req, res, next) {
    db.Producto.findAll({
      include: [
        {model: db.Categoria, as: "categorias"},
        {model: db.Marca, as: "marcas"},
        {model: db.Imagen, as: "imagenes" }
      ],
    })
      .then((productos) => {
        //console.log("This is PRODUCTOS LIST...",productos);
        //console.log("This is PRODUCTOS.IMAGENES...",productos.producto.dataValues);
        res.render("products/productsList", {
          title: "List Products",
          //usuario: req.session.user,
          productos
        });
      })
      //.catch((err) => console.log(err));
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
          producto
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
            [Op.like] : `%${keywords}%` // Buscar coincidencias parciales e ignorar mayúsculas/minúsculas
          },
        },
        include: [
          { model: db.Categoria, as: "categorias" }, // Incluir la relación con Categoría
          { model: db.Marca, as: "marcas" }, // Incluir la relación con Marca
          { model: db.Imagen, as: "imagenes" }, // Incluir la relación con Imagen
        ],
      })
      .then((result) => {
        //console.log('THIS IS RESULT....',result);
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
  //CREACCION DEL PRODUCTO CON BASE DATO
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
    const arrayImagenes = req.files.map((file) => file.filename); // Suponiendo que req.files contiene la información de los archivos cargados

    const nuevoProducto = {
      modelo: modelo.trim(),
      marca: marca.trim(),
      descripcion: descripcion.trim(),
      precio: +precio,
      stock: +stock,
      potencia: +potencia,
      categoria: +categoria,
      tomas: +tomas,
      descuento: +descuento,
      imagen: arrayImagenes.length > 0 ? arrayImagenes : ["default.jpg"],
    };

    db.Producto.create(nuevoProducto)
      .then((createProduct) => {
        res.redirect(`/products/productDetail/${createProduct.id}`); // Redirige al detalle del producto recién creado
      })
      .catch((err) => {
        console.log(err);
      });
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
    const producto ={
      marca,
      modelo,
      descripcion,
      precio,
      stock,
      potencia,
      categoria,
      tomas,
      descuento,
      imagen,
    } = req.body;
    const files = req.files;
    // console.log('This is PRODUCTOOO...',producto);
    // console.log('This is FILESSSSS...',files);

    db.Producto.update(
      {
        modelo: modelo.trim(),
        marca: marca.trim(),
        id_categorias: categoria,
        descripcion: descripcion.trim(),
        potencia: +potencia,
        tomas: +tomas,
        precio: +precio,
        descuento: +descuento,
        stock: +stock,
        imagen: imagen,
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
      limit: 3
    })
      .then((productos) => {
        //console.log('This is PRODUCTOOO...',productos.length);
        //let cantidad = 3
        let subtotal = 0
        let total = 0
        let impuestos = 0
        const cuenta = productos.forEach(element => {
         subtotal = subtotal + element.precio
         total = subtotal*1.21
         impuestos = total*0.21
        });
        const data = {
          // cantidad,
           subtotal,
           total,
           impuestos
        }
        
        //console.log('This is DATA...',data);
        res.render("products/productCart", {
          title: "Carrito de Compras",
          productos, data
          //cartItemCount: productsCart.length,
          //usuario: req.session.user,
        });
      })
      .catch((err) => console.log(err));
  },
};

module.exports = productsController;
