// 'use strict';
// const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const alias = 'Toma';
  const cols = {
    id: {
      unsigned: true,
      unique: true,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    cantidad: {
      unsigned: true,
      allowNull: false,
      type: DataTypes.TINYINT
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
    tableName: 'tomas',
    timestamps: true
  }
  const Toma = sequelize.define(alias, cols, config)

  Toma.associate = (modelos) => {
    Toma.hasOne(modelos.Producto,{
      as:'productos',
      foreignKey:'id_tomas'
    });
  }

  return Toma;
};