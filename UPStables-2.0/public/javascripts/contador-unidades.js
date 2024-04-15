window.onload = function() {
const botonMas = document.getElementById('botonMas');
const botonMenos = document.getElementById('botonMenos');
const numeroUnidadesElemento = document.getElementById('numeroUnidades');

let numeroUnidades = 1;

function actualizarNumeroUnidades() {
    numeroUnidadesElemento.textContent = numeroUnidades + ' unidad';
    if(numeroUnidades > 1){
        numeroUnidadesElemento.textContent = numeroUnidades + ' unidades'
    }
}

botonMas.addEventListener('click', function() {
    console.log("wse hizo click")
    numeroUnidades++;
    actualizarNumeroUnidades();
});

botonMenos.addEventListener('click', function() {
    if (numeroUnidades > 1) {
        numeroUnidades--;
        actualizarNumeroUnidades();
    }
});

actualizarNumeroUnidades();

}