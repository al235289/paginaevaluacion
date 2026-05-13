function redirigirALogin(event) {
    event.preventDefault(); 

    Swal.fire({
        title: '¡Registro exitoso!',
        text: 'Te hemos enviado un código a tu correo institucional.',
        icon: 'success',
        confirmButtonText: 'Ingresar Código',
        confirmButtonColor: '#0055A5' // O el color de tu botón
    }).then((result) => {
        if (result.isConfirmed) {
            // Hacemos visible la ventana de verificación
            const ventana = document.getElementById('ventana-verificacion');
            ventana.style.display = 'flex';
        }
    });
}


// 2. EFECTOS DE LAS CASILLAS (Saltar a la siguiente / Regresar al borrar)
const inputsCodigo = document.querySelectorAll('.codigo-input');

inputsCodigo.forEach((input, index) => {
    // Cuando el usuario escribe algo
    input.addEventListener('input', (e) => {
        // Si escribió 1 número y no es la última casilla, pasa a la siguiente
        if (e.target.value.length === 1 && index < inputsCodigo.length - 1) {
            inputsCodigo[index + 1].focus();
        }
    });

    // Cuando el usuario presiona una tecla (para detectar si borra)
    input.addEventListener('keydown', (e) => {
        // Si presiona "Borrar", la casilla está vacía y no es la primera, regresa a la anterior
        if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
            inputsCodigo[index - 1].focus();
        }
    });
});


// 3. FUNCIÓN PARA VALIDAR EL CÓDIGO FINAL
function verificarCodigo(event) {
    event.preventDefault();

    // Recogemos el valor de cada una de las 4 casillas y los unimos
    let codigoIngresado = '';
    inputsCodigo.forEach(input => {
        codigoIngresado += input.value; 
    });

    // Comparamos el código unido con "1234"
    if (codigoIngresado === "1234") {
        Swal.fire({
            title: '¡Cuenta Verificada!',
            text: 'Tu correo ha sido validado correctamente.',
            icon: 'success',
            confirmButtonText: 'Iniciar Sesión',
            confirmButtonColor: '#0055A5'
        }).then(() => {
            // Lo mandas a tu archivo de inicio de sesión real
            window.location.href = "index.html"; 
        });
    } else {
        Swal.fire({
            title: 'Código Incorrecto',
            text: 'Por favor, intenta de nuevo.',
            icon: 'error',
            confirmButtonText: 'Reintentar',
            confirmButtonColor: '#d33'
        }).then(() => {
            // Un toque pro: Limpiamos las casillas para que vuelva a intentar
            inputsCodigo.forEach(input => input.value = '');
            inputsCodigo[0].focus(); // Regresamos el cursor a la primera casilla
        });
    }
}

function iniciarSesion(event) {
    event.preventDefault(); 
    
    Swal.fire({
        title: '¡Bienvenido a C.A.M.E.!',
        text: 'Iniciando sesión...',
        timer: 1500,
        showConfirmButton: false 
    }).then(() => {
        window.location.href = "home.html";
    });
}

/* ====================================================
   GESTIÓN DE MODALES C.A.M.E.
   ==================================================== */

// 1. Elementos del Formulario de Donación
const modalFormulario = document.getElementById('modal-donar');
const btnAbrirFormulario = document.getElementById('btn-nueva-pub');
const btnCerrarFormulario = document.getElementById('cerrar-modal');
const formPublicar = document.getElementById('form-donacion');

// 2. Elementos del Anuncio de Éxito
const modalExito = document.getElementById('modal-exito');
const btnEntendido = document.getElementById('btn-entendido');

// 3. Elementos de la lógica de Precio (Venta)
const checkVenta = document.getElementById('vender-check');
const contenedorPrecio = document.getElementById('contenedor-precio');


/* --- Lógica para Abrir/Cerrar Formulario --- */

btnAbrirFormulario.addEventListener('click', () => {
    modalFormulario.style.display = 'flex';
});

btnCerrarFormulario.addEventListener('click', () => {
    modalFormulario.style.display = 'none';
});

// Cerrar modales si se hace clic fuera de la caja blanca
window.addEventListener('click', (e) => {
    if (e.target === modalFormulario) modalFormulario.style.display = 'none';
    if (e.target === modalExito) modalExito.style.display = 'none';
});


/* --- Lógica Dinámica de Precio --- */

checkVenta.addEventListener('change', () => {
    if (checkVenta.checked) {
        contenedorPrecio.style.display = 'block';
    } else {
        contenedorPrecio.style.display = 'none';
        document.getElementById('precio').value = ''; 
    }
});


/* --- Lógica de Envío y Anuncio de Éxito --- */

formPublicar.addEventListener('submit', (e) => {
    e.preventDefault(); // Evita que la página se recargue

    // Aquí iría la conexión a Firebase en el futuro
    console.log("Datos listos para enviar a la base de datos...");

    // 1. Escondemos el formulario
    modalFormulario.style.display = 'none';

    // 2. Mostramos el anuncio de éxito
    modalExito.style.display = 'flex';
});

// Botón "Entendido" del anuncio de éxito
btnEntendido.addEventListener('click', () => {
    modalExito.style.display = 'none';
    formPublicar.reset(); // Limpia los campos para la próxima vez
    contenedorPrecio.style.display = 'none'; // Asegura que el precio se oculte de nuevo
});