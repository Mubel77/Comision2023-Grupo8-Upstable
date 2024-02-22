// 'use strict';
// const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const alias = 'Imagen';
  const cols = {
    id: {
      unsigned: true,
      unique: true,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    nombre: {
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    ubicacion: {
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    usuario_id: {
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
  };
  const config = {
    tableName:'imagenes',
    timestamp: true
  };
  const Imagen = sequelize.define(alias, cols, config);

  Imagen.associate = (modelos) => {
    Imagen.hasOne(modelos.Usuario,{
      as: 'usuarios',
      foreignKey: 'usuario_id'
    })
  }

  return Imagen;
};