const db = require('../../database/models')
const { Op } = require("sequelize");
const {validationResult} = require('express-validator')
const fs = require('fs')
const path = require('path')

const productsControllerAPI = {
// Listar todos los productos
list: async (req, res) => {
  let {page=1 ,limit=10 } = req.query;
  limit = parseInt(limit);
  const offSet = limit * (parseInt(page) -1);
  const query = {
    limit, 
    offset:offSet,
    include: [
      { model: db.Categoria, as: "categorias" },
      { model: db.Marca, as: "marcas" },
      { model: db.Imagen, as: "imagenes" },
    ]
  };
  
  const url = `http://localhost:3000/products/api/list?page=${page}&limit=${limit}`
  const next = `http://localhost:3000/products/api/list?page=${parseInt(page)+1}`
  const previous = `http://localhost:3000/products/api/list?page=${parseInt(page)-1}`
  
  const countPage = (elements,limit)=> {
    if (elements % limit == 0) {
      return (elements/limit)
    } else {
      return (Math.ceil(elements/limit))
    }
  }

  try {
    const total = await db.Producto.findAll()
    const totalLength = total.length
    await db.Producto.findAll(query)
      .then((productos) => {
        return res.status(200).json({
          productos,
          count: totalLength,
          countRows: productos.length,
          pages: countPage(totalLength,limit),
          status: 200,
          url : url,
          previous : page > 1 ? previous : '',
          next : productos.length < limit ? '' : next
        })
      })
  } catch (error) {
    return res.status(400).json(error.message)
  }
},

// Listar todos los UPS
listUps: async (req, res) => {
  let {page=1 ,limit=10 } = req.query;
  limit = parseInt(limit);
  const offSet = limit * (parseInt(page) -1);
  const query = {
    limit, 
    offset:offSet,
    include: [
      { model: db.Marca, as: "marcas" },
      { model: db.Imagen, as: "imagenes" },
    ],
    where: {id_categorias:1}
  };
  
  const url = `http://localhost:3000/products/api/list/ups?page=${page}&limit=${limit}`
  const next = `http://localhost:3000/products/api/list/ups?page=${parseInt(page)+1}`
  const previous = `http://localhost:3000/products/api/list/ups?page=${parseInt(page)-1}`
  
  const countPage = (elements,limit)=> {
    if (elements % limit == 0) {
      return (elements/limit)
    } else {
      return (Math.ceil(elements/limit))
    }
  }

  try {
    const total = await db.Producto.findAll({where: {id_categorias:1}})
    const totalLength = total.length
    await db.Producto.findAll(query)
      .then((upsList) => {
        return res.status(200).json({
          upsList,
          count: totalLength,
          countRows: upsList.length,
          pages: countPage(totalLength,limit),
          status: 200,
          url : url,
          previous : page > 1 ? previous : '',
          next : upsList.length < limit ? '' : next
        })
      })
  } catch (error) {
    res.status(400).send(error.message)
  }
},

// Listar todos los Estabilizadores
listEstabilizadores: async (req, res) => {
  let {page=1 ,limit=10 } = req.query;
  limit = parseInt(limit);
  const offSet = limit * (parseInt(page) -1);
  const query = {
    limit, 
    offset:offSet,
    include: [
      { model: db.Marca, as: "marcas" },
      { model: db.Imagen, as: "imagenes" },
    ],
    where: {id_categorias:2}
  };
  
  const url = `http://localhost:3000/products/api/list/estabilizadores?page=${page}&limit=${limit}`
  const next = `http://localhost:3000/products/api/list/estabilizadores?page=${parseInt(page)+1}`
  const previous = `http://localhost:3000/products/api/list/estabilizadores?page=${parseInt(page)-1}`
  
  const countPage = (elements,limit)=> {
    if (elements % limit == 0) {
      return (elements/limit)
    } else {
      return (Math.ceil(elements/limit))
    }
  }

  try {
    const total = await db.Producto.findAll({where: {id_categorias:2}})
    const totalLength = total.length
    await db.Producto.findAll(query)
      .then((estabilizadoresList) => {
        return res.status(200).json({
          estabilizadoresList,
          count: totalLength,
          countRows: estabilizadoresList.length,
          pages: countPage(totalLength,limit),
          status: 200,
          url : url,
          previous : page > 1 ? previous : '',
          next : estabilizadoresList.length < limit ? '' : next
        })
      })
  } catch (error) {
    res.status(400).send(error.message)
  }
},

// Listar todas las Categorias
listCategories: async (req, res) => {
  let {page=1 ,limit=10 } = req.query;
  limit = parseInt(limit);
  const offSet = limit * (parseInt(page) -1);
  const query = {
    limit, 
    offset:offSet
  };
  
  const url = `http://localhost:3000/products/api/list/categories?page=${page}&limit=${limit}`
  const next = `http://localhost:3000/products/api/list/categories?page=${parseInt(page)+1}`
  const previous = `http://localhost:3000/products/api/list/categories?page=${parseInt(page)-1}`
  
  const countPage = (elements,limit)=> {
    if (elements % limit == 0) {
      return (elements/limit)
    } else {
      return (Math.ceil(elements/limit))
    }
  }
  try {
    await db.Categoria.findAndCountAll()
      .then((categorias) => {
        return res.status(200).json({
          categorias,
          countRows: categorias.rows.length,
          pages: countPage(categorias.count,limit),
          status: 200,
          url : url,
          previous : page > 1 ? previous : '',
          next : categorias.rows.length < limit ? '' : next
        })
      })
  } catch (error) {
    res.status(400).send(error.message)
  }
},

// Dashboard de productos paginado, incluye busqueda por Marca
// dashboard: async (req, res) => {
//   let {page=1 ,limit=10 , keywords} = req.query;
//   limit = parseInt(limit);
//   const offSet = limit * (parseInt(page) -1);
//   const query = {limit, offset:offSet, include:{association:'marcas'},
//   where:{marcas: {marca:{[Op.like]:`%${keywords}%`}}}
//   };
  
//   const url = `http://localhost:3000/products/api/dashboard?page=${page}&limit=${limit}&keywords=${keywords}`
//   const next = `http://localhost:3000/products/api/dashboard?page=${parseInt(page)+1}`
//   let previous;
//   if(page > 1){
//     previous = `http://localhost:3000/products/api/dashboard?page=${parseInt(page)-1}`
//   }
 
//   try {
//     await db.Producto.findAndCountAll(query)
//       .then((productos) => {
//         res.status(200).json({
//         countRows : productos.rows.length,
//         productos,
//         url : url,
//         previous : previous,
//         next : productos.rows.length < limit ? '' : next
//         })
//       })
//   } catch (error) {
//     res.status(400).send(error.message)
//   }
// },

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