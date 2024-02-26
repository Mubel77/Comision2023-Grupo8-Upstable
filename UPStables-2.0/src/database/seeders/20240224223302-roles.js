'use strict';
const {leerArchivo} = require('../../data/jsonFunctions');
const data = leerArchivo("rols");
const roles = data.map(rol=>{
  rol.createdAt = new Date;
  rol.updatedAt = new Date;
  return rol
});

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('roles', roles);  
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', null, {});  
  }
};
