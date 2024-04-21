'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('carritos_compras', {
      id: {
        unsigned: true,
        unique: true,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      usuario_id: {
        unsigned: true,
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'usuarios'
          },
          key: 'id'
        }
      },
      producto_id: {
        unsigned: true,
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'productos'
          },
          key: 'id'
        }
      },
      cantidad:{
        unsigned: true,
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
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('carritos_compras');
  }
};