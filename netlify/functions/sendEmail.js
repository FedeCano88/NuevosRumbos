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

    // Capturar todos los datos del formulario
    const { nombreApellido, email, telefono, mensaje, localidad, barrioCABA, localidadServicio, barrioCABAServicio, obraSocial, obraSocialNombre } = JSON.parse(event.body);
    console.log("Parsed request body:", { nombreApellido, email, telefono, mensaje, localidad, barrioCABA, localidadServicio, barrioCABAServicio, obraSocial, obraSocialNombre });

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

    // Construir el cuerpo del correo dinámicamente basado en la información proporcionada
    let emailBody = `
        Nombre y Apellido: ${nombreApellido}
        Email: ${email}
        Teléfono: ${telefono}
        Localidad: ${localidad}
        Localidad del Servicio: ${localidadServicio}
        Mensaje: ${mensaje}
    `;

    // Solo incluir los barrios de CABA si la localidad es "Ciudad de Buenos Aires"
    if (localidad === "Ciudad de Buenos Aires") {
        emailBody += `Barrio (CABA): ${barrioCABA}\n`;
    }

    if (localidadServicio === "Ciudad de Buenos Aires") {
        emailBody += `Barrio del Servicio (CABA): ${barrioCABAServicio}\n`;
    }

    // Solo incluir la información de obra social si se seleccionó "Sí"
    if (obraSocial === "Sí") {
        emailBody += `Obra Social: Sí\nNombre de la Obra Social: ${obraSocialNombre || 'No especificado'}\n`;
    } else {
        emailBody += `Obra Social: No\n`;
    }

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'fedecano1988@hotmail.com', // Reemplaza con tu dirección de correo de destino
        subject: 'Nuevo mensaje desde el formulario',
        text: emailBody
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



