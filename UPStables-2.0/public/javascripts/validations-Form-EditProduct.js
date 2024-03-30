window.onload = function() {
    const form = document.querySelector('form');
    const inputs = document.querySelectorAll('input');
    const selects = document.querySelectorAll('select');
    const categoria = document.querySelector('#id_categorias');
    const marca = document.querySelector('#id_marcas');
    const modelo = document.querySelector('#modelo');
    const descripcion = document.querySelector('#descripcion');
    const potencia = document.querySelector('#potencia');
    const tomas = document.querySelector('#tomas');
    const precio = document.querySelector('#precio');
    const descuento = document.querySelector('#descuento');
    const stock = document.querySelector('#stock');
    const imagenes = document.querySelector('#modificar_imagen');
    const boton = document.querySelector('#button-submit');
    const divs = document.querySelectorAll('.div_config');

    const msgError = document.createElement('p');
    msgError.style.color = 'red';
    msgError.style.fontStyle = 'italic';

    let files;
    const errores = {};

    function printError(input, msj) {
        if (!input.parentElement.querySelector('p')) {
            errores[input.name] = msj;
            msgError.innerText = msj;
            input.style.borderColor = 'red';
            divs.forEach(div => {
                if (div.id === `div_${input.name}`) {
                    div.appendChild(msgError.cloneNode(true));
                }
            });
        }
    }

    function cleanError(input) {
        const errorElement = input.parentElement.querySelector('p');
        if (errorElement) {
            errorElement.remove();
        }
        input.style.borderColor = 'green';
        delete errores[input.name];
    }

    function validate(input) {
        let msj;

        switch (input) {
            case categoria:
                msj = input.value ? '' : 'Debes seleccionar una categoría para el producto';
                break;
            case marca:
                msj = input.value ? '' : 'Debes seleccionar una marca para el producto';
                break;
            case modelo:
                msj = input.value ? (input.value.length < 5 || input.value.length > 100 ? 'La cadena debe tener entre 5 y 100 caracteres' : '') : 'Debes seleccionar un modelo para el producto';
                break;
            case descripcion:
                msj = input.value ? (input.value.length < 20 || input.value.length > 500 ? 'La cadena debe tener entre 20 y 500 caracteres' : '') : 'Debes definir una breve descripción del producto';
                break;
            case potencia:
                msj = input.value ? (input.value < 0 ? 'Debes ingresar un número mayor a 0 (cero)' : '') : 'Debes especificar la potencia del producto';
                break;
            case tomas:
                msj = input.value ? (input.value < 0 ? 'Debes ingresar un número mayor a 0 (cero)' : '') : 'Debes especificar la cantidad de tomas del producto';
                break;
            case precio:
                msj = input.value ? (input.value < 0 ? 'Debes ingresar un número mayor a 0 (cero)' : '') : 'Debes definir un precio para el producto';
                break;
            case descuento:
                msj = input.value ? (input.value < 0 || input.value > 100 ? 'El descuento debe oscilar entre 0 (cero) y 100 (cien)' : '') : 'Debes especificar un descuento para el producto, 0 (cero) en caso que no lo tenga';
                break;
            case stock:
                msj = input.value ? (input.value < 0 ? 'Debes ingresar un número mayor a 0 (cero)' : '') : 'Debes definir un stock para el producto';
                break;
            case imagenes:
                const filtro = /\.(jpg|jpeg|png|gif)$/;
                msj = files && files.length > 0 ? (filtro.test(files[0].name) ? '' : "El formato elegido no es válido, solo se admite 'JPG','JPGE','PNG','GIF'") : '';
                break;
            default:
                break;
        }

        if (msj) {
            printError(input, msj);
        } else {
            cleanError(input);
        }
    }

    function highlightFields() {
        inputs.forEach(input => {
            input.style.borderColor = 'green';
        });
    }

    // Resaltar los campos al cargar la página
    highlightFields();

    categoria.addEventListener('blur', () => validate(categoria));
    marca.addEventListener('blur', () => validate(marca));
    modelo.addEventListener('blur', () => validate(modelo));
    descripcion.addEventListener('blur', () => validate(descripcion));
    potencia.addEventListener('blur', () => validate(potencia));
    tomas.addEventListener('blur', () => validate(tomas));
    precio.addEventListener('blur', () => validate(precio));
    descuento.addEventListener('blur', () => validate(descuento));
    stock.addEventListener('blur', () => validate(stock));
    imagenes.addEventListener('change', () => {
        files = imagenes.files;
        if (files) {
            validate(imagenes);
        }
    });

    boton.addEventListener('click', (e) => {
        // Validar todos los campos antes de enviar el formulario
        inputs.forEach(input => validate(input));
        selects.forEach(select => validate(select));
    
        // Verificar si hay errores
        if (Object.keys(errores).length > 0) {
            alert('Verifica que todos los campos estén completos');
            e.preventDefault(); // Evitar que el formulario se envíe si hay errores
        } else {
            // Mostrar una ventana emergente de confirmación antes de enviar el formulario
            const confirmacion = confirm('¿Estás seguro de que deseas actualizar el producto?');
            if (!confirmacion) {
                e.preventDefault(); // Evitar que el formulario se envíe si el usuario cancela la confirmación
            }
        }
    });
    
};
