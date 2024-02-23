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
      type: DataTypes.STRING(100),
      allowNull: false
    },
    apellido: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    rol_id: {
      type: DataTypes.INTEGER(100),
      allowNull: false,
      unsigned: true,
      unique: true,
    },
    imagen: {
      type: DataTypes.INTEGER,
      allowNull:false
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

    Usuario.belongsToMany(modelos.Producto,{
      as:'productos',
      through:'carrito_compra',
      foreignKey:'usuario_id',
      otherKey:'producto_id',
      timestamps:true
    });
  };

  return Usuario;
};