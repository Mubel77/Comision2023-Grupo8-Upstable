'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('imagenes', {
      id: {
        unsigned: true,
        unique: true,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      nombre: {
        allowNull: false,
        type: DataTypes.STRING(100)
      },
      ubicacion: {
        allowNull: false,
        type: DataTypes.STRING(100)
      },
      id_producto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unsigned: true,
        references: {
          model: {
            tableName:'productos'
          },
          key: 'id'
        }
      },
      imagenes: {
        allowNull: true,
        type: DataTypes.JSON, 
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
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('imagenes');
  }
};