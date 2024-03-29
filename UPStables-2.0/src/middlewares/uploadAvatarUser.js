const multer = require('multer');
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname,'/../../public/images/users'))
      },
      filename: (req, file, cb) => {
        const avatarFilename='Avatar-User'+ Date.now() + path.extname(file.originalname);
        cb(null, avatarFilename)
      }
});

const fileFilter = (req, file, cb) => {
    const filtro = /\.(jpg|jpeg|png|gif)$/;
    if (filtro.test(file.originalname)) {
      cb(null, true);
    } else {
      req.errorValidationImage = "No es un tipo de archivo válido";
      cb(null, false);
    }
  };
  

module.exports = multer({storage,fileFilter})
