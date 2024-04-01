window.onload = function() {
    const form = document.getElementById("form_registro");
    const nombre = document.getElementById("nombre");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmarPassword = document.getElementById("confirmarPassword");
    const rol = document.getElementById("rol");
    const imagen = document.getElementById("imagen");
    const msgNombre = document.getElementById("p_registro_nombre");
    const msgEmail = document.getElementById("p_registro_email");
    const msgPass = document.getElementById("p_registro_pass");
    const msgConfirmarPass = document.getElementById("p_registro_confirmar_pass");
    const msgRol = document.getElementById("p_registro_rol");
    const msgImagen = document.getElementById("p_registro_imagen");
    const botonCrear = document.getElementById("boton_crear");

    let emailVal = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let sinError = true;

    const validarNombre = function() {
        if (nombre.value.length < 2) {
            nombre.style.borderColor = "red";
            msgNombre.innerHTML = "El nombre debe tener al menos 2 caracteres";
            sinError = false;
        } else {
            nombre.style.borderColor = "#2DD4DA";
            msgNombre.innerHTML = "";
        }
    };

    const validarEmail = function() {
        if (!emailVal.test(email.value)) {
            email.style.borderColor = "red";
            msgEmail.innerHTML = "Email inválido";
            sinError = false;
        } else {
            email.style.borderColor = "#2DD4DA";
            msgEmail.innerHTML = "";
        }
    };

    const validarPassword = function() {
        if (password.value.length < 8) {
            password.style.borderColor = "red";
            msgPass.innerHTML = "La contraseña debe tener al menos 8 caracteres";
            sinError = false;
        } else {
            password.style.borderColor = "#2DD4DA";
            msgPass.innerHTML = "";
        }
    };

    const validarConfirmarPassword = function() {
        if (confirmarPassword.value !== password.value) {
            confirmarPassword.style.borderColor = "red";
            msgConfirmarPass.innerHTML = "Las contraseñas no coinciden";
            sinError = false;
        } else {
            confirmarPassword.style.borderColor = "#2DD4DA";
            msgConfirmarPass.innerHTML = "";
        }
    };

    const validarRol = function() {
        if (rol.value === "") {
            rol.style.borderColor = "red";
            msgRol.innerHTML = "Por favor, seleccione un rol";
            sinError = false;
        } else {
            rol.style.borderColor = "#2DD4DA";
            msgRol.innerHTML = "";
        }
    };
   
    const validarImagen = function() {
        const allowedExtensions = ["jpg", "jpeg", "png", "gif"];
        const fileName = imagen.value.split("\\").pop(); // Obtener solo el nombre del archivo
        const fileExtension = fileName.split(".").pop().toLowerCase(); // Obtener la extensión del archivo y convertirla a minúsculas

        if (fileName !== "") {
            if (!allowedExtensions.includes(fileExtension)) {
                imagen.style.borderColor = "red";
                msgImagen.innerHTML = "Formato de imagen no válido. Utilice archivos JPG, JPEG, PNG o GIF.";
                sinError = false;
            } else {
                imagen.style.borderColor = "#2DD4DA";
                msgImagen.innerHTML = "";
                sinError = true;
            }
        }
    };

    botonCrear.addEventListener('click', function(e) {
        // Validar campos
        validarNombre();
        validarEmail();
        validarPassword();
        validarConfirmarPassword();
        validarRol();
        validarImagen();

        // Verificar si hay errores
        if (!sinError) {
            alert('Verifica que todos los campos estén completos');
            e.preventDefault(); // Evitar que el formulario se envíe si hay errores
        } else {
            // Mostrar una ventana emergente de confirmación antes de enviar el formulario
            const confirmacion = confirm('¿Estás seguro de que deseas crear el usuario?');
            if (!confirmacion) {
                e.preventDefault(); // Evitar que el formulario se envíe si el usuario cancela la confirmación
            }
        }
    });
};