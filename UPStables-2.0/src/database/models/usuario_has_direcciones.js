'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const alias = '';
  const cols = {
    id: {
      unsigned: true,
      unique: true,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    id_usuario: {
      unique: true,
      unsigned: true,
      allowNull: false,
      type: DataTypes.INTEGER
    },
    id_direccion: {
      unique: true,
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
  };
  const config = {
    tableName: 'usuarios_has_direcciones',
    timestamp: true
  };
  const Usuario_has_Direcciones = sequelize.define(alias, cols, config)
  return Usuario_has_Direcciones;
};