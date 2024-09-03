const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
    };

    console.log("Request received:", event);

    if (event.httpMethod !== 'POST') {
        console.log("Invalid HTTP method:", event.httpMethod);
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ message: 'Only POST requests allowed' })
        };
    }

    // Capturar todos los datos del formulario, incluyendo obra social
    const { nombreApellido, email, telefono, mensaje, localidad, barrioCABA, localidadServicio, barrioCABAServicio, obraSocial } = JSON.parse(event.body);
    console.log("Parsed request body:", { nombreApellido, email, telefono, mensaje, localidad, barrioCABA, localidadServicio, barrioCABAServicio, obraSocial });

    let transporter = nodemailer.createTransport({
        host: 'smtp-mail.outlook.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        tls: {
            ciphers: 'SSLv3'
        }
    });

    // Incluir todos los campos, incluyendo obra social, en el cuerpo del correo
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'fedecano1988@hotmail.com', // Reemplaza con tu dirección de correo de destino
        subject: 'Nuevo mensaje desde el formulario',
        text: `
            Nombre y Apellido: ${nombreApellido}
            Email: ${email}
            Teléfono: ${telefono}
            Localidad: ${localidad}
            Barrio (CABA): ${barrioCABA}
            Localidad del Servicio: ${localidadServicio}
            Barrio del Servicio (CABA): ${barrioCABAServicio}
            Obra Social: ${obraSocial}
            Mensaje: ${mensaje}
        `
    };

    try {
        console.log("Attempting to send email...");
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully.");
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ message: 'Correo enviado con éxito.' })
        };
    } catch (error) {
        console.error("Error sending email:", error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ message: 'Error al enviar el correo.', error: error.toString() })
        };
    }
};


