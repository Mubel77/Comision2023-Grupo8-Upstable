var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController.js');
const loginValidator = require('../validaciones/loginValidator.js')
const { validateRegister, validateRegisterAdmin } = require('../validaciones/registerValidator.js');
const { validateUpdateUser, validateUpdateAdmin } = require('../validaciones/updateUserValidator.js');
const {sessionValidator, isAdmin} = require('../middlewares/sessionValidator.js')
const upload = require('../middlewares/uploadAvatarUser.js');

/* GET users listing. */
router.get('/register', usersController.register);
router.post('/register', upload.single('imagen'), validateRegister, usersController.createUser);

router.get('/registerAdmin', isAdmin, usersController.registerAdmin); 
router.post('/registerAdmin', upload.single('imagen'), validateRegisterAdmin, usersController.createUserAdmin);

router.get('/login', usersController.login);
router.post('/login', loginValidator, usersController.loginUp);

//ruta para editar usuario, tarea de santy y mauri, 
router.get('/profile', sessionValidator, usersController.formUpdateUser);
router.put('/profile', upload.single('imagen'), validateUpdateUser, usersController.processUpdate);

router.get('/perfilAdmin', isAdmin, usersController.perfilAdmin);
router.get('/perfilUser', sessionValidator, usersController.perfilUser);

router.get('/logout', usersController.logout);

//dashboard de usuarios
router.get('/dashboard', isAdmin, usersController.dashboardUsers);
router.get('/dashboard/search', usersController.dashboardSearchUsers);

router.get('/formUpdateAdmin/:id', isAdmin, usersController.formUpdateAdmin)
router.put('/updateAdmin/:id', upload.single('imagen'), validateUpdateAdmin, usersController.updateAdmin)

module.exports = router;