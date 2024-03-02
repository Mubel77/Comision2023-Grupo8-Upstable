const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname,'/../../public/images/users'))
      },
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + uuidv4();
        cb(null, path.basename(file.originalname,path.extname(file.originalname)) + '-' + uniqueSuffix + path.extname(file.originalname))
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

//module.exports = {storage,fileFilter}