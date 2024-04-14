const fs = require("fs");
const path = require("path");
//const {leerArchivo,escribirArchivo}=require("../data/jsonFunctions");
const db = require("../database/models/index.js");
const { log } = require("console");

publicidad = [
  {
    idPublicidad: 1,
    imagen: "minibanner1-10-06-22.png",
  },
  {
    idPublicidad: 2,
    imagen: "minibanner2-28-06-22.png",
  },
  {
    idPublicidad: 3,
    imagen: "minibanner3-10-06-22.png",
  },
  
];
const indexController = {
  home: function (req, res, next) {
    db.Producto.findAll({
      include: [
        { association: "marcas" },
        { association: "categorias" },
        { association: "imagenes" },
      ],
    }).then((productos) => {
      res.render("index", { title: "UPStables", productos, usuario:req.session.user });
    });
  },
};

module.exports = indexController;
