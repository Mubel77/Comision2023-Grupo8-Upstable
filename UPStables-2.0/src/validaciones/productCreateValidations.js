const {body} = require('express-validator');

const validateCreation = [
  body('id_categorias').notEmpty().withMessage('Debes seleccionar una categoria para el producto'),
  body('id_marcas').notEmpty().withMessage('Debes seleccionar una marca para el producto'),
  body('modelo').notEmpty().withMessage('Debes definir un modelo para el producto').bail()
  .isLength({min:5, max:100}).withMessage('La cadena debe tener entre 5 y 100 caracteres'),
  body('descripcion').notEmpty().withMessage('Debes definir una breve descripcion del producto').bail()
  .isLength({min:20, max:500}).withMessage('La cadena debe tener entre 20 y 500 caracteres'),
  body('precio').notEmpty().withMessage('Debes definir un precio para el producto').bail()
  .isInt({min:0}).withMessage('Debes ingresar un numero mayor a 0 (cero)'),
  body('stock').notEmpty().withMessage('Debes definir un stock para el producto').bail()
  .isInt({min:0}).withMessage('Debes ingresar un numero mayor a 0 (cero)'),
  body('potencia').notEmpty().withMessage('Debes especificar la potencia del producto').bail()
  .isInt({min:0}).withMessage('Debes ingresar un numero mayor a 0 (cero)'),
  body('tomas').notEmpty().withMessage('Debes especificar la cantidad de tomas del producto').bail()
  .isInt({min:1}).withMessage('Debes ingresar un numero mayor a 1 (uno)'),
  body('descuento').notEmpty().withMessage('Debes especificar un descuento para el producto, 0 (cero) en caso que no lo tenga').bail()
  .isInt({min:0, max:100}).withMessage('El descuento debe oscilar entre 0 (cero) y 100 (cien)'),
  body('imagenes').custom((value, { req }) => {
    if (req.imageInvalid) {
        return false;
    };
    return true;
}).withMessage("El formato elegido no es valido, solo se admite 'JPG','JPGE','PNG','GIF")
]

module.exports = {validateCreation}