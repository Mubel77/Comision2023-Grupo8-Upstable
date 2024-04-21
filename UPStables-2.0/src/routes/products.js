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
router.get('/dashboard/search',isAdmin, productsController.dashboardSearch);

// Crear producto Admin
router.get('/formCreate', isAdmin, productsController.formCreate);
router.post('/formCreate', upload.array('imagenes',3), validateCreation, productsController.create);

// Actualizar productos Admin
router.get('/formUpdate/:id', isAdmin, productsController.formUpdate);
//router.put('/update/:id', isAdmin, upload.array('imagenes',3), validateCreation, productsController.update);
router.put('/update/:id', isAdmin, upload.fields([{name: 'imagen1', maxCount: 1}, {name: 'imagen2', maxCount: 1}, {name: 'imagen3', maxCount: 1}]), validateCreation, productsController.update);

// Borrar productos Admin
router.delete('/delete/:id', isAdmin, productsController.delete);

// Ver carrito de compra
router.get('/productCart', sessionValidator, productsController.cart);
router.post('/productCart/:id',sessionValidator, productsController.registerCart)
router.delete('/productCart/:id',sessionValidator, productsController.cleanCart)

module.exports = router;