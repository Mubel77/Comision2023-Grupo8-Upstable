const {leerArchivo} = require('../database/jsonFunctions')

function userLogedMiddleware(req, res, next) {
    res.locals.isLoged = false
    res.cookie('rememberMe',"false", {maxAge: 1000 * 60})
    
    let emailInCookie = req.cookies.userEmail
    let users = leerArchivo('users')
    let user = users.find(element => element.email == emailInCookie)

    if(user){
        req.session.userLoged = user
    }

    if(req.session && req.session.userLoged){   
        res.locals.isLoged = true
        res.locals.userLoged = req.session.userLoged
    }
    next()
}

module.exports = userLogedMiddleware;