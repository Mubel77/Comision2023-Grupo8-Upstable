window.onload = function() {
  const form = document.querySelector('form')
  const inputs = document.querySelectorAll('input')
  const selects = document.querySelectorAll('select')
  const categoria = document.querySelector('#id_categorias')
  const marca = document.querySelector('#id_marcas')
  const modelo = document.querySelector('#modelo')
  const descripcion = document.querySelector('#descripcion')
  const potencia = document.querySelector('#potencia')
  const tomas = document.querySelector('#tomas')
  const precio = document.querySelector('#precio')
  const descuento = document.querySelector('#descuento')
  const stock = document.querySelector('#stock')
  const imagenes = document.querySelector('#imagenes')
  const boton = document.querySelector('#button-submit')
  const divs = document.querySelectorAll('.div_config')

  const msgError = document.createElement('p') // p
  msgError.style.color = 'red'
  msgError.style.fontStyle = 'italic'

  let files;
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
    input.style.borderColor = 'green'
    delete errores[input.name]
  }

  function validate(input) {
    let msj

    switch (input) {

      case (categoria):
        if(input.value == ''){
          msj = 'Debes seleccionar una categoria para el producto'
         printError(input,msj)
        } else {
          cleanError(input)
        }
      break;
    
      case (marca):
        if(input.value == ''){
          msj = 'Debes seleccionar una marca para el producto'
          printError(input,msj)
         } else {
          cleanError(input)
         }
      break;
  
      case (modelo):
        if(input.value == ''){
          msj = 'Debes seleccionar un modelo para el producto'
          printError(input,msj)
         } else if (input.value.length < 5 || input.value.length > 100) {
          msj = 'La cadena debe tener entre 5 y 100 caracteres'
          printError(input,msj)
         } else {
          cleanError(input)
         }
      break;
  
      case (descripcion):
        if(input.value == ''){
          msj = 'Debes definir una breve descripcion del producto'
          printError(input,msj)
         } else if (input.value.length < 20 || input.value.length > 500) {
          msj = 'La cadena debe tener entre 20 y 500 caracteres'
          printError(input,msj)
         } else {
          cleanError(input)
         }
      break;
  
      case (potencia):
        if(input.value == ''){
          msj = 'Debes especificar la potencia del producto'
          printError(input,msj)
         } else if (input.value < 0) {
          msj = 'Debes ingresar un numero mayor a 0 (cero)'
          printError(input,msj)
         } else {
          cleanError(input)
         }
      break;
  
      case (tomas):
        if(input.value == ''){
          msj = 'Debes especificar la cantidad de tomas del producto'
          printError(input,msj)
         } else if (input.value < 0) {
          msj = 'Debes ingresar un numero mayor a 0 (cero)'
          printError(input,msj)
         } else {
          cleanError(input)
         }
      break;
  
      case (precio):
        if(input.value == ''){
          msj = 'Debes definir un precio para el producto'
          printError(input,msj)
         } else if (input.value < 0) {
          msj = 'Debes ingresar un numero mayor a 0 (cero)'
          printError(input,msj)
         } else {
          cleanError(input)
         }
      break;
  
      case (descuento):
        if(input.value == ''){
          msj = 'Debes especificar un descuento para el producto, 0 (cero) en caso que no lo tenga'
          printError(input,msj)
         } else if (input.value < 0 || input.value > 100) {
          msj = 'El descuento debe oscilar entre 0 (cero) y 100 (cien)'
          printError(input,msj)
         } else {
          cleanError(input)
         }
      break;
  
      case (stock):
        if(input.value == ''){
          msj = 'Debes definir un stock para el producto'
          printError(input,msj)
         } else if (input.value < 0) {
          msj = 'Debes ingresar un numero mayor a 0 (cero)'
          printError(input,msj)
         } else {
          cleanError(input)
         }
      break;

      case (files):
        const filtro = /\.(jpg|jpeg|png|gif)$/;
        if(files[0]){
          if (filtro.test(files[0].name)) {
            return cleanError(imagenes)
          } else {
            msj = "El formato elegido no es valido, solo se admite 'JPG','JPGE','PNG','GIF'"
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

  categoria.addEventListener('blur', (e)=> {
    if(e){
      validate(categoria)
    }
  })
  marca.addEventListener('blur', (e)=> {
    if(e){
      validate(marca)
    }
  })
  modelo.addEventListener('blur', (e)=> {
    if(e){
      validate(modelo)
    }
  })
  descripcion.addEventListener('blur', (e)=> {
    if(e){
      validate(descripcion)
    }
  })
  potencia.addEventListener('blur', (e)=> {
    if(e){
      validate(potencia)
    }
  })
  tomas.addEventListener('blur', (e)=> {
    if(e){
      validate(tomas)
    }
  })
  precio.addEventListener('blur', (e)=> {
    if(e){
      validate(precio)
    }
  })
  descuento.addEventListener('blur', (e)=> {
    if(e){
      validate(descuento)
    }
  })
  stock.addEventListener('blur', (e)=> {
    if(e){
      validate(stock)
    }
  })
  imagenes.addEventListener('blur', (e)=> {
    files = e.target.files
    console.log("Aca..",files);
    if(files){
      validate(files)
    }
  })

  boton.addEventListener('click', (e) => {
    inputs.forEach(input => {
      validate(input)
    })
    selects.forEach(select => {
      validate(select)
    })
    console.log('esto es ERRORES...',errores);
    if (Object.keys(errores).length > 0) {
      alert('Verifica que todos los campos esten completos')
      e.preventDefault()
    } else {
      form.submit()
    }
  })
}