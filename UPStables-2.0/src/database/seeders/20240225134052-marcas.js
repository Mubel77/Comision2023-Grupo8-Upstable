'use strict';
const {leerArchivo} = require('../../data/jsonFunctions');
const data = leerArchivo("brands");
const marcas = data.map(marca=>{
  marca.createdAt = new Date;
  marca.updatedAt = new Date;
  return marca
});

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('marcas',marcas );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('marcas', null, {}); 
  }
};
