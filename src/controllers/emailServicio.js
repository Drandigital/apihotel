const nodemailer = require('nodemailer');

const remitente = nodemailer.createTransport({
    service: 'Gmail', 
    auth: {
        user: 'correopruebanathan@gmail.com', 
        pass: '123456789Nat*'  
    }
});

exports.enviarNotificacionReservacion = (correoDestinatario, detallesReservacion) => {
    const opcionesCorreo = {
        from: 'correopruebanathan@gmail.com',
        to: correoDestinatario,
        subject: 'Confirmación de Reservación',
        text: `Hola ${detallesReservacion.detallesHuésped.nombre}, 
               Tu reservación ha sido confirmada. 
               Detalles: ${JSON.stringify(detallesReservacion)}`
    };

    remitente.sendMail(opcionesCorreo, (error, info) => {
        if (error) {
            console.error('Error enviando correo:', error);
        } else {
            console.log('Correo enviado:', info.response);
        }
    });
};
