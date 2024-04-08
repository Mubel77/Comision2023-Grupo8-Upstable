const express = require('express');
const router = express.Router();
const { validateRegister, validateRegisterAdmin } = require('../../validaciones/registerValidator.js');
const { validateUpdateUser, validateUpdateAdmin } = require('../../validaciones/updateUserValidator.js');
const upload = require('../../middlewares/uploadAvatarUser');
const {isAdmin} = require('../../middlewares/sessionValidator');

const userControllerApi = require('../../controllers/api/usersControllerAPI')

// Listar todos los usuarios
router.get('/allUsers', userControllerApi.listUsers)

// Listar todos los clientes
router.get('/allClients', userControllerApi.listUsers)

// Listar todos los admin
router.get('/allAdmin', userControllerApi.listAdmin)

// Detalle del usuario
router.get('/userDetail/:id', userControllerApi.userDetail)

// Registrar un cliente
router.post('/registerClient', upload.single('imagen'), validateRegister, userControllerApi.registerClient)

// Registrar un admin
router.post('/registerAdmin', upload.single('imagen'), validateRegisterAdmin, userControllerApi.registerAdmin)

// Actualizar un cliente
router.post('/updateClient', upload.single('imagen'), validateUpdateUser, userControllerApi.updateClient)

// Actualizar un admin
router.put('/updateAdmin/:id', upload.single('imagen'), validateUpdateAdmin, userControllerApi.updateAdmin)

// Eliminar un cliente

// Eliminar un admin


module.exports = router;