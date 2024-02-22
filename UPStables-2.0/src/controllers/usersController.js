const { title } = require('process');
const {leerArchivo,escribirArchivo} = require('../database/jsonFunctions');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator')

const userController = {
    register: function(req, res, next) {
        res.render('users/register', { title: 'Registro', subtitulo:"Registrate" });
      },

    createUser: function(req, res, next) {
        const errors= validationResult(req);
        if (!errors.isEmpty()){
          res.render('users/register', { title: 'Registro',subtitulo:"Registrate", errors:errors.mapped(), oldData:req.body});
         } else {
          const users = leerArchivo('users');
          const {nombre,apellido,domicilio,email,password,image} = req.body;
          const newUser = {
            nombre: nombre.trim(),
            apellido: apellido.trim(),
            domicilio: domicilio,
            email: email.trim(),
            image:req.file ? req.file.filename : "user-default.png", 
            password: bcrypt.hashSync(password,10),
          };
          users.push(newUser);
          escribirArchivo(users, 'users');
          res.redirect('/users/login');
        }
      },

    registerAdmin:  function(req, res, next) {
        res.render('users/registerAdmin', { title: 'RegistroAdmin',usuario: req.session.user});
      },

    createUserAdmin: function(req,res,next){
       const errors= validationResult(req);
       if (!errors.isEmpty()){
           res.render('users/registerAdmin', { title: 'Registro', errors:errors.mapped(), oldData:req.body});
         } else {
          const users = leerArchivo('users');
         const {nombre,apellido,domicilio,email,password,categoria,image} = req.body;
         const newAdmind = {
           nombre: nombre.trim(),
           apellido: apellido.trim(),
           domicilio: domicilio.trim(),
           email: email.trim(),
           image:req.file ? req.file.filename : "user-default.png", 
           password: bcrypt.hashSync(password,10),
           categoria
         }
         users.push( newAdmind);
         escribirArchivo(users,'users');
         res.redirect('/users/perfilAdmin')
       }
      },

    login: function(req, res, next) {
        res.render('users/login', { title: 'Login' });
      },

    loginUp: function(req, res, next) {
      const errores = validationResult(req);
      if(!errores.isEmpty()){
        res.render('./users/login', {errores:errores.mapped(), old: req.body, title: "Login"})
      }
      const {email, password} = req.body;
      const users = leerArchivo("users");
      const user = users.find(usuario=> usuario.email == email);
      
        delete user.password;
        req.session.user = user;
        res.cookie('user',user,{maxAge: 1000 * 60 * 10 });
        
        if(req.body.remember == "on") {
          res.cookie('rememberMe',"true", {maxAge: 1000 * 60 * 5 });        
        }
        
      res.redirect('/')
      },

      // contralador de la actualizacion de usuario
      formUpdateUser:(req,res)=>{
        // const {email} = req.params;
        // const users = leerArchivo('users');
        // const user = users.find(elemento => elemento.email == email);
        const {id}=req.session;
        db.User.findByPk(id)
        .then(response => {  res.render('./users/formUpdateUser',
         { title: 'Editar Usuario',subtitulo: "Editar Usuario",
         user: response.dataValues,
          usuario: req.session.user });
        })
        .catch(err => console.log(err))
         
        res.render('./users/formUpdateUser', { title: 'Editar Usuario',subtitulo: "Editar Usuario", usuario: req.session.user });
      },
      processUpdate:(req,res)=>{
         const {id} = req.params;
         const {nombre,apellido,email,domicilio,age,date,categoria,image} = req.body;
          db.User.update(
              {
               nombre: nombre.trim(),
               apellido:apellido.trim(),
               email:email.trim(),
               domicilio,
               age,
               date,
               image:req.file ? req.file.filename : element.image, 
               password: element.password,
               categoria
              },{
                where:{
                  id
                }
              }).then(UserUpDate => {
                  if(userUpdate.categoria) {
                    res.redirect(`/users/perfilAdmin/${id}`);
                  } else {
                  res.redirect(`/users/perfilUser/${id}`);
                }
              })
              .catch(err => console.log(err))
       },

    // processUpdate:(req,res)=>{
    //    // const {id} = req.params;
    //     const {nombre,apellido,email,domicilio,age,date,categoria} = req.body;
    //     const users = leerArchivo('users');
    //     const usuarios = users.map(element => {
    //       if (element.email == email) {
    //         return {
    //           nombre: nombre.trim(),
    //           apellido:apellido.trim(),
    //           email:email.trim(),
    //           domicilio,
    //           age,
    //           date,
    //           image:req.file ? req.file.filename : element.image, 
    //           password: element.password,
    //           categoria
    //         }
    //       }
    //       return element
    //     });
    //     escribirArchivo(usuarios,'users');
    //     const userUpdate = usuarios.find(elemento => elemento.email == email);
    //     req.session.user = userUpdate;
    //     console.log("This is sessionUserUpdate....",req.session.user);
    //     delete userUpdate.password
    //     res.cookie('user',(userUpdate))
    //     if(userUpdate.categoria) {
    //       res.redirect('/users/perfilAdmin');
    //     } else {
    //       res.redirect('/users/perfilUser');
    //     }
        
    //   },

    perfilAdmin: function(req,res,next){
        res.render('users/perfil-admin', {title:'Mi Perfil', usuario: req.session.user})  
        console.log("This is sessionUsuario....",{usuario:req.session.user});
      },

    perfilUser: function(req,res,next){
         res.render('users/perfil-user', {title:'Mi Perfil', usuario: req.session.user})
      },  

    logout: function(req,res,next){
      res.clearCookie('user')
      req.session.destroy()
      return res.redirect('/')
      }
}

module.exports = userController;