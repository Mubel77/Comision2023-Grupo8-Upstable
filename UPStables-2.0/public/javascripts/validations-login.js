window.onload = function(){
    const form = document.getElementById("form_login");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const msgPass = document.getElementById("p_login_pass");
    const msgEmail = document.getElementById("p_login_email");

    let emailVal = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    let sinError= false

    email.addEventListener("blur",(e)=>{
        
        if(!emailVal.test(email.value)){
            email.style.borderColor = "red"
            msgEmail.innerHTML = "Email inválido"
            sinError = false
            console.log("EMAIL:",sinError)
        };
        email.onchange = function(e){
            email.style.borderColor = "#2DD4DA"
            sinError = true
            console.log("CAMBIO EMAIL:",sinError)
            msgEmail.innerHTML = ""
        }   
    })

    password.addEventListener("blur",(e)=>{

        if(password.value.length < 7){
            password.style.borderColor = "red"
            msgPass.innerHTML = `La contraseña debe tener al menos 8 caracteres`
            sinError = false
        }
    })
    password.onchange = function(e){
        password.style.borderColor = "#2DD4DA"
        msgPass.innerHTML = ""
        sinError = true
    }

    form.addEventListener("submit",(e)=>{
    
        if(email.value == "" && password.value == ""){
            msgEmail.innerHTML = "El campo no puede estar vacío"
            msgPass.innerHTML = `El campo no puede estar vacío `
            email.style.borderColor = "red"
            password.style.borderColor = "red"
            email.onchange = function(e){
                sinError = true
                msgEmail.innerHTML = ""
            } 
        }
         
        if(sinError===false){
            e.preventDefault()
        }else{
            form.submit()
        }
    })

}