const { body } = require('express-validator');
const db = require('../database/models/index')

const validateUpdateAvatar= [
  body('imagen')
        .custom((value, { req }) => {
            if (req.errorValidationImage) {
                return false;
            }
            return true;
        }).withMessage("El formato elegido no es valido, solo se admite 'JPG','JPGE','PNG','GIF")
]

module.exports = {validateUpdateAvatar}