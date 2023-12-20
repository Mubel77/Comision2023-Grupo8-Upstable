var express = require('express');
var router = express.Router();

const productsController = require ('../controllers/productsController.js');
//Ver todos productos listados
router.get('/', productsController.list)

/* Ver producto */
router.get('/productDetail/:id', productsController.detail);

// Listar productos Admin
router.get('/dashboard', productsController.dashboard);

// Crear producto Admin
router.get('/formCreate', productsController.formCreate);
router.post('/formCreate', productsController.create);

// Actualizar productos Admin
router.get('/formUpdate', productsController.formUpdate);
router.put('/update/:id', productsController.update);

// Borrar productos Admin
router.delete('/delete/:id', productsController.delete);

// Ver carrito de compra
router.get('/productCart', productsController.cart);

module.exports = router;