'use strict';
const {leerArchivo} = require('../../data/jsonFunctions');
const data = leerArchivo("adresses");
const direcciones = data.map(direccion=>{
  direccion.createdAt = new Date;
  direccion.updatedAt = new Date;
  return direccion
});

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('direcciones', direcciones);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('direcciones', null, {});
  }
};
