// Crear un array para almacenar todos los planes
const plansData = [
    // Planes de Banmédica
    { nombre: "Banmedica Plan 1", valor_base: 35000, ges: "1500", pdf: "planes/13-EF409-24.pdf", cobertura_hospitalaria: "70% Clínica Santa María", cobertura_ambulatoria: "50% Consultorios Asociados" },
    { nombre: "Banmedica Plan 2", valor_base: 42000, ges: "1500", pdf: "planes/banmedica_plan2.pdf", cobertura_hospitalaria: "80% Clínica Alemana", cobertura_ambulatoria: "60% Consultorios Particulares" },
    // ... (Continúa agregando hasta completar 153 planes para Banmédica)

    // Planes de Consalud
    { nombre: "Consalud Plan 1", valor_base: 29000, ges: "1000", pdf: "planes/13-LF809-24.pdf", cobertura_hospitalaria: "60% Hospital Clínico", cobertura_ambulatoria: "40% Centros de Salud" },
    { nombre: "Consalud Plan 2", valor_base: 37000, ges: "1000", pdf: "planes/consalud_plan2.pdf", cobertura_hospitalaria: "70% Clínica Dávila", cobertura_ambulatoria: "50% Centros Médicos Asociados" },
    // ... (Continúa agregando hasta completar 203 planes para Consalud)

    // Planes de Colmena
    { nombre: "Colmena Plan 1", valor_base: 32000, ges: "1800", pdf: "planes/BFDC230803.pdf", cobertura_hospitalaria: "75% Clínica Alemana", cobertura_ambulatoria: "65% Consultorios" },
    { nombre: "Colmena Plan 2", valor_base: 41000, ges: "1800", pdf: "planes/colmena_plan2.pdf", cobertura_hospitalaria: "80% Clínica Santa María", cobertura_ambulatoria: "60% Consultorios Particulares" },
    // ... (Continúa agregando hasta completar 220 planes para Colmena)

    // Planes de Vidatres
    { nombre: "Vidatres Plan 1", valor_base: 30000, ges: "2000", pdf: "planes/456.pdf", cobertura_hospitalaria: "65% Clínica Bicentenario", cobertura_ambulatoria: "45% Consultorios Públicos" },
    { nombre: "Vidatres Plan 2", valor_base: 39000, ges: "2000", pdf: "planes/vidatres_plan2.pdf", cobertura_hospitalaria: "70% Hospital Militar", cobertura_ambulatoria: "50% Consultorios Asociados" },
    // ... (Continúa agregando hasta completar 111 planes para Vidatres)

    // Planes de Nueva Masvida
    { nombre: "Nueva Masvida Plan 1", valor_base: 36000, ges: "1700", pdf: "planes/789.pdf", cobertura_hospitalaria: "75% Clínica Universitaria", cobertura_ambulatoria: "55% Centros Médicos" },
    { nombre: "Nueva Masvida Plan 2", valor_base: 45000, ges: "1700", pdf: "planes/nueva_masvida_plan2.pdf", cobertura_hospitalaria: "80% Hospital UC", cobertura_ambulatoria: "60% Centros Privados" },
    // ... (Continúa agregando hasta completar 235 planes para Nueva Masvida)

    // Planes de Esencial
    { nombre: "Esencial Plan 1", valor_base: 28000, ges: "1200", pdf: "planes/VPLU230856.pdf", cobertura_hospitalaria: "55% Hospital Regional", cobertura_ambulatoria: "35% Consultorios" },
    { nombre: "Esencial Plan 2", valor_base: 36000, ges: "1200", pdf: "planes/esencial_plan2.pdf", cobertura_hospitalaria: "60% Hospital Clínico", cobertura_ambulatoria: "40% Centros Públicos" },
    // ... (Continúa agregando hasta completar 42 planes para Esencial)
];

// Ordenar los planes por valor_base de menor a mayor
plansData.sort((a, b) => a.valor_base - b.valor_base);

// Obtener el contenedor de planes
const plansContainer = document.getElementById('plans-container');

// Función para cargar los planes en el contenedor
const loadPlans = () => {
    plansData.forEach(plan => {
        const planDiv = document.createElement('div');
        planDiv.className = 'plan';

        // Determinar el logo según la isapre
        let logoSrc = '';
        if (plan.nombre.toLowerCase().includes("banmedica")) {
            logoSrc = 'images/Banmedica.png';
        } else if (plan.nombre.toLowerCase().includes("consalud")) {
            logoSrc = 'images/Consalud.png';
        } else if (plan.nombre.toLowerCase().includes("colmena")) {
            logoSrc = 'images/Colmena.png';
        } else if (plan.nombre.toLowerCase().includes("vidatres")) {
            logoSrc = 'images/Vidatres.png';
        } else if (plan.nombre.toLowerCase().includes("nueva masvida")) {
            logoSrc = 'images/Mas_Vida.png';
        } else if (plan.nombre.toLowerCase().includes("esencial")) {
            logoSrc = 'images/Esencial.png';
        }

        // Estructura HTML con el logo encima
        planDiv.innerHTML = `
            <img src="${logoSrc}" alt="${plan.nombre} Logo" class="plan-logo"> <!-- Logo de la isapre -->
            <div class="plan-info">
                <div class="plan-left">
                    <h3>${plan.nombre}</h3>
                    <p>Código del Plan: ${plan.pdf}</p>
                </div>
                <div class="plan-center">
                    <p>Hospitalaria: ${plan.cobertura_hospitalaria}</p>
                    <p>Ambulatoria: ${plan.cobertura_ambulatoria}</p>
                </div>
                <div class="plan-right">
                    <p>Valor Base: $${plan.valor_base}</p>
                    <p>GES: $${plan.ges}</p>
                    <a href="${plan.pdf}" target="_blank" class="download-button">Descargar Plan</a>
                </div>
            </div>
        `;
        plansContainer.appendChild(planDiv); // Agregar el div al contenedor
    });
};

// Cargar los planes en el contenedor
loadPlans();
