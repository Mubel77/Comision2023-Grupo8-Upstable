window.onload = function() {
    const botonMas = document.getElementById('botonMas');
    const botonMenos = document.getElementById('botonMenos');
    const botonCarrito = document.getElementById('botonCarrito'); 
    const numeroUnidadesElemento = document.getElementById('numeroUnidades');
    const cantUnidades = numeroUnidadesElemento.innerText;
    const contadorCarritoElemento = document.getElementById('cartItemCount');
    const idProducto = document.getElementById('idProducto') 
    const id = idProducto.innerText


    let numeroUnidades = 1;
    let contadorCarrito = 0; 
    let botonCarritoPresionado = false;

    function cargarProduto(e){
        e.preventDefault();
        if(e.target.classlist.contains('botonCarrito')){
            const producto = e.target.parentElement.parentElement;
            // this.leerDatoProducto(producto)
            console.log(producto);
        }
    }
let cantidad
    function actualizarNumeroUnidades() {
        numeroUnidadesElemento.textContent = numeroUnidades + ' unidad';
        if (numeroUnidades !== 1) {
            numeroUnidadesElemento.textContent = numeroUnidades + ' unidades';
        }
       cantidad=numeroUnidadesElemento.innerText
        console.log(numeroUnidadesElemento.innerText, 'wwwww');
        actualizarContadorCarrito();
    }

    function actualizarContadorCarrito() {

        contadorCarritoElemento.textContent = contadorCarrito;
    }

    botonMas.addEventListener('click', function() {
        numeroUnidades++;
        contadorCarrito++;
        actualizarNumeroUnidades();
        console.log("Se hizo click en el botón de más",numeroUnidades);
    });

    botonMenos.addEventListener('click', function() {
        if (numeroUnidades > 1) {
            console.log("Se hizo click en el botón de menos");
            numeroUnidades--;
            contadorCarrito--;
            actualizarNumeroUnidades();
        }
    });

    botonCarrito.addEventListener('click', function() {
        if (!botonCarritoPresionado) { 
            contadorCarrito++;
            // console.log("Se hizo click en el botón de más");
            actualizarContadorCarrito();
            botonCarritoPresionado = true;

        }
        console.log(cantUnidades,'geeeeeee');
        localStorage.setItem('id', id)
        localStorage.setItem('unidades', cantidad)
    });

    actualizarNumeroUnidades();
};
