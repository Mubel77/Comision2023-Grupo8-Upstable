'use strict';
const bcrypt = require("bcryptjs");
const { parse } = require("@formkit/tempo") 
const {leerArchivo} = require('../../data/jsonFunctions');
const data = leerArchivo("users");
const usuarios = data.map(usuario=>{
  let fecha = parse({
    date: usuario.fecha_nacimiento,
    format: "YYYY-MM-DD HH:mm:ss"
  });
  usuario.fecha_nacimiento = fecha;
  usuario.password = bcrypt.hashSync(usuario.password, 10)
  usuario.createdAt = new Date;
  usuario.updatedAt = new Date;
  return usuario
});

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('usuarios', usuarios);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('usuarios', null, {});  
  }
};
