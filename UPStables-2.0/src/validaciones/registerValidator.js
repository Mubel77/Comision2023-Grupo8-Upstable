const { body } = require('express-validator');
const {leerArchivo} = require('../database/jsonFunctions')

const validatorRegister = [
    body('nombre')
        .notEmpty().withMessage('Debes completar el nombre').bail()
        .isLength({ min: 5 }).withMessage('El nombre debe tener al menos 5 caracteres'),
    body('apellido')
        .notEmpty().withMessage('Debes completar el apellido').bail()
        .isLength({ min: 5 }).withMessage('El apellido debe tener al menos 5 caracteres'),
    body('domicilio')
        .notEmpty().withMessage('Debes completar el domicilio').bail()
        .isLength({ min: 5 }).withMessage('El domicilio debe tener al menos 5 caracteres'),
    body('email').notEmpty().withMessage("El campo no puede estar vacio").bail()
        .isEmail().withMessage('Debe ser un correo con formato valido').bail()
        .custom(value => {
        console.log("value:",value);    
        const users = leerArchivo('users');
        const user = users.find(elemento => elemento.email == value);
        return user ? false : true
        }).withMessage("El usuario ya existe, utilice otro correo electronico"),
    body('password').notEmpty().withMessage("El campo no puede estar vacio").bail()
        .custom((value,{req})=> {
        return value == req.body.passwordConfirmation ;
        }).withMessage("Los password no coinciden"),
    body('image').custom((value, { req }) => {
            if (req.errorValidationImage) {
              return false;
            }
            return true;
          }).withMessage("No es un tipo de archivo válido"),
];

const validatorRegisterAdmin = [
    body('nombre')
        .notEmpty().withMessage('Debes completar el nombre').bail()
        .isLength({ min: 5 }).withMessage('El nombre debe tener al menos 5 caracteres'),
    body('apellido')
        .notEmpty().withMessage('Debes completar el apellido').bail()
        .isLength({ min: 5 }).withMessage('El apellido debe tener al menos 5 caracteres'),
    body('domicilio')
        .notEmpty().withMessage('Debes completar el domicilio').bail()
        .isLength({ min: 5 }).withMessage('El domicilio debe tener al menos 5 caracteres'),
        body('email').notEmpty().withMessage("El campo no puede estar vacio").bail()
        .isEmail().withMessage('Debe ser un correo con formato valido').bail()
        .custom(value => {
        console.log("value:",value);    
        const users = leerArchivo('users');
        const user = users.find(elemento => elemento.email == value);
        return user ? false : true
        }).withMessage("El usuario ya existe, utilice otro correo electronico"),
    body('password').notEmpty().withMessage("El campo no puede estar vacio").bail()
        .custom((value,{req})=> {
        return value == req.body.passwordConfirmation ;
        }).withMessage("Los password no coinciden"),
    body('categoria')
        .notEmpty().withMessage('Debes completar cual es tu categoria').bail(),
];

module.exports = { validatorRegister, validatorRegisterAdmin };
