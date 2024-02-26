'use strict';
const {leerArchivo} = require('../../data/jsonFunctions');
const data = leerArchivo("images");
const imagenes = data.map(imagen=>{
  imagen.createdAt = new Date;
  imagen.updatedAt = new Date;
  return imagen
});

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('imagenes', imagenes);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('imagenes', null, {});
  }
};
