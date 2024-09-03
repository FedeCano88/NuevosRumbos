document.addEventListener('DOMContentLoaded', function() {
    const localidades = [
        // Lista de localidades...
    ];

    const localidadesCABA = [
        // Lista de barrios de CABA...
    ];

    const localidadSelect = document.getElementById('localidad');
    const localidadServicioSelect = document.getElementById('localidadServicio');
    const barrioCABASelect = document.getElementById('barrioCABA');
    const barrioCABAServicioSelect = document.getElementById('barrioCABAServicio');
    const barrioCABAContainerLocalidad = document.getElementById('barrioCABAContainerLocalidad');
    const barrioCABAContainerServicio = document.getElementById('barrioCABAContainerServicio');

    // Llenar select con localidades...
    localidades.forEach(function(localidad) {
        const option = document.createElement('option');
        option.value = localidad;
        option.textContent = localidad;
        localidadSelect.appendChild(option);
        localidadServicioSelect.appendChild(option.cloneNode(true));
    });

    localidadesCABA.forEach(function(barrio) {
        const option = document.createElement('option');
        option.value = barrio;
        option.textContent = barrio;
        barrioCABASelect.appendChild(option);
        barrioCABAServicioSelect.appendChild(option.cloneNode(true));
    });

    // Mostrar u ocultar select de barrios de CABA...
    localidadSelect.addEventListener('change', function() {
        if (localidadSelect.value === "Ciudad de Buenos Aires") {
            barrioCABAContainerLocalidad.style.display = 'block';
        } else {
            barrioCABAContainerLocalidad.style.display = 'none';
            barrioCABASelect.selectedIndex = 0;
        }
    });

    localidadServicioSelect.addEventListener('change', function() {
        if (localidadServicioSelect.value === "Ciudad de Buenos Aires") {
            barrioCABAContainerServicio.style.display = 'block';
        } else {
            barrioCABAContainerServicio.style.display = 'none';
            barrioCABAServicioSelect.selectedIndex = 0;
        }
    });

    // Mostrar/ocultar campo de obra social según selección...
    const obraSocialSi = document.getElementById('obraSocialSi');
    const obraSocialNo = document.getElementById('obraSocialNo');
    const obraSocialNombreContainer = document.getElementById('obraSocialNombreContainer');

    obraSocialSi.addEventListener('change', function() {
        if (obraSocialSi.checked) {
            obraSocialNombreContainer.style.display = 'block';
        }
    });

    obraSocialNo.addEventListener('change', function() {
        if (obraSocialNo.checked) {
            obraSocialNombreContainer.style.display = 'none';
        }
    });

    // Elimina el evento de clic en el botón de envío para evitar conflictos
    /*
    const submitButton = document.querySelector('button[type="submit"]');
    submitButton.addEventListener('click', function(event) {
        event.preventDefault();  // Previene el envío del formulario

        // Mostrar alerta de SweetAlert2
        Swal.fire({
            icon: 'success',
            title: 'Mensaje enviado',
            text: 'Tu mensaje ha sido enviado con éxito.',
            confirmButtonText: 'Aceptar'
        });
    });
    */

    // Manejo del envío del formulario
    document.getElementById('contactForm').addEventListener('submit', async function(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);

        try {
            const response = await fetch('/.netlify/functions/sendEmail', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' }
            });

            const result = await response.json();
            Swal.fire({
                icon: response.ok ? 'success' : 'error',
                title: response.ok ? 'Mensaje enviado' : 'Error',
                text: result.message,
                confirmButtonText: 'Aceptar'
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo enviar el mensaje. Por favor, inténtalo de nuevo más tarde.',
                confirmButtonText: 'Aceptar'
            });
        }
    });
});





