'use strict';
const {leerArchivo} = require('../../data/jsonFunctions');
const data = leerArchivo("products");
const productos = data.map(producto=>{
  producto.createdAt = new Date;
  producto.updatedAt = new Date;
  return producto
});

/** @type {import('sequelize-cli').Migration} */
module.exports = {

  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('productos', productos);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('productos', null, {});  
  }
};
