'use strict';
const {leerArchivo} = require('../../data/jsonFunctions');
const data = leerArchivo("phones");
const telefonos = data.map(telefono=>{
  telefono.createdAt = new Date;
  telefono.updatedAt = new Date;
  return telefono
});

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('telefonos', telefonos);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('telefonos', null, {});
  }
};
