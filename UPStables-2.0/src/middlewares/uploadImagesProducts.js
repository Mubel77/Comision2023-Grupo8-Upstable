const multer = require('multer')
const path = require('path');

const storage = multer.diskStorage({

  destination: (req, file, cb) => {
     cb(null, path.join(__dirname, '../../public/images/products'));
  },
  
  filename: (req, file, cb) => {
     const newFilename = 'Upstable-imagen' + Date.now() + path.extname(file.originalname);
     cb(null, newFilename);
  },

  limits: { files : 3 },

});

const fileFilter = (req, file, cb) => {
   const filtro = /\.(jpg|jpeg|png|gif)$/;
   if (filtro.test(file.originalname)) {
     cb(null, true);
   } else {
      req.imageInvalid = "Image in-valid"
      cb(null, false);
   }
 }

module.exports = multer({storage,fileFilter});