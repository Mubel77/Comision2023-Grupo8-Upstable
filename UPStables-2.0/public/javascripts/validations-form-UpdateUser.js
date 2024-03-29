window.onload = function() {
  const form = document.querySelector('form')
  const inputs = document.querySelectorAll('input')
  const boton = document.querySelector('#button-submit')
  const divs = document.querySelectorAll('.div_config')
  const nombre = document.querySelector('#nombre')
  const apellido = document.querySelector('#apellido')
  const prefijo = document.querySelector('#prefijo')
  const numero = document.querySelector('#numero')
  const numero_calle = document.querySelector('#numero_calle')
  const nombre_calle = document.querySelector('#nombre_calle')
  const codigo_postal = document.querySelector('#codigo_postal')
  const localidad = document.querySelector('#localidad')
  const provincia = document.querySelector('#provincia')
  const email = document.querySelector('#email')
  const fecha_nacimiento = document.querySelector('#fecha_nacimiento')

  const msgError = document.createElement('p') 
  msgError.style.color = 'red'
  msgError.style.fontStyle = 'italic'

  const file = '';
  const errores = {};

  function printError(input,msj) {
    errores[input.name] = msj ;
    msgError.innerText = msj
    input.style.borderColor = 'red'
    divs.forEach(div => {
      if(div.id == `div_${input.name}`) {
        div.appendChild(msgError)
      }
    })
  }
  
  function cleanError(input) {
    msgError.remove()
    input.style.borderColor = '#2DD4DA'
    delete errores[input.name]
  }

  function validate(input) {
    let msj
    const expRegLetter = /^[A-Za-z ]+$/

    switch (input) {

      case (nombre):

        if(input.value == ''){
          msj = "Debes completar con tu nombre"
          printError(input,msj)
        } else if(input.value.length < 2 || !(expRegLetter.test(input.value))){
          msj = "El nombre debe tener al menos 2 caracteres, solo se admiten letras"
          printError(input,msj)
        } else {
          cleanError(input)
        }
      break;
    
      case (apellido):
        if(input.value == ''){
          msj = "Debes completar con tu apellido"
          printError(input,msj)
        } else if(input.value.length < 2 || !(expRegLetter.test(input.value))){
          msj = "El apellido debe tener al menos 2 caracteres, solo se admiten letras"
          printError(input,msj)
        } else {
          cleanError(input)
        }
      break;
  
      case (prefijo):
        if(input.value == ''){
          msj = "Debes completar el PREFIJO de tu region"
          printError(input,msj)
        } else if(input.value < 11 || input.value >= 10000){
          msj = "Debe ser un numero entre 11 (uno) y 10000 (diez mil)"
          printError(input,msj)
        } else {
          cleanError(input)
        }
      break;
  
      case (numero):
        if(input.value == ''){
          msj = "Debes completar el NUMERO de tu telefono"
          printError(input,msj)
        } else if(input.value < 9999999 || input.value > 99999999){
          msj = "Debe ser un numero de 8 digitos sin guiones. Por ej: 11223344"
          printError(input,msj)
        } else {
          cleanError(input)
        }
      break;
  
      case (numero_calle):
        if(input.value == ''){
          msj = "Debes completar el NUMERO del domicilio"
          printError(input,msj)
        } else if(input.value < 1 || input.value >= 100000){
          msj = "Debe ser un numero entre 1 (uno) y 100000 (cien mil)"
          printError(input,msj)
        } else {
          cleanError(input)
        }
      break;
  
      case (nombre_calle):
        if(input.value == ''){
          msj = "Debes completar el nombre de la CALLE"
          printError(input,msj)
        } else if(input.value.length < 3){
          msj = "El domicilio debe tener al menos 3 caracteres"
          printError(input,msj)
        } else {
          cleanError(input)
        }
      break;
  
      case (codigo_postal):
        if(input.value == ''){
          msj = "Debes completar con el Codigo Postal de tu region"
          printError(input,msj)
        } else if(input.value < 1 || input.value >= 10000){
          msj = "Debe ser un numero entre 1 (uno) y 10000 (diez mil)"
          printError(input,msj)
        } else {
          cleanError(input)
        }
      break;
  
      case (localidad):
        if(input.value == ''){
          msj = "Debes completar el nombre de tu Localidad"
          printError(input,msj)
        } else if(input.value.length < 3 || !(expRegLetter.test(input.value))) {
          msj = "El nombre debe tener al menos 3 caracteres, solo se admiten letras"
          printError(input,msj)
        } else {
          cleanError(input)
        }
      break;
  
      case (provincia):
        if(input.value == ''){
          msj = "Debes completar el nombre de tu Provincia"
          printError(input,msj)
        } else if(input.value.length < 3 || !(expRegLetter.test(input.value))){
          msj = "El nombre debe tener al menos 3 caracteres, solo se admiten letras"
          printError(input,msj)
        } else {
          cleanError(input)
        }
      break;

      case (email):
        const expRegEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if(input.value == ''){
          msj = "El campo no puede estar vacio"
          printError(input,msj)
        } else if(expRegEmail.test(email.value)){
          cleanError(input)
        } else {
          msj = "Debe ser un correo con formato valido"
          printError(input,msj)
        }
      break;

      case (fecha_nacimiento):
        const expRegDate = /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[012])\/([1-9][0-9]{3})$/

        if(expRegDate.test(fecha_nacimiento.value)) {
          return cleanError(fecha_nacimiento)
        } else {
          msj = "Debes completar la fecha de nacimiento con el formato '' DD / MM / YYYY ''"
          printError(fecha_nacimiento,msj)
        }
      break;

      case (file):
        const filtro = /\.(jpg|jpeg|png|gif)$/;
        if(files[0]){
          if (filtro.test(files[0].name)) {
            return cleanError(imagenes)
          } else {
            msj = ""
            printError(imagenes,msj)
          }
        } else {
          return cleanError(imagenes)
        }
      break;
  
      default:
        break;
    }
  }

  nombre.addEventListener('blur', (e)=> {
    if(e){
      validate(nombre)
    }
  })
  apellido.addEventListener('blur', (e)=> {
    if(e){
      validate(apellido)
    }
  })
  prefijo.addEventListener('blur', (e)=> {
    if(e){
      validate(prefijo)
    }
  })
  numero.addEventListener('blur', (e)=> {
    if(e){
      validate(numero)
    }
  })
  numero_calle.addEventListener('blur', (e)=> {
    if(e){
      validate(numero_calle)
    }
  })
  nombre_calle.addEventListener('blur', (e)=> {
    if(e){
      validate(nombre_calle)
    }
  })
  codigo_postal.addEventListener('blur', (e)=> {
    if(e){
      validate(codigo_postal)
    }
  })
  localidad.addEventListener('blur', (e)=> {
    if(e){
      validate(localidad)
    }
  })
  provincia.addEventListener('blur', (e)=> {
    if(e){
      validate(provincia)
    }
  })
  fecha_nacimiento.addEventListener('blur', (e)=> {
    if(e){
      validate(fecha_nacimiento)
    }
  })
  email.addEventListener('blur', (e)=> {
    if(e){
      validate(email)
    }
  })

  boton.addEventListener('click', (e) => {
    inputs.forEach(input => {
      validate(input)
    })

    if (Object.keys(errores).length > 0) {
      msgError.remove()
      alert('Verifica que todos los campos esten completos correctamente')
      e.preventDefault()
    } else {
      form.submit()
    }
  })

}