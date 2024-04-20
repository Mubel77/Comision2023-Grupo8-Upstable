const express = require('express');
const router = express.Router();
const {validateCreation} = require('../validaciones/productCreateValidations.js');
const {sessionValidator, isAdmin} = require('../middlewares/sessionValidator.js');
const upload = require('../middlewares/uploadImagesProducts.js');

const productsController = require ('../controllers/productsController.js');

//Ver todos productos listados
router.get('/productsList',/* isAdmin,*/ productsController.list)
router.get('/UPS', productsController.Ups)
router.get('/Estabilizadores', productsController.Estabilizadores)
router.get('/Ofertas', productsController.Ofertas)

/* Ver producto */
router.get('/productDetail/:id', productsController.detail);

// Listar productos Admin
router.get('/dashboard',isAdmin, productsController.dashboard);
router.get('/dashboard/search', productsController.dashboardSearch);

// Crear producto Admin
router.get('/formCreate', isAdmin, productsController.formCreate);
router.post('/formCreate', upload.array('imagenes',3), validateCreation, productsController.create);

// Actualizar productos Admin
router.get('/formUpdate/:id', isAdmin, productsController.formUpdate);
router.put('/update/:id', upload.array('imagenes',3), validateCreation, productsController.update);

// Borrar productos Admin
router.delete('/delete/:id', isAdmin, productsController.delete);

// Ver carrito de compra
router.get('/productCart', productsController.cart); //acordateee de la sesion

module.exports = router;

