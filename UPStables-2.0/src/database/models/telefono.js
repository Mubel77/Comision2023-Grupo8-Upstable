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
      unsigned: true
    },
    numero: {
      type: DataTypes.INTEGER,
      unsigned: true
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unsigned: true,
      unique: true,
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
  };
  const Telefono = sequelize.define(alias, cols, config);

  Telefono.associate = (modelos) => {
    Telefono.belongsTo(modelos.Usuario,{
      as:'usuarios',
      foreignKey: 'id_usuario'
    })
  }

  return Telefono;
};