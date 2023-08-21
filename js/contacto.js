document.addEventListener('DOMContentLoaded', function () {
    var form = document.querySelector('form');
    form.addEventListener('submit', function (event) {
        event.preventDefault(); //para que el form no se envíe automáticamente

        // valores de los campos
        var nombre = document.querySelector('input[name="name"]').value;
        var email = document.querySelector('input[name="email"]').value;
        var mensaje = document.querySelector('textarea[name="message"]').value;

        //validación de nombre no exceda los 10 caracteres
        if (nombre.length > 10) {
            alert('El campo de nombre no puede exceder los 10 caracteres');
            return;
        }

        //validar que el email contenga un @
        if (!email.includes('@')) {
            alert('El campo de email debe contener un "@"');
            return;
        }

        //validar que el mensaje tenga hasta 250 caracteres
        if (mensaje.length > 250) {
            alert('El mensaje no puede tener más de 250 caracteres');
            return;
        }

        // Mostrar alertas para confirmar datos
        alert('Nombre: ' + nombre);
        alert('Email: ' + email);
        alert('Mensaje: ' + mensaje);

        // Restablecer los campos del formulario
        form.reset();

        // Mostrar alerta de datos enviados
        alert('Datos Enviados');
    });
});
