'use strict';
const {leerArchivo} = require('../../data/jsonFunctions');
const data = leerArchivo("category");
const categorias = data.map(categoria=>{
  categoria.createdAt = new Date;
  categoria.updatedAt = new Date;
  return categoria
});

/** @type {import('sequelize-cli').Migration} */
module.exports = {

  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categorias', categorias);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categorias', null, {});  
  }
};
