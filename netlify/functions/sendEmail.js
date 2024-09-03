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

    // Crear el cuerpo del correo en formato HTML
    let emailBody = `
        <p><strong>Nombre y Apellido:</strong> ${nombreApellido}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${telefono}</p>
        <p><strong>Localidad:</strong> ${localidad}</p>
        <p><strong>Localidad del Servicio:</strong> ${localidadServicio}</p>
    `;

    // Solo incluir los barrios de CABA si la localidad es "Ciudad de Buenos Aires"
    if (localidad === "Ciudad de Buenos Aires") {
        emailBody += `<p><strong>Barrio (CABA):</strong> ${barrioCABA}</p>`;
    }

    if (localidadServicio === "Ciudad de Buenos Aires") {
        emailBody += `<p><strong>Barrio del Servicio (CABA):</strong> ${barrioCABAServicio}</p>`;
    }

    // Solo incluir la información de obra social si se seleccionó "Sí"
    if (obraSocial === "Sí") {
        emailBody += `<p><strong>Obra Social:</strong> Sí</p>`;
        emailBody += `<p><strong>Nombre de la Obra Social:</strong> ${obraSocialNombre || 'No especificado'}</p>`;
    } else {
        emailBody += `<p><strong>Obra Social:</strong> No</p>`;
    }

    // Añadir el mensaje al final
    emailBody += `<p><strong>Mensaje:</strong> ${mensaje}</p>`;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'fedecano1988@hotmail.com', // Reemplaza con tu dirección de correo de destino
        subject: 'Nuevo mensaje desde el formulario',
        html: emailBody // Usar el formato HTML
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




