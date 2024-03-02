// 'use strict';
// const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const alias = 'Direccion';
  const cols = {
    id: {
      unsigned: true,
      unique: true,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    nombre_calle: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    numero_calle: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    codigo_postal: {
      type: DataTypes.INTEGER
    },
    localidad: {
      type: DataTypes.STRING(100)
    },
    provincia: {
      type: DataTypes.STRING(100)
    },
    id_usuario: {
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
    tableName:'direcciones',
    timestamps: true
  };
  const Direccion = sequelize.define(alias, cols, config);

  Direccion.associate = (modelos) => {
    Direccion.belongsTo(modelos.Usuario, { 
      as: 'usuarios',
      foreignKey: 'id_usuario' 
    });
  };

  return Direccion;
};