const {body} = require('express-validator');
const db = require('../database/models/index.js');
const bcrypt = require('bcryptjs');


const loginValidator = [
    body('email').notEmpty().withMessage("El campo no puede estar vacío").bail()
    .isEmail().withMessage("Formato Incorrecto").bail()
    .custom(async (value) =>{
        const usuario= await db.Usuario.findOne({
            where:{
                email: value
            }
        })
        if(usuario){
            return true
        }else{
            throw new Error("Usuario o contraseña incorrectos")
        }
        
    }),
    body('password').notEmpty().withMessage("El campo no puede estar vacío").bail()
    .custom(async(value, {req})=>{
        const usuario = await db.Usuario.findOne({
            where:{
                email: req.body.email
            }
        })
        if(!usuario){ 
            throw new Error("Usuario o contraseña incorrectos")
        }
        let resultado = bcrypt.compareSync(value, usuario.dataValues.password)

        if(resultado){
            return true
        }else{
            throw new Error("Usuario o contraseña incorrectos")
        }
        
    })
]

module.exports = loginValidator