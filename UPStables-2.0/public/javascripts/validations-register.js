window.onload = function(){
    const variables ={
         nombre : document.getElementById("nombre"),
         apellido : document.getElementById("apellido"),
         dom_calle : document.getElementById("domicilio_calle"),
         dom_num : document.getElementById("domicilio_num"),
         fecha : document.getElementById("fecha_nacimiento"),
         imagen : document.getElementById("imagen"),
         email : document.getElementById("email"),
         password : document.getElementById("password"),
         confirmPass : document.getElementById("confirm_pass"),
    }
    
    const form = document.getElementById("form_registro")
    // const msg = document.querySelectorAll("form p");
    const inputs = document.querySelectorAll(".div_config input");
    const msg= document.querySelectorAll(".div_config p")
    
    let emailVal = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    let sinError= false
    let error; 
    const email = variables.email

    // email.addEventListener("blur",(e)=>{
        
    //     if(!emailVal.test(email.value)){
    //         email.style.borderColor = "red"
    //         error = document.createElement("p");
    //         error.innerHTML = "Email inválido"
    //         sinError = false
    //         console.log("EMAIL:",sinError)
    //     };
    //     email.onchange = function(e){
    //         email.style.borderColor = "#2DD4DA"
    //         sinError = true
    //         console.log("CAMBIO EMAIL:",sinError)
    //         error.innerHTML = ""
    //     }   
    // })
   
    // email.addEventListener("blur", () => {
    //     if (!emailVal.test(email.value)) {
    //         console.log("email no valido")
    //         email.style.borderColor = "red";
    //         error = document.createElement("p");
    //         error.innerHTML = "Email inválido";
    //         email.parentNode.insertBefore(error, email.nextSibling);
    //     } else {
    //         email.style.borderColor = "#2DD4DA";
    //         const error = email.nextSibling;
    //         if (error && error.tagName === "P") {
    //             error.remove();
    //         }
    //     }
    // });

    // const inpute= [];
    // inputs.forEach(input => {
    //     inpute.push(input.placeholder)
        
    //     input.addEventListener('blur', () => {
            
    //         if(input.value == ""){
    //             console.log("se ejecuta blur");
    //             error = document.createElement("p");
    //             error.innerHTML = `Debes completar con ${input.placeholder}`;
                
    //             input.parentNode.insertBefore(error, input.nextSibling);
    //         }else{
    //            if(error){
    //             error.innerHTML = "";
    //             sinError = true
    //            }
    //         }
            

           
    //     });

    // });
    
    function mostrarError(input, mensaje) {
        const errorCont = input.parentElement.querySelector('.error-mensaje');
        if (!errorCont) {
            const error = document.createElement("p");
            error.className = 'error-mensaje';
            error.innerHTML = mensaje;
            input.parentElement.appendChild(error);
        }
    }
    
    function ocultarError(input) {
        const errorCont = input.parentElement.querySelector('.error-mensaje');
        if (errorCont) {
            errorCont.remove();
        }
    }
    const inpute= [];
    inputs.forEach(input => {
        inpute.push(input.placeholder)
        input.addEventListener('blur', () => {
            if (input.value.trim() === "") {
                input.style.borderColor = "red"
                mostrarError(input, `Debes completar con tu ${input.placeholder}`);
                sinError = false;
            } else {
                ocultarError(input);
                input.style.borderColor = "#2DD4DA"
                if (input === variables.email && !emailVal.test(input.value)) {
                    mostrarError(input, "Email inválido");
                    input.style.borderColor = "red"
                    sinError = false;
                }
            }
        });
    });
    const password = variables.password
    password.addEventListener("blur",(e)=>{
       
        if(password.value.length < 7){
            password.style.borderColor = "red"
                mostrarError(password, "Debe tener al menos 8 caracteres");
                sinError = false;
        }else{
            ocultarError(password);
                password.style.borderColor = "#2DD4DA"
        }
    })
   

    console.log("antes de entrar al form:", sinError)

    
    form.onsubmit = (e)=>{
        if(sinError === false){
            console.log("antes de enviar:", sinError)
            e.preventDefault()
            const valInputs = [];
        inputs.forEach(element => {
            valInputs.push(element.value)
        });
            console.log("valInput:",valInputs)
             valInputs.forEach((valorInput, index) => {
            if (valorInput === "") {
                msg[index].innerHTML = `Debes completar con tu ${inpute[index]}`;
                sinError = false
            };
        });
           inputs.forEach((input, index) => {
        input.addEventListener('input', () => {
            if (input.value !== "") {
                msg[index].innerHTML = "";
                sinError = true
            }
        });
    }); 
        }else{
            console.log("todo ok:", sinError)
            form.submit()
        }
     
            
        
        
       }
    // inputs.forEach(el => {  
    //  input.push(el.placeholder)
    //  for (const key in variables) {
    //     //console.log(`valor: ${key}`)
    //     const element = variables[key];
    //     element.onclick=(e)=>{
    //         console.log("se ejecuta click");
    //      let error = document.createElement("p");
    //      error.innerHTML = `Debes completar con ${el.placeholder}`
    //      el.parentNode.insertBefore(error, el.nextSibling);
    //     }
    //  }
    // //  el.onblur = (e)=>{
    // //     if(el.value == ""){

    // //         msg.forEach((element, index)=> {
    // //             console.log(input[1]);
    // //             element.innerHTML = `Debes completar con tu ${input[index]}`
    // //         });
        
    // //     }
    // // }
    // });
   
    
}