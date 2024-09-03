<?php
// Verificar si el formulario ha sido enviado
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recibir y sanitizar los datos del formulario
    $nombreApellido = htmlspecialchars(trim($_POST['nombreApellido']));
    $telefono = htmlspecialchars(trim($_POST['telefono']));
    $barrio = htmlspecialchars(trim($_POST['barrio']));
    $obraSocial = htmlspecialchars(trim($_POST['obraSocial']));
    $obraSocialNombre = htmlspecialchars(trim($_POST['obraSocialNombre']));
    $mensaje = htmlspecialchars(trim($_POST['mensaje']));

    // Validar que los campos requeridos no estén vacíos
    if (empty($nombreApellido) || empty($telefono) || empty($barrio) || empty($mensaje)) {
        echo "Por favor, complete todos los campos requeridos.";
        exit;
    }

    // Dirección de correo electrónico a la que se enviará el formulario
    $destinatario = "fedecano1988@hotmail.com";  // Reemplaza con tu dirección de correo electrónico
    $asunto = "Nuevo mensaje de contacto de Nuevos Rumbos";

    // Construir el cuerpo del correo electrónico
    $cuerpo = "Nombre y Apellido: $nombreApellido\n";
    $cuerpo .= "Teléfono: $telefono\n";
    $cuerpo .= "Barrio: $barrio\n";
    $cuerpo .= "¿Es por obra social?: $obraSocial\n";
    if ($obraSocial === "si" && !empty($obraSocialNombre)) {
        $cuerpo .= "Obra Social: $obraSocialNombre\n";
    }
    $cuerpo .= "Mensaje: $mensaje\n";

    // Encabezados adicionales
    $headers = "From: noreply@tu-dominio.com\r\n";  // Reemplaza con tu dominio
    $headers .= "Reply-To: $nombreApellido <$destinatario>\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // Intentar enviar el correo electrónico
    if (mail($destinatario, $asunto, $cuerpo, $headers)) {
        echo "Gracias por contactarnos. Hemos recibido su mensaje.";
    } else {
        echo "Lo siento, hubo un problema al enviar su mensaje. Por favor, inténtelo de nuevo más tarde.";
    }
}
?>
