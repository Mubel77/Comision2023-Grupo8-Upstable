const {body} = require('express-validator');
const db = require('../database/models/index.js');
const bcrypt = require('bcryptjs');


const loginValidator = [
    body('email').notEmpty().withMessage("El campo no puede estar vacío").bail()
    .isEmail().withMessage("Formato Incorrecto").bail()
    .custom(value =>{
        console.log("VALUE:", value);
        //const user = users.find(elemento => elemento.email == value);
        db.Usuario.findOne({
            where:{
                email: value
            }
        }); 
        return value
    }).withMessage("Usuario o contraseña incorrectos"), 

    body('password').notEmpty().withMessage("El campo no puede estar vacío").bail()
    .custom((value, {req})=>{
        console.log("PASSWORD:", value);
        //const user = users.find(elemento => elemento.email == req.body.email)
        console.log("EMAIL BODY...", req.body.email);
        db.Usuario.findOne({
            where:{
                email: req.body.email
            }
        }); 
        console.log("USER:", user);
        console.log("USER-PASSWORD:", user.password);
        return bcrypt.compareSync(value, user.password);
    }).withMessage("Usuario o contraseña incorrectos")
]

module.exports = loginValidator