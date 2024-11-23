const GES = 0.63; // Define GES globalmente fuera del array de planes

const banmedicaPlans = [
	

    { 
        name: 'Mas Vidatres Plus 54/2308', 
        logo: 'images/banmedica.png',
        pdfUrl: 'planes/13-EF409-24.pdf',
        additionalInfo: '(VMASPL230854)',
        ufplan: "total-calculo",
        valorbaseplan: "5.34", // Asegúrate de que este valor sea numérico
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

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('rectangles-container');
    let totalPrecio = 0; // Inicializa el total acumulado
    let totalFactor = 1; // Asegúrate de que totalFactor tenga un valor inicial, por ejemplo, 1

    // Ejemplo de cálculo de totalFactor (debes reemplazar esto con tu lógica real)
    calculateTotalFactor(); // Llama a esta función en algún lugar antes de crear los planes

    // Función para crear un plan y agregarlo al DOM
    function createPlan(plan) {
        const valorBase = parseFloat(plan.valorbaseplan); // Obtén el valor base del plan

        // Asegúrate de que totalFactor tenga un valor válido antes de usarlo
        if (isNaN(totalFactor) || totalFactor <= 0) {
            console.error("totalFactor no está definido o es 0.");
            return; // No continuar si totalFactor no es válido
        }

        const precioFinal = valorBase * totalFactor; // Multiplica el valor base por el totalFactor

        // Actualiza el total acumulado
        totalPrecio += precioFinal;

        // Crear el contenedor principal del plan
        const planElement = document.createElement('div');
        planElement.classList.add('plan');

     

        // Agregar el plan al contenedor principal
        container.appendChild(planElement);
    }

    // Iterar sobre los planes de Banmedica y crearlos
    banmedicaPlans.forEach(createPlan);


});

// Función de ejemplo para calcular totalFactor (debes implementar tu lógica aquí)
function calculateTotalFactor() {
    // Aquí debería estar tu lógica para calcular totalFactor
    totalFactor = 1.5; // Ejemplo: asignar un valor fijo o calcularlo dinámicamente
}
