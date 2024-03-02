var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController.js');
const loginValidator = require('../validaciones/loginValidator.js')
const { validatorRegister, validatorRegisterAdmin } = require('../validaciones/registerValidator.js');
const { validatorUpdateUser, validatorUpdateAdmin } = require('../validaciones/updateUserValidator.js');
const {sessionValidator, isAdmin} = require('../middlewares/sessionValidator.js')
const upload = require('../validaciones/uploadUser');

/* GET users listing. */
router.get('/register', usersController.register);
router.post('/register', upload.single('imagen'), validatorRegister, usersController.createUser);

router.get('/registerAdmin', usersController.registerAdmin);  //isAdmin
router.post('/registerAdmin', upload.single('imagen'),validatorRegisterAdmin, usersController.createUserAdmin);


router.get('/login', usersController.login);
router.post('/login', loginValidator, usersController.loginUp);

//ruta para editar usuario, tarea de santy y mauri, 
router.get('/profile',  usersController.formUpdateUser)  //sessionValidator, 
router.put('/profile', upload.single('imagen'), validatorUpdateUser, usersController.processUpdate)

router.get('/perfilAdmin',/*isAdmin*/ usersController.perfilAdmin);
router.get('/perfilUser',sessionValidator, usersController.perfilUser);

router.get('/logout', usersController.logout);

module.exports = router;