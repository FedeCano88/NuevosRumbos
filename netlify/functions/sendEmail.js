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
        service: 'Hotmail', // Cambia por tu servicio de correo, por ejemplo, Gmail
        auth: {
            user: process.env.EMAIL_USER, // Usa variables de entorno para mayor seguridad
            pass: process.env.EMAIL_PASS  // Usa variables de entorno para mayor seguridad
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'fedecano1988@hotmail.com', // Reemplaza con tu dirección de correo
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