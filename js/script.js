document.addEventListener('DOMContentLoaded', function() {
    const localidades = [
        "Ciudad de Buenos Aires",
        "Acassuso", "Aldo Bonzi", "Avellaneda", "Ballester", "Banfield", "Beccar", "Belén de Escobar", 
        "Benavídez", "Bernal", "Billinghurst", "Bosques", "Boulogne", "Canning", "Carupá", "Caseros", 
        "Castelar", "Ciudad Evita", "Ciudadela", "Del Viso", "Dock Sud", "Don Bosco", "Don Torcuato", 
        "El Jagüel", "El Libertador", "El Palomar", "Escalada", "Ezpeleta", "Fátima", "Florida", 
        "Florencio Varela", "Garín", "Gerli", "Gobernador Costa", "González Catán", "Grand Bourg", 
        "Haedo", "Hudson", "Hurlingham Centro", "Ingeniero Adolfo Sourdeaux", "Ingeniero Allan", 
        "Ingeniero Maschwitz", "Ingeniero Pablo Nogués", "Isidro Casanova", "Ituzaingó Norte", 
        "Ituzaingó Sur", "José C. Paz Centro", "José León Suárez", "La Lucila", "La Matanza", 
        "La Tablada", "Lanús Este", "Lanús Oeste", "Llavallol", "Loma Hermosa", "Lomas de Zamora", 
        "Los Polvorines", "Luján", "Malvinas Argentinas", "Manuel Alberti", "Martínez", "Matheu", 
        "Maquinista Savio", "Merlo Centro", "Monte Grande", "Morón", "Munro", "Olivos", 
        "Parque San Martín", "Piñeiro", "Plátanos", "Quilmes Oeste", "Quilmes", "Ramos Mejía", 
        "Ranelagh", "Recoleta", "Remedios de Escalada", "Rincón de Milberg", "San Andrés", 
        "San Antonio de Padua", "San Fernando", "San Isidro", "San Justo", "San Martín", "San Miguel", 
        "San Vicente", "Sarandí", "Santos Lugares", "Sourigues", "Tapiales", "Temperley", 
        "Tigre Centro", "Tortuguitas", "Tristán Suárez", "Tres de Febrero", "Troncos del Talar", 
        "Turdera", "Vicente López", "Victoria", "Villa Adelina", "Villa Ballester", "Villa Bosch", 
        "Villa Brown", "Villa Dominico", "Villa España", "Villa La Florida", "Villa Luzuriaga", 
        "Villa Lynch", "Villa Madero", "Villa Martelli", "Villa Raffo", "Villa Sarmiento", 
        "Villa Tesei", "Villa Udaondo", "Virreyes", "Wilde", "William Morris"
    ];

    const localidadesCABA = [
        "Belgrano", "Núñez", "Liniers", "Palermo", "Recoleta", "Villa Urquiza", "Almagro", "Caballito", 
        "San Telmo", "Flores", "Boedo", "Retiro", "Monserrat", "Barracas", "Constitución", "Chacarita", 
        "Villa Devoto", "Villa del Parque", "Villa Lugano", "Parque Patricios", "Puerto Madero"
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




