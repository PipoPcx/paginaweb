const GES_banmedica = 0.63; // Define GES globalmente fuera del array de planes

const banmedicaPlans = [
	

    { 
        name: 'Mas Vidatres Plus 54/2308', 
        logo: 'images/banmedica.png',
        pdfUrl: 'planes/13-EF409-24.pdf',
        additionalInfo: '(VMASPL230854)',
        ufplan: "total-calculo",
        valorbaseplan: "4.07", // Asegúrate de que este valor sea numérico
        clpPrice: '$ 27000',
        hospitalCoverage: [
            { clinic: '50% Clínica Santa María' },
            { clinic: '50% Vidaintegra' },
            { clinic: '50% Clínica Dávila Vespucio' },
            { clinic: '50% Clínica Dávila' },
            { clinic: '50% Centros Red UC' },
            { clinic: '50% Hospital Clínico UC' },
            { clinic: '50% Clínica Indisa' },
            { clinic: '50% Clínica San Carlos' },
            { clinic: '50% Clínica Universidad de los Andes' },
        ],
        ambulatoryCoverage: [
            { clinic: '50% Clínica Santa María' },
            { clinic: '50% Vidaintegra' },
            { clinic: '50% Clínica Dávila Vespucio' },
            { clinic: '50% Clínica Dávila' },
            { clinic: '50% Centros Red UC' },
            { clinic: '50% Hospital Clínico UC' },
            { clinic: '50% Clínica Indisa' },
            { clinic: '50% Clínica San Carlos' },
            { clinic: '50% Clínica Universidad de los Andes' },
        ],
    },
	
	    { 
        name: 'Mas Vidatres Plus 54/2308', 
        logo: 'images/banmedica.png',
        pdfUrl: 'planes/13-EF409-24.pdf',
        additionalInfo: '(VMASPL230855)',
        ufplan: "total-calculo",
        valorbaseplan: "2", // Asegúrate de que este valor sea numérico
        clpPrice: '$ 27000',
        hospitalCoverage: [
            { clinic: '50% Clínica Santa María' },
            { clinic: '50% Vidaintegra' },
            { clinic: '50% Clínica Dávila Vespucio' },
            { clinic: '50% Clínica Dávila' },
            { clinic: '50% Centros Red UC' },
            { clinic: '50% Hospital Clínico UC' },
            { clinic: '50% Clínica Indisa' },
            { clinic: '50% Clínica San Carlos' },
            { clinic: '50% Clínica Universidad de los Andes' },
        ],
        ambulatoryCoverage: [
            { clinic: '50% Clínica Santa María' },
            { clinic: '50% Vidaintegra' },
            { clinic: '50% Clínica Dávila Vespucio' },
            { clinic: '50% Clínica Dávila' },
            { clinic: '50% Centros Red UC' },
            { clinic: '50% Hospital Clínico UC' },
            { clinic: '50% Clínica Indisa' },
            { clinic: '50% Clínica San Carlos' },
            { clinic: '50% Clínica Universidad de los Andes' },
        ],
    },
	
	 { 
        name: 'Mas Vidatres Plus 54/2308', 
        logo: 'images/banmedica.png',
        pdfUrl: 'planes/13-EF409-24.pdf',
        additionalInfo: '(VMASPL230855)',
        ufplan: "total-calculo",
        valorbaseplan: "2", // Asegúrate de que este valor sea numérico
        clpPrice: '$ 27000',
        hospitalCoverage: [
            { clinic: '50% Clínica Santa María' },
            { clinic: '50% Vidaintegra' },
            { clinic: '50% Clínica Dávila Vespucio' },
            { clinic: '50% Clínica Dávila' },
            { clinic: '50% Centros Red UC' },
            { clinic: '50% Hospital Clínico UC' },
            { clinic: '50% Clínica Indisa' },
            { clinic: '50% Clínica San Carlos' },
            { clinic: '50% Clínica Universidad de los Andes' },
        ],
        ambulatoryCoverage: [
            { clinic: '50% Clínica Santa María' },
            { clinic: '50% Vidaintegra' },
            { clinic: '50% Clínica Dávila Vespucio' },
            { clinic: '50% Clínica Dávila' },
            { clinic: '50% Centros Red UC' },
            { clinic: '50% Hospital Clínico UC' },
            { clinic: '50% Clínica Indisa' },
            { clinic: '50% Clínica San Carlos' },
            { clinic: '50% Clínica Universidad de los Andes' },
        ],
    },
    // Agrega más planes aquí...
];


// Función para mostrar los planes de Banmedica
function renderBanmedicaPlans() {
    const container = document.getElementById('rectangles-container'); // Contenedor de los planes en el HTML
    banmedicaPlans.forEach(plan => {
        const planElement = document.createElement('div');
        planElement.classList.add('plan');
        planElement.setAttribute('data-isapre', plan.dataIsapre);
        planElement.innerHTML = `
            <h4>${plan.name}</h4>
            <p>${plan.description}</p>
        `;
        container.appendChild(planElement);
    });
}

// Llamamos a la función cuando cargue la página para renderizar los planes de Banmedica
document.addEventListener('DOMContentLoaded', () => {
    renderBanmedicaPlans();
});