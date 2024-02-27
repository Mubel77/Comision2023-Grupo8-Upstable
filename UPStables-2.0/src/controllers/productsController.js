const db = require("../database/models");

const productsController = {
  //pedido a base de datos, listar productos
  list: function (req, res, next) {
    producto
      .findAll({
        include: [
          {
            model: Categoria,
            as: "categorias",
          },
          {
            model: marca,
            as: "marcas",
          },
        ],
      })
      .then((productos) => {
        res.render("products/productsList", {
          title: "List Products",
          usuario: req.session.user,
          productos: productos,
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
          producto: producto,
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
    db.producto
      .findAll({
        where: {
          marca: {
            [db.producto.Op.iLike]: `%${keywords}%`, // Buscar coincidencias parciales e ignorar mayúsculas/minúsculas
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
        next(err); // Pasa el error al siguiente middleware si ocurre
      });
  },
  formUpdate: function (req, res, next) {
    const { id } = req.params;
    db.producto
      .findByPk(id, {
        include: [db.Categoria, db.Marca],
      })
      .then((response) => {
        res.render("products/formUpdate", {
          title: "Formulario Modificar",
          productos: productos,
          usuario: req.session.user,
        });
      })
      .catch((err) => console.log(err));
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
      imagen,
    } = req.body;

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
    let productos = leerArchivo("products");
    const { id } = req.params;
    const product = productos.find((producto) => producto.id == id);
    const nuevaLista = productos.filter((producto) => producto.id != id);

    console.log("imagen", product.imagen);

    fs.unlink(`./public/images/${product.imagen}`, (err) => {
      if (err) throw err;
      console.log(`borrar el archivo ${product.imagen}`);
    });

    escribirArchivo(nuevaLista, "products");
    res.redirect("/products/dashboard");
  },

  cart: function (req, res, next) {
    db.Carrito_Compra.findAll({
      where: {
        usuario_id: req.session.user.id,
      },
      include: [
        {
          model: db.Producto,
          as: "productos",
        },
      ],
    })
      .then((productsCart) => {
        res.render("products/productCart", {
          title: "Carrito de Compras",
          productsCart: productsCart,
          cartItemCount: productsCart.length,
          usuario: req.session.user,
        });
      })
      .catch((err) => console.log(err));
  },
};

module.exports = productsController;
