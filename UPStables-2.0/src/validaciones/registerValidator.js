const { body } = require('express-validator');
const db = require('../database/models/index')
const validatorRegister = [
    body('nombre')
        .notEmpty().withMessage('Debes completar con tu nombre').bail()
        .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),
    body('apellido')
        .notEmpty().withMessage('Debes completar con tu apellido').bail()
        .isLength({ min: 3 }).withMessage('El apellido debe tener al menos 3 caracteres'),
    body('fecha_nacimiento')
        .notEmpty().withMessage('Debes completar la fecha de nacimiento con el formato "MM-DD-AAAA').bail(),   
    body('numero_calle')
        .notEmpty().withMessage('Debes completar el NUMERO del domicilio').bail()
        .isInt({min:1, max:100000}).withMessage('Debe ser un numero entre 1 (uno) y 100000 (cien mil)'),
    body('nombre_calle')
        .notEmpty().withMessage('Debes completar el nombre de la CALLE').bail()
        .isLength({ min: 3 }).withMessage('El domicilio debe tener al menos 3 caracteres'),
    body('email').notEmpty().withMessage("El campo no puede estar vacio").bail()
        .isEmail().withMessage('Debe ser un correo con formato valido').bail()
        .custom(value => { 
        db.Usuario.findOne({
            where:{
                email:value
            }
        });
        return value
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
        .notEmpty().withMessage('Debes completar con tu nombre').bail()
        .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),
    body('apellido')
        .notEmpty().withMessage('Debes completar con tu apellido').bail()
        .isLength({ min: 3 }).withMessage('El apellido debe tener al menos 3 caracteres'), 
    body('numero_calle')
        .notEmpty().withMessage('Debes completar el NUMERO del domicilio').bail()
        .isInt({min:1, max:100000}).withMessage('Debe ser un numero entre 1 (uno) y 100000 (cien mil)'),
    body('nombre_calle')
        .notEmpty().withMessage('Debes completar el nombre de la CALLE').bail()
        .isLength({ min: 3 }).withMessage('El domicilio debe tener al menos 3 caracteres'),
    body('fecha_nacimiento')
        .notEmpty().withMessage('Debes completar la fecha de nacimiento con el formato "MM-DD-AAAA').bail(),
    body('rol_id')
        .notEmpty().withMessage('Debes elegir un Rol para el administrador').bail(),
    body('email').notEmpty().withMessage("El campo no puede estar vacio").bail()
        .isEmail().withMessage('Debe ser un correo con formato valido').bail()
        .custom(value => {    
            db.Usuario.findOne({
                where:{
                    email:value
                }
            });
            return value
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

module.exports = { validatorRegister, validatorRegisterAdmin };
