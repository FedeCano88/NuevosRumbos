document.addEventListener('DOMContentLoaded', function() {
    const barrios = [
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

    const barriosCABA = [
        "Belgrano", "Núñez", "Liniers", "Palermo", "Recoleta", "Villa Urquiza", "Almagro", "Caballito", 
        "San Telmo", "Flores", "Boedo", "Retiro", "Monserrat", "Barracas", "Constitución", "Chacarita", 
        "Villa Devoto", "Villa del Parque", "Villa Lugano", "Parque Patricios", "Puerto Madero"
    ];

    const barrioSelect = document.getElementById('barrio');
    const barrioCABASelect = document.getElementById('barrioCABA');
    const barrioCABAContainer = document.getElementById('barrioCABAContainer'); // Contenedor del select

    barrios.forEach(function(barrio) {
        const option = document.createElement('option');
        option.value = barrio;
        option.textContent = barrio;
        barrioSelect.appendChild(option);
    });

    barriosCABA.forEach(function(barrio) {
        const option = document.createElement('option');
        option.value = barrio;
        option.textContent = barrio;
        barrioCABASelect.appendChild(option);
    });

    barrioSelect.addEventListener('change', function() {
        if (barrioSelect.value === "Ciudad de Buenos Aires") {
            barrioCABAContainer.style.display = 'block';  // Mostrar select de barrios de CABA
        } else {
            barrioCABAContainer.style.display = 'none';  // Ocultar select de barrios de CABA
            barrioCABASelect.selectedIndex = 0; // Reiniciar selección de barrios CABA
        }
    });

    // Mostrar/ocultar el campo de obra social según la selección del usuario
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
});



