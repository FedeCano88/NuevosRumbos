const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
    };

    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ message: 'Only POST requests allowed' })
        };
    }

    const { nombreApellido, email, telefono, mensaje } = JSON.parse(event.body);

    let transporter = nodemailer.createTransport({
        host: 'smtp-mail.outlook.com',
        port: 587,
        secure: false, // true para 465, false para otros puertos
        auth: {
            user: process.env.EMAIL_USER, // tu cuenta de Hotmail
            pass: process.env.EMAIL_PASS  // la nueva contraseña de aplicación
        },
        tls: {
            ciphers: 'SSLv3' // Asegura el uso de un protocolo seguro
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'fedecano1988@hotmail.com', // Reemplaza con tu dirección de correo de destino
        subject: 'Nuevo mensaje desde el formulario',
        text: `Nombre y Apellido: ${nombreApellido}\nEmail: ${email}\nTeléfono: ${telefono}\nMensaje: ${mensaje}`
    };

    try {
        await transporter.sendMail(mailOptions);
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ message: 'Correo enviado con éxito.' })
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ message: 'Error al enviar el correo.', error: error.toString() })
        };
    }
};
