'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const alias = '';
  const cols = {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    id_usuario: {
      unique: true,
      unsigned: true,
      type: DataTypes.INTEGER
    },
    id_telefono: {
      unique: true,
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
    tableName: 'usuarios_has_telefonos',
    timestamp: true
  };
  const Usuario_has_Telefono = sequelize.define(alias, cols, config)
  return Usuario_has_Telefono;
};