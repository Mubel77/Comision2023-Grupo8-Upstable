const express = require('express');
const multer = require('multer')
const path = require('path');
const router = express.Router();
const {validateCreation} = require('../validaciones/productCreateValidations.js')
const {sessionValidator, isAdmin} = require('../middlewares/sessionValidator.js')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
       cb(null, path.join(__dirname, '../../public/images/products'));
    },
    filename: (req, file, cb) => {
       const newFilename = 'Upstable-imagen' + Date.now() + path.extname(file.originalname);
       cb(null, newFilename);
    }
 });
const upload=multer({storage});

// const {sessionValidator, isAdmin} = require('../middlewares/sessionValidator.js')
 const productsController = require ('../controllers/productsController.js');
//Ver todos productos listados
router.get('/productsList', isAdmin, productsController.list)

/* Ver producto */
router.get('/productDetail/:id', productsController.detail);

// Listar productos Admin
router.get('/dashboard', isAdmin, productsController.dashboard);
router.get('/dashboard/search', isAdmin, productsController.dashboardSearch);

// Crear producto Admin
router.get('/formCreate', isAdmin, productsController.formCreate);
router.post('/formCreate', upload.array('imagenes'), validateCreation, productsController.create);

// Actualizar productos Admin
router.get('/formUpdate/:id', isAdmin, productsController.formUpdate);
router.put('/update/:id', upload.array('imagenes'), validateCreation, productsController.update);

// Borrar productos Admin
router.delete('/delete/:id', isAdmin, productsController.delete);

// Ver carrito de compra
router.get('/productCart', sessionValidator, productsController.cart);

module.exports = router;