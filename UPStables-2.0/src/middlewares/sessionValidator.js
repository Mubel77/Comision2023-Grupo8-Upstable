const sessionValidator = (req,res,next)=>{
    if(req.session.user){
    console.log(".........Estoy en session soy USUARIO Id ",req.session.user.id);
        next()
    } else {
        res.redirect("/users/login");
    }
}

const isAdmin = (req,res,next) => {
    if (req.session.user && req.session.user.roles.rol_id !== 1) {
        next();
    } else {
        res.redirect("/");
    }
    
}

module.exports = {sessionValidator, isAdmin}