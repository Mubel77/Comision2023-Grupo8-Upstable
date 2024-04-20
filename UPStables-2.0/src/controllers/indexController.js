const fs = require("fs");
const path = require("path");
//const {leerArchivo,escribirArchivo}=require("../data/jsonFunctions");
const db = require("../database/models/index.js");
const { Op } = require("sequelize");

const { log } = require("console");
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
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
      res.render("index", { title: "Upstables", productos, usuario:req.session.user, toThousand });
    });
  },
  search: function(req, res, next) {
    const  keywords  = req.query.buscador.toLowerCase();

    const mensaje = "No hay elementos que coincidan con tu búsqueda"

    let id_cat;
    if(keywords === "ups"){
      id_cat = 1
    }else if(keywords === "estabilizador" || keywords==="estabilizadores"){
      id_cat = 2;
    }else{
      id_cat = null
    }

    let id_marca;
    switch (keywords) {
        case "lyonn":
            id_marca = 1;
            break;
        case "apc":
            id_marca = 2;
            break;
        case "eaton":
            id_marca = 3;
            break;
        case "athom":
            id_marca = 4;
            break;
        case "trv":
            id_marca = 5;
            break;
        case "forza":
            id_marca = 6;
            break;
        default:
            id_marca = null; 
            break;
    }
    
    let productos;

    const whereClause = {
      [Op.or]: [
          { modelo: { [Op.substring]: keywords } },
          { id_categorias: { [Op.substring]: id_cat } },
          { id_marcas: { [Op.substring]: id_marca } },
        ]
  };
    db.Producto.findAll({ 
            where: whereClause,
            include: [  
            { association: "marcas" },
            { association: "categorias" },
            { association: "imagenes" },
          ],
        }).then(result => { 
            productos = result; 
            console.log("productos!!",productos);
            res.render('products/productos', {
                title: "Resultado de la búsqueda",
                productos, 
                usuario:req.session.user, 
                toThousand,
                keywords,
                mensaje 
            })
        })
        .catch(error => {
            res.send(error)
        })
}
};

module.exports = indexController;
