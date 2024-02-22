// 'use strict';
// const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const alias = 'Categoria';
  const cols = {
    id: {
      unsigned: true,
      unique: true,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    categoria: {
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
    tableName: 'categorias',
    timestamps: true
  }
  const Categoria = sequelize.define(alias, cols, config)

  Categoria.associate = (modelos) => {
    Categoria.hasOne(modelos.Producto,{
      as:'productos',
      foreignKey:'id_categorias'
    });
  }

  return Categoria;
};