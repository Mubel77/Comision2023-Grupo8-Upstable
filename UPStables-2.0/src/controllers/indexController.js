const fs = require("fs");
const path = require("path");
const json = fs.readFileSync(path.join(__dirname,"../database/productos.json"),"utf-8")
const productos = JSON.parse(json);
// const productos=[
//   {
//     id:"1",
//     nombre:"Estabilizador",
//     descripcion:"Estabilizador De Tensión Trv - Gohan - 1200va(pico) F",
//     precio:50000,
//     imagen:"estabilizador4.png"

//   },
//   {
//     id:"2",
//     nombre:"Estabilizador",
//     descripcion:"Estabilizador De Tensión Trv -Goku- 1200va(pico) F",
//     precio:60000,
//     imagen:"estabilizador 1.png"

//   },
//   {
//     id:"3",
//     nombre:"Estabilizador",
//     descripcion:"Estabilizador De Tensión Trv - Veggeta- 1200va(pico) F",
//     precio:40000,
//     imagen:"estabilizador3.png"

//   },
//   {
//     id:"4",
//     nombre:"Estabilizador",
//     descripcion:"Estabilizador De Tensión Trv - Crillin - 1200va(pico) F",
//     precio:10000,
//     imagen:"estabilizador2.png"

//   },
//   {
//     id:"5",
//     nombre:"Estabilizador",
//     descripcion:"Estabilizador De Tensión Trv - Bulma - 1200va(pico) F",
//     precio:10000,
//     imagen:"estabilizador2.png"

//   },
//   {
//     id:"6",
//     nombre:"Estabilizador",
//     descripcion:"Estabilizador De Tensión Trv - Piccollo - 1200va(pico) F",
//     precio:10000,
//     imagen:"estabilizador2.png"

//   }
// ]
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
        res.render('index', { title: 'UPStables', productos, publicidad});
      },
}

module.exports = indexController;