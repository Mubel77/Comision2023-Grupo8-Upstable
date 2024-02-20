// 'use strict';
// const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const alias = 'Telefono';
  const cols = {
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
      allowNull: false,
      unsigned: true
    },
    numero: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unsigned: true
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
    tableName:'telefonos',
    timestamp:true
  }
  const Telefono = sequelize.define(alias, cols, config)
  return Telefono;
};