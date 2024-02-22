// 'use strict';
// const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const alias = 'Usuario';
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
      type: DataTypes.STRING,
      allowNull: false
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rol_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unsigned: true,
      unique: true
    },
    imagen_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unsigned: true,
      unique: true
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
    tableName : 'usuarios',
    timestamp : true
  };
  const Usuario = sequelize.define(alias, cols, config);

  Usuario.associate = (modelos) => {
    Usuario.belongsTo(modelos.Rol, { 
      as: 'roles',
      foreignKey: 'rol_id' 
    });

    Usuario.hasMany(modelos.Direccion, { 
      as: 'direcciones',
      foreignKey: 'id_usuario' 
    }); 

    Usuario.hasMany(modelos.Telefono, { 
      as: 'telefonos',
      foreignKey: 'id_usuario' 
    });

    Usuario.belongsTo(modelos.Imagen,{
      as:'imagenes',
      foreignKey: 'imagen_id'
    })
  };

  return Usuario;
};