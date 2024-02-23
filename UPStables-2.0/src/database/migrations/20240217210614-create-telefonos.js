'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('telefonos', {
      id: {
        unsigned: true,
        unique: true,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      prefijo: {
        type: DataTypes.INTEGER,
        unsigned: true
      },
      numero: {
        type: DataTypes.INTEGER,
        unsigned: true
      },
      id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unsigned: true,
        unique: true,
        references: {
          model: {
            tableName: 'usuarios'
          },
          key: 'id'
        }
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
    await queryInterface.dropTable('telefonos');
  }
};