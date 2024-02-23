// 'use strict';
// const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const alias = 'Carrito_Compra';
  const cols = {
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
      unique: true,
      allowNull: false,
      type: DataTypes.INTEGER
    },
    producto_id: {
      unsigned: true,
      unique: true,
      allowNull: false,
      type: DataTypes.INTEGER
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
  };
  const config = {
    tableName: 'carritos_compras',
    timestamps: true
  };
  const Carrito_Compra = sequelize.define(alias, cols, config);
  return Carrito_Compra;
};