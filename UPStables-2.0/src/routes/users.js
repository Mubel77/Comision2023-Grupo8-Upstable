var express = require('express');
var router = express.Router();

const usersController = require ('../controllers/usersController.js');
/* GET users listing. */
router.get('/register', usersController.register);
router.post('/register', usersController.createUser);
router.get('/registerAdmin', usersController.registerAdmin);
router.post('/registerAdmin', usersController.createUserAdmin);
router.get('/login', usersController.login);
router.post('/login', usersController.loginUp);
router.get('/perfilAdmin', usersController.perfilAdmin);
router.get('/perfilUser', usersController.perfilUser);
router.get('/logout', usersController.logout);


module.exports = router;
