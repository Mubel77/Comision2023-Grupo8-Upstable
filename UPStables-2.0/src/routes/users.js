var express = require('express');
var router = express.Router();

const usersController = require ('../controllers/usersController.js');
/* GET users listing. */
router.get('/register', usersController.register);
router.post('/register', usersController.createUser);
router.get('/login', usersController.login);
router.post('/login', usersController.logeado);

module.exports = router;
