const {body} = require('express-validator');
const {leerArchivo} = require('../database/jsonFunctions');
const bcrypt = require('bcryptjs');
const users = leerArchivo("users");

const loginValidator = [
    body('email').notEmpty().withMessage("El campo no puede estar vacío").bail()
    .isEmail().withMessage("Formato Incorrecto").bail()
    .custom(value =>{
        console.log("VALUE:", value);
        const user = users.find(elemento => elemento.email == value);
        return user ? true : false
    }).withMessage("El usuario no existe"), 

    body('password').notEmpty().withMessage("El campo no puede estar vacío").bail()
    .custom((value, {req})=>{
        console.log("PASSWORD:", value);
        const user = users.find(elemento => elemento.email == req.body.email)
        console.log("USER:", user);
        console.log("USER-PASSWORD:", user.password);
        if(value == user.password){
            return value
        }
    }).withMessage("Contraseña incorrecta")
]

module.exports = loginValidator