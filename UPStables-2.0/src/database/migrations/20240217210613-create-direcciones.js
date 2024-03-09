'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('direcciones', {
      id: {
        unsigned: true,
        unique: true,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      nombre_calle: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      numero_calle: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      codigo_postal: {
        type: DataTypes.INTEGER,
      },
      localidad: {
        type: DataTypes.STRING(100)
      },
      provincia: {
        type: DataTypes.STRING(100)
      },
      id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unsigned: true,
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
    await queryInterface.dropTable('direcciones');
  }
};