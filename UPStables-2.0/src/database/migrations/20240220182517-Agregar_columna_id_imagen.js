'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, DataTypes) {
    await queryInterface.addColumn('productos', 'id_imagen', { 
      unsigned: true,
      unique: true,
      allowNull: false,
      type: DataTypes.INTEGER 
    });
  },

  async down (queryInterface, DataTypes) {
    await queryInterface.removeColumn('productos', 'id_imagen', { 
      unsigned: true,
      unique: true,
      allowNull: false,
      type: DataTypes.INTEGER 
    });
  }
};
