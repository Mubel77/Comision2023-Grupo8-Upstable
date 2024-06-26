const { body } = require('express-validator');
const db = require('../database/models/index')
 const { parse } = require("@formkit/tempo") 

const validateUpdateUser= [
    body('nombre')
        .notEmpty().withMessage('Debes completar con tu nombre').bail()
        .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),
    body('apellido')
        .notEmpty().withMessage('Debes completar con tu apellido').bail()
        .isLength({ min: 2 }).withMessage('El apellido debe tener al menos 2 caracteres'),
// TELEFONO
    body('prefijo')
        .notEmpty().withMessage('Debes completar el PREFIJO de tu region').bail()
        .isInt({min:1, max:10000}).withMessage('Debe ser un numero entre 1 (uno) y 10000 (diez mil)'),
    body('numero')
        .notEmpty().withMessage('Debes completar el NUMERO de tu telefono').bail()
        .isInt({min:10000000, max:99999999}).withMessage('Debe ser un numero de 8 digitos sin guiones. Por ej: 11223344'),   
// DIRECCION
    body('numero_calle')
        .notEmpty().withMessage('Debes completar el NUMERO del domicilio').bail()
        .isInt({min:1, max:100000}).withMessage('Debe ser un numero entre 1 (uno) y 100000 (cien mil)'),
    body('nombre_calle')
        .notEmpty().withMessage('Debes completar el nombre de la CALLE').bail()
        .isLength({ min: 3 }).withMessage('El domicilio debe tener al menos 3 caracteres'),
    body('codigo_postal')
        .notEmpty().withMessage('Debes completar con el Codigo Postal de tu region').bail()
        .isInt({min:1, max:100000}).withMessage('Debe ser un numero entre 1 (uno) y 10000 (diez mil)'),
    body('localidad')
        .notEmpty().withMessage('Debes completar el nombre de tu Localidad').bail()
        .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),
    body('provincia')
        .notEmpty().withMessage('Debes completar el nombre de tu Provincia').bail()
        .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),
    body('email')
        .notEmpty().withMessage("El campo no puede estar vacio").bail()
        .isEmail().withMessage('Debe ser un correo con formato valido').bail(),
    body('fecha_nacimiento')
        .notEmpty().withMessage('Debes completar la fecha de nacimiento con el formato "YYYY-MM-DD'),
    body('imagen')
        .custom((value, { req }) => {
            if (req.errorValidationImage) {
                return false;
            }
            return true;
        }).withMessage("El formato elegido no es valido, solo se admite 'JPG','JPGE','PNG','GIF"),
];

const validateUpdateAdmin = [
    body('nombre')
        .notEmpty().withMessage('Debes completar con tu nombre').bail()
        .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),
    body('apellido')
        .notEmpty().withMessage('Debes completar con tu apellido').bail()
        .isLength({ min: 3 }).withMessage('El apellido debe tener al menos 3 caracteres'),
// TELEFONO
    body('prefijo')
        .notEmpty().withMessage('Debes completar el PREFIJO de tu region').bail()
        .isInt({min:1, max:10000}).withMessage('Debe ser un numero entre 2 y 6 digitos'),
    body('numero')
        .notEmpty().withMessage('Debes completar el NUMERO de tu telefono').bail()
        .isInt({min:10000000, max:99999999}).withMessage('Debe ser un numero de 8 digitos sin guiones. Por ej: 11223344'),   
// DIRECCION
    body('numero_calle')
        .notEmpty().withMessage('Debes completar el NUMERO del domicilio').bail()
        .isInt({min:1, max:100000}).withMessage('Debe ser un numero entre 2 y 6 digitos'),
    body('nombre_calle')
        .notEmpty().withMessage('Debes completar el nombre de la CALLE').bail()
        .isLength({ min: 3 }).withMessage('El nombre del domicilio debe tener al menos 3 caracteres'),
    body('codigo_postal')
        .notEmpty().withMessage('Debes completar con el Codigo Postal de tu region').bail()
        .isInt({min:1, max:100000}).withMessage('Debe ser un numero entre 2 y 6 digitos'),
    body('localidad')
        .notEmpty().withMessage('Debes completar el nombre de tu Localidad').bail()
        .isLength({ min: 3 }).withMessage('El nombre de la localidad debe tener al menos 3 caracteres'),
    body('provincia')
        .notEmpty().withMessage('Debes completar el nombre de tu Provincia').bail()
        .isLength({ min: 3 }).withMessage('El nombre  de la provincia debe tener al menos 3 caracteres'),
    body('email')
        .notEmpty().withMessage("El campo no puede estar vacio").bail()
        .isEmail().withMessage('Debe ser un correo con formato valido').bail(),
    body('fecha_nacimiento')
        .notEmpty().withMessage('Debes completar la fecha de nacimiento con el formato "YYYY-MM-DD'),
    body('imagen')
        .custom((value, { req }) => {
            if (req.errorValidationImage) {
                return false;
            }
            return true;
        }).withMessage("No es un tipo de archivo válido"),
];

module.exports = { validateUpdateUser, validateUpdateAdmin };


