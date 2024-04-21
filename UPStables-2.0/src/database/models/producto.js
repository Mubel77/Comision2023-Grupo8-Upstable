// 'use strict';
// const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const alias = 'Producto';
  const cols = {
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
      unsigned: true,
      type: DataTypes.DECIMAL
    },
    descuento: {
      unsigned: true,
      type: DataTypes.DECIMAL
    },
    stock: {
      allowNull: false,
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
  }
  const config = {
    tableName: 'productos',
    timestamps: true
  }
  const Producto = sequelize.define(alias, cols, config)

  Producto.associate = (modelos) => {

    Producto.belongsTo(modelos.Categoria,{
      as:'categorias',
      foreignKey:'id_categorias'
    });

    Producto.belongsTo(modelos.Marca,{
      as:'marcas',
      foreignKey:'id_marcas'
    });

    Producto.hasMany(modelos.Imagen,{
      as:'imagenes',
      foreignKey:'id_producto'
    });

    Producto.hasMany(modelos.Carrito_Compra,{ 
      as: 'Carrito_Compra',
      foreignKey: 'producto_id' 
    });

    Producto.belongsToMany(modelos.Usuario,{
      as:'usuario',
      through:'carrito_compra',
      foreignKey:'producto_id',
      otherKey:'usuario_id',
      timestamps:true
    });

  }

  return Producto;
};