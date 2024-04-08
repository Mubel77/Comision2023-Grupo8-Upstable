const db = require('../../database/models')
const { Op } = require("sequelize");
const {validationResult} = require('express-validator')
const fs = require('fs')
const path = require('path')

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
  let {page=1 ,limit=10 , keywords} = req.query;
  limit = parseInt(limit);
  const offSet = limit * (parseInt(page) -1);
  const query = {limit, offset:offSet, include:{association:'marcas'}};
  
  const url = `http://localhost:3000/products/api/dashboard?page=${page}&limit=${limit}&keywords=${keywords}`
  const next = `http://localhost:3000/products/api/dashboard?page=${parseInt(page)+1}`
  let previous;
  if(page > 1){
    previous = `http://localhost:3000/products/api/dashboard?page=${parseInt(page)-1}`
  }
 
  try {
    await db.Producto.findAndCountAll(query,
    {where:{marca:{[Op.like]:`%${keywords}%`}}})
      .then((productos) => {
        res.status(200).json({
        countRows : productos.rows.length,
        productos,
        url : url,
        previous : previous,
        next : productos.rows.length < limit ? '' : next
        })
      })
  } catch (error) {
    res.status(400).send(error.message)
  }
},

// Detalle del producto
detail: async (req, res) => {
  const id = parseInt(req.params.id)

  try {
    const producto = await db.Producto.findByPk(id, {
      include: [
        { model: db.Categoria, as: "categorias" },
        { model: db.Marca, as: "marcas" },
        { model: db.Imagen, as: "imagenes" }
      ],
    })
    res.status(200).json({
      url:`http://localhost:3000/products/api/detail/${id}`,
      status: 200,
      producto
    })
  } catch (error) {
    res.status(400).send(error.message)
  }
},

// Crear un producto
create: async (req, res) => {
  const errors = validationResult(req)
  const files = req.files

  const arrayImages = []
  let images

  try {

    if (errors.isEmpty()) {
      const producto = await db.Producto.create(req.body)

      if (files.length>0) {
        files.forEach((file) => {
          const image = {
            nombre: file.filename,
            ubicacion: "/images/products/",
            id_producto: producto.id,
          };
      const imageProduct = db.Imagen.create(image)
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
      const imageProduct = db.Imagen.create(imageDefault)
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

// Actualizar un producto
update: async (req, res) => {
  const id = parseInt(req.params.id)
  const errors = validationResult(req)
  const {marca, modelo, descripcion, precio, stock, potencia, categoria, tomas, descuento } = req.body;

  try {
    if (errors.isEmpty()) {

      const producto = await db.Producto.update(
        (req.body),
        { where: {id} }
      )
      res.status(200).json({
        producto: id,
        status: 200,
        update: 'Ok',
        url: `http://localhost:3000/products/api/update/${id}`
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

// Eliminar un producto
delete: async (req, res) => {
  const id = parseInt(req.params.id)
  let pathFile;
  const producto = await db.Producto.findByPk(
    id,
    {include:[{ model: db.Imagen, as: "imagenes" }]}
  )
  producto.imagenes.forEach(imagen => {
    db.Imagen.destroy({
      where: {id_producto:id}
    })
    pathFile = path.join('public',imagen.ubicacion,'/',imagen.nombre)
    fs.unlink(pathFile, (err) => {
      if (err) throw new Error;
    })
  })

  try {
    const removeProduct = await db.Producto.destroy({
      where: {id}
    })
    res.status(200).json({
      producto: id,
      status: 200,
      delete: 'Ok',
      url: `http://localhost:3000/products/api/delete/${id}`
    })
  } catch (error) {
    res.status(400).send(error.message)
  }
}

}

module.exports = productsControllerAPI