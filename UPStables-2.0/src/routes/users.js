var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController.js');
const loginValidator = require('../validaciones/loginValidator.js')
const { validatorRegister, validatorRegisterAdmin } = require('../validaciones/registerValidator.js');
const upload = require('../validaciones/uploadUser');
/* GET users listing. */
router.get('/register', usersController.register);
router.post('/register', upload.single('image'), validatorRegister, usersController.createUser);

router.get('/registerAdmin', usersController.registerAdmin);
router.post('/registerAdmin', upload.single('image'),validatorRegisterAdmin, usersController.createUserAdmin);


router.get('/login', usersController.login);
router.post('/login', loginValidator, usersController.loginUp);

//ruta para editar usuario, tarea de santy y mauri, 
router.get('/profile', usersController.profile)
router.put('/profile', upload.single('image'), usersController.processUpdate)

router.get('/perfilAdmin', usersController.perfilAdmin);
router.get('/perfilUser', usersController.perfilUser);

router.get('/logout', usersController.logout);

module.exports = router;