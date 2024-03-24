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

  fileFilter : (req, file, cb) => {
   const filtro = /\.(jpg|jpeg|png|gif)$/;
   if (file.originalname.match(filtro)) {
     cb(null, true);
   } else {
     return cb(new Error("No es un tipo de archivo válido"), false);  
   }
 }

});

module.exports = multer({storage});