var express = require('express');
var router = express.Router();

const productsController = require ('../controllers/productsController.js');
/* GET users listing. */
router.get('/productDetail', productsController.detail);
router.get('/productCart', productsController.cart);

module.exports = router;