const sessionValidator = (req,res,next)=>{
    if(req.session.user){
        next()
    }
    res.redirect("/users/login");
}

const isAdmin = (req,res,next) => {
    if (req.session.user && req.session.user.categoria) {
        next();
    };
    res.redirect("/");
}

module.exports = {sessionValidator, isAdmin}