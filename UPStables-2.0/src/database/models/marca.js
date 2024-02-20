// 'use strict';
// const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const alias = 'Marca';
  const cols = {
    id: {
      unsigned: true,
      unique: true,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    marca: {
      allowNull: false,
      type: DataTypes.STRING(100)
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
    tableName: 'marcas',
    timestamps: true
  }
  const Marca = sequelize.define(alias, cols, config)
  return Marca;
};