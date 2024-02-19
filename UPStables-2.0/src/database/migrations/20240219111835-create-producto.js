'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Productos', {
      id: {
        unsigned: true,
        unique: true,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      modelo: {
        allowNull: false,
        type: DataTypes.STRING(100)
      },
      descripcion: {
        allowNull: false,
        type: DataTypes.STRING(500)
      },
      precio: {
        allowNull: false,
        type: DataTypes.DECIMAL(8,2)
      },
      descuento: {
        type: DataTypes.DECIMAL(2,1)
      },
      stock: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      id_potencia: {
        unsigned: true,
        unique: true,
        allowNull: false,
        type: DataTypes.INTEGER
      },
      id_tomas: {
        unsigned: true,
        unique: true,
        allowNull: false,
        type: DataTypes.INTEGER
      },
      id_marcas: {
        unsigned: true,
        unique: true,
        allowNull: false,
        type: DataTypes.INTEGER
      },
      id_categorias: {
        unsigned: true,
        unique: true,
        allowNull: false,
        type: DataTypes.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Productos');
  }
};