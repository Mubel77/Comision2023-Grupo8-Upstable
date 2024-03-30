window.onload = function() {
    const form = document.querySelector('form');
    const inputs = document.querySelectorAll('input');
    const boton = document.querySelector('#boton_crear');
    const divs = document.querySelectorAll('.div_config');
    const nombre = document.querySelector('#nombre');
    const apellido = document.querySelector('#apellido');
    const nombre_calle = document.querySelector('#nombre_calle');
    const numero_calle = document.querySelector('#numero_calle');
    const fecha_nacimiento = document.querySelector('#fecha_nacimiento');
    const rol = document.querySelector('#rol_id');
    const email = document.querySelector('#email');
    const password = document.querySelector('#password');
    const confirmarPassword = document.querySelector('#passwordConfirmation');
    const imagen = document.querySelector('#imagen');

    const msgError = document.createElement('p');
    msgError.style.color = 'red';
    msgError.style.fontStyle = 'italic';

    let file;
    const errores = {};

    function printError(input, msj) {
        errores[input.name] = msj;
        msgError.innerText = msj;
        input.style.borderColor = 'red';
        divs.forEach(div => {
            if (div.id == `div_${input.name}`) {
                div.appendChild(msgError);
            }
        });
    }

    function cleanError(input) {
        msgError.remove();
        input.style.borderColor = '#2DD4DA';
        delete errores[input.name];
    }

    function validate(input) {
        let msj;
        const expRegLetter = /^[A-Za-z ]+$/;

        switch (input) {
            case nombre:
                if (input.value == '') {
                    msj = "Debes completar con tu nombre";
                    printError(input, msj);
                } else if (input.value.length < 2 || !(expRegLetter.test(input.value))) {
                    msj = "El nombre debe tener al menos 2 caracteres, solo se admiten letras";
                    printError(input, msj);
                } else {
                    cleanError(input);
                }
                break;

            case apellido:
                if (input.value == '') {
                    msj = "Debes completar con tu apellido";
                    printError(input, msj);
                } else if (input.value.length < 2 || !(expRegLetter.test(input.value))) {
                    msj = "El apellido debe tener al menos 2 caracteres, solo se admiten letras";
                    printError(input, msj);
                } else {
                    cleanError(input);
                }
                break;

            case numero_calle:
                if (input.value == '') {
                    msj = "Debes completar el NUMERO del domicilio";
                    printError(input, msj);
                } else if (input.value < 1 || input.value >= 100000) {
                    msj = "Debe ser un numero entre 1 (uno) y 100000 (cien mil)";
                    printError(input, msj);
                } else {
                    cleanError(input);
                }
                break;

            case nombre_calle:
                if (input.value == '') {
                    msj = "Debes completar el nombre de la CALLE";
                    printError(input, msj);
                } else if (input.value.length < 3) {
                    msj = "El domicilio debe tener al menos 3 caracteres";
                    printError(input, msj);
                } else {
                    cleanError(input);
                }
                break;

            case fecha_nacimiento:
                const expRegDate = /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[012])\/([1-9][0-9]{3})$/;

                if (expRegDate.test(fecha_nacimiento.value)) {
                    return cleanError(fecha_nacimiento);
                } else {
                    msj = "Debes completar la fecha de nacimiento con el formato '' DD / MM / YYYY ''";
                    printError(fecha_nacimiento, msj);
                }
                break;

            case imagen:
                const filtro = /\.(jpg|jpeg|png|gif)$/;
                file = input.files;
                if (file[0]) {
                    if (filtro.test(file[0].name)) {
                        return cleanError(imagen);
                    } else {
                        msj = "El formato elegido no es valido, solo se admite 'JPG','JPGE','PNG','GIF'";
                        printError(imagen, msj);
                    }
                } else {
                    return cleanError(imagen);
                }
                break;

            default:
                break;
        }
    }

    function confirmacion() {
        return confirm('¿Estás seguro de que deseas crear el usuario?');
    }

    boton.addEventListener('click', (e) => {
        inputs.forEach(input => {
            validate(input);
        });

        if (Object.keys(errores).length > 0) {
            msgError.remove();
            alert('Verifica que todos los campos estén completos correctamente');
            e.preventDefault();
        } else {
            if (confirmacion()) {
                form.submit();
            } else {
                e.preventDefault();
            }
        }
    });
};
