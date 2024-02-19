// 'use strict';
// const {
//   Model
// } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const alias = 'Potencia';
  const cols = {
    id: {
      unsigned: true,
      unique: true,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    potencia: {
      unsigned: true,
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
    tableName: 'potencias',
    timestamp: true
  }
  const Potencia = sequelize.define(alias, cols, config)
  return Potencia;
};