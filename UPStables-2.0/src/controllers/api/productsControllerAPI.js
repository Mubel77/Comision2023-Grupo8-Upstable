const db = require('../../database/models')
const { Op } = require("sequelize");
const {validationResult} = require('express-validator')

const productsControllerAPI = {
// Listar todos los productos
list: async (req, res) => {
  try {
    await db.Producto.findAll({
      include: [
        { model: db.Categoria, as: "categorias" },
        { model: db.Marca, as: "marcas" },
        { model: db.Imagen, as: "imagenes" },
      ],
    })
      .then((productos) => {
        return res.status(200).json({
          data: productos,
          total: productos.length,
          status: 200,
          url:'/api/productsList',
          casa:"direccion"
        })
      })
  } catch (error) {
    return res.status(400).json(error.message)
  }
},

// Dashboard de productos paginado, incluye busqueda por Marca
dashboard: async (req, res) => {
  let {page=1 ,limit=10 , keywords} = req.query
  limit = parseInt(limit)
  const offSet = limit * (parseInt(page) -1)
  const arraySearch = [{
    name: {
      [Op.like]:`%${keywords}`
    }
  }]
  const query = {limit, offSet, include:{association:'marcas'}}
  let idMarca;
  const where = {
    [Op.or]: arraySearch,
  };

  if (keywords) {
    query.where = where;
    idMarca = await db.Marca.findOne({
      where: {
        marca: {
          [Op.like]: `%${keywords}%`,
        },
      },
    });

    if (idMarca) {
    idMarca = idMarca.id;
    const searchCategory = {
      marcaId: {
        [Op.like]: `${idMarca}`,
      },
    };
    arraySearch.push(searchCategory);
    }
  }

  try {
    await db.Producto.findAndCountAll(query)
      .then((productos) => {
        res.status(200).json({
          productos
        })
      })
  } catch (error) {
    res.status(400).send(error.message)
  }
},

create: async (req, res) => {
  const errors = validationResult(req)
  const files = req.files

  const arrayImages = []
  let images

  try {

    if (errors.isEmpty()) {
      // const producto = await db.Producto.create(req.body)
      const producto = req.body

      if (files.length>0) {
        files.forEach((file) => {
          const image = {
            nombre: file.filename,
            ubicacion: "/images/products/",
            id_producto: producto.id,
          };
      //     const imageProduct = db.Imagen.create(image)
          arrayImages.push(image)
           images = arrayImages
        })
      } else {
        const imageDefault = {
          nombre: "default.jpg",
          ubicacion: "/images/products/",
          id_producto: producto.id,
        };
           images = imageDefault
      //   const imageProduct = db.Imagen.create(imageDefault)
      }

      res.status(200).json({
        data: {
          producto,
          images
        },
        status: 200,
        create: 'Ok',
        url:'/api/create'
      })

    } else {
      const errorsMapped = errors.mapped()
      for (const key in errorsMapped) {
        delete errorsMapped[key].type;
        delete errorsMapped[key].location;
        delete errorsMapped[key].path;
      }
      const errorsJson = JSON.stringify(errorsMapped)
      throw new Error (errorsJson)
    }
  } catch (error) {
    res.status(400).send(error.message)
  }
},

update: async (req, res) => {
  const id = parseInt(req.params.id)
  const errors = validationResult(req)
  const {marca, modelo, descripcion, precio, stock, potencia, categoria, tomas, descuento } = req.body;

  try {
    if (errors.isEmpty()) {

      await db.Producto.update(
        {marca, modelo, descripcion, precio, stock, potencia, categoria, tomas, descuento},
        { where: {id} }
      )
      res.status(200).json({
        producto: id,
        status: 200,
        updtate: 'Ok',
        url: 'http://localhost:3000/products/api/update/:id'
      })
    } else {
      const errorsMapped = errors.mapped()
      for (const key in errorsMapped) {
        delete errorsMapped[key].type;
        delete errorsMapped[key].location;
        delete errorsMapped[key].path;
      }
      const errorsJson = JSON.stringify(errorsMapped)
      throw new Error (errorsJson)
    }
  } catch (error) {
    res.status(400).send(error.message)
  }
},

delete: async (req, res) => {
  
}

}

module.exports = productsControllerAPI