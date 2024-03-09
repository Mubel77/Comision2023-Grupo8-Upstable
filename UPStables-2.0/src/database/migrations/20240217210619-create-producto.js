'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('productos', {
      id: {
        unsigned: true,
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
        type: DataTypes.DECIMAL
      },
      descuento: {
        unsigned: true,
        type: DataTypes.DECIMAL
      },
      stock: {
        allowNull:false,
        type: DataTypes.INTEGER
      },
      potencia: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      tomas: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      id_marcas: {
        unsigned: true,
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'marcas'
          },
          key: 'id'
        }
      },
      id_categorias: {
        unsigned: true,
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'categorias'
          },
          key: 'id'
        }
      },
      id_imagen: {
        type: DataTypes.INTEGER,
        allowNull: true, 
        unsigned: true,
        references: {
          model: {
            tableName: 'imagenes'
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
    await queryInterface.dropTable('productos');
  }
};