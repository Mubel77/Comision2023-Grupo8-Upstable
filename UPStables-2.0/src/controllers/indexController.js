const fs = require("fs");
const path = require("path");
const {leerArchivo,escribirArchivo}=require("../data/jsonFunctions");

publicidad=[
  {
    idPublicidad:1,
    imagen:'minibanner1-10-06-22.png'
  },
  {
    idPublicidad:2,
    imagen:'minibanner2-28-06-22.png'
  },
  {
    idPublicidad:3,
    imagen:'minibanner3-10-06-22.png'
  },
  {
    idPublicidad:4,
    imagen:'minibanner1-10-06-22.png'
  }
]
const indexController = {
  
    home: function(req, res, next) {
      let productos= leerArchivo("products");
      res.render('index', { title: 'UPStables', productos, publicidad, usuario: req.session.user});
      },
}

module.exports = indexController;