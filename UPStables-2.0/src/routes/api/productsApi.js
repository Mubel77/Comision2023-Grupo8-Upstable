const express = require('express');
const router = express.Router();
const {validateCreation} = require('../../validaciones/productCreateValidations.js');
const upload = require('../../middlewares/uploadImagesProducts.js');

const productsControllerAPI = require ('../../controllers/api/productsControllerAPI.js');

//Listar todos los productos 
router.get('/list', productsControllerAPI.list)

//Dashboard de productos
router.get('/dashboard', productsControllerAPI.dashboard)

//Crear un producto
router.post('/create', upload.array('imagenes',3), validateCreation, productsControllerAPI.create)

//Editar un producto
router.put('/update/:id', upload.array('imagenes',3), validateCreation, productsControllerAPI.update)

//Eliminar un producto
router.delete('/delete/:id', productsControllerAPI.delete)

module.exports = router