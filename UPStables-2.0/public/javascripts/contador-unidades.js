window.onload = function() {
// Obtener los elementos del DOM
const botonMas = document.getElementById('botonMas');
const botonMenos = document.getElementById('botonMenos');
const numeroUnidadesElemento = document.getElementById('numeroUnidades');

// Definir una constiable para el número de unidades
let numeroUnidades = 1;

// Función para actualizar el texto que muestra el número de unidades
function actualizarNumeroUnidades() {
    numeroUnidadesElemento.textContent = numeroUnidades + ' unidad';
    if(numeroUnidades > 1){
        numeroUnidadesElemento.textContent = numeroUnidades + ' unidades'
    }
}

// Evento de clic para el botón de más
botonMas.addEventListener('click', function() {
    console.log("wse hizo click")
    numeroUnidades++;
    actualizarNumeroUnidades();
});

// Evento de clic para el botón de menos
botonMenos.addEventListener('click', function() {
    if (numeroUnidades > 1) {
        numeroUnidades--;
        actualizarNumeroUnidades();
    }
});

// Llamar a la función para inicializar el texto de las unidades
actualizarNumeroUnidades();

}