var express = require('express');
var multer = require('multer')
var path = require('path');
var router = express.Router();

const storage= multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname,'../../public/images'))
    },
    filename: (req,file,cb)=>{
        const newFilename='Upstable-imagen'+ Date.now() + path.extname(file.originalname);
        cb(null,newFilename)
    }
});
const upload=multer({storage});

const productsController = require ('../controllers/productsController.js');
//Ver todos productos listados
router.get('/', productsController.list)

/* Ver producto */
router.get('/productDetail/:id', productsController.detail);

// Listar productos Admin
router.get('/dashboard', productsController.dashboard);
router.get('/dashboard/search', productsController.dashboardSearch);

// Crear producto Admin
router.get('/formCreate', productsController.formCreate);
router.post('/formCreate',upload.array('imagenes'), productsController.create);

// Actualizar productos Admin
router.get('/formUpdate/:id', productsController.formUpdate);
router.put('/update/:id',upload.array('imagenes'), productsController.update);

// Borrar productos Admin
router.delete('/delete/:id', productsController.delete);

// Ver carrito de compra
router.get('/productCart', productsController.cart);

module.exports = router;