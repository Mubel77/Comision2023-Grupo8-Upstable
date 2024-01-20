var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController.js');
const { validatorRegister, validatorRegisterAdmin } = require('../validaciones/registerValidator.js');
const upload = require('../validaciones/uploadUser');

const usersController = require ('../controllers/usersController.js');
const loginValidator = require('../validaciones/loginValidator.js')
/* GET users listing. */
router.get('/register', usersController.register);
router.post('/register', upload.single('image'), validatorRegister, usersController.createUser);


router.get('/registerAdmin', usersController.registerAdmin);
router.post('/registerAdmin', validatorRegisterAdmin, usersController.createUserAdmin);


router.get('/login', usersController.login);
router.post('/login', loginValidator, usersController.loginUp);
router.get('/perfilAdmin', usersController.perfilAdmin);
router.get('/logout', usersController.logout);

module.exports = router;
