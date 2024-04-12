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
    
    const form = document.getElementById("form_registro");
    const inputs = document.querySelectorAll(".div_config input");
    const msg= document.querySelectorAll(".div_config p");

    const expRegLetter = /^[A-Za-z ]+$/;
    const expRegNums = /^[0-9]\d*$/;
    const emailVal = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const filtro = /\.(jpg|jpeg|png|gif)$/;

    let sinError= false
    let error; 
    const email = variables.email

  
    function mostrarError(input, mensaje) {
        const errorP = input.parentElement.querySelector('.error-mensaje');
        if (!errorP) {
            const error = document.createElement("p");
            error.className = 'error-mensaje';
            error.innerHTML = mensaje;
            input.parentElement.appendChild(error);
        }else{
            errorP.remove();
            const error = document.createElement("p");
            error.className = 'error-mensaje';
            error.innerHTML = mensaje;
            input.parentElement.appendChild(error);
        }
    }
    
    function ocultarError(input) {
        const errorP = input.parentElement.querySelector('.error-mensaje');
        if (errorP) {
            errorP.remove();
        }
    }

    const nombreInput= [];

    inputs.forEach(input => {

        nombreInput.push(input.placeholder)
      
        input.addEventListener('blur', (e) => {
            const targetForm = e.target.form; 
        const formData = new FormData(targetForm); 
        
        const files = formData.getAll('imagen');
           console.log("esto es file", files)
            
           
            if (input.value.trim() === "" && input !== variables.imagen) {
                input.style.borderColor = "red"
                mostrarError(input, `Debes completar con tu ${input.placeholder}`);
                sinError = false;

                
            } else {

                ocultarError(input);
                input.style.borderColor = "#2DD4DA";
                sinError=true;

                files.forEach(file => {
                    if (input === variables.imagen && !filtro.test(file.name)) {
                        mostrarError(input, "El formato elegido no es válido, solo se admite 'JPG', 'JPGE', 'PNG', 'GIF'");
                        input.style.borderColor = "red";
                        sinError = false;
                    }
                });
                if (input === variables.email && !emailVal.test(input.value)) {
                    mostrarError(input, "Email inválido");
                    input.style.borderColor = "red"
                    sinError = false;
                }
                if(input === variables.password && input.value.length < 7){
                        mostrarError(input, "La contraseña debe tener al menos 8 caracteres");
                        input.style.borderColor = "red"
                        sinError = false;
                }
                
                if (input === variables.nombre && !expRegLetter.test(input.value)) {
                    mostrarError(input, "Sólo se pueden ingresar letras");
                    input.style.borderColor = "red"
                    sinError = false;
                }else if(input === variables.nombre && input.value.length <2 ){
                    mostrarError(input, "El nombre debe ser de mas de dos letras");
                    input.style.borderColor = "red"
                    sinError = false;
                }
                if (input === variables.apellido && !expRegLetter.test(input.value)) {
                    mostrarError(input, "Sólo se pueden ingresar letras");
                    input.style.borderColor = "red"
                    sinError = false;
                }else if(input === variables.apellido && input.value.length <2 ){
                    mostrarError(input, "El apellido debe ser de mas de dos letras");
                    input.style.borderColor = "red"
                    sinError = false;
                }
                if (input === variables.dom_num && !expRegNums.test(input.value)) {
                    mostrarError(input, "Sólo se pueden ingresar números");
                    input.style.borderColor = "red"
                    sinError = false;
                }
               
            }
        });
    });

    form.onsubmit = (e)=>{

        const formData = new FormData(e.target);
        const files = formData.getAll('imagen');
        e.preventDefault()      
        
        inputs.forEach(input=>{
            if (input.value.trim() === "" && input !== variables.imagen) {
                input.style.borderColor = "red"
                mostrarError(input, `Debes completar con tu ${input.placeholder}`);
                sinError = false;
            }
            if(input === variables.confirmPass && variables.password.value != variables.confirmPass.value){
                mostrarError(input, "La contraseña debe ser igual a la anterior");
                input.style.borderColor = "red"
                sinError = false;
            }
            if (input === variables.imagen && files.length > 1) {
                files.forEach(file => {
                    if (files.name !="" && !filtro.test(file.name)) {
                        mostrarError(input, "El formato elegido no es válido, solo se admite 'JPG', 'JPGE', 'PNG', 'GIF'");
                        input.style.borderColor = "red";
                        sinError = false;
                    }
                });
            }
        })
       
        if(sinError === true){
            form.submit()
        }   
    
    }
   
}