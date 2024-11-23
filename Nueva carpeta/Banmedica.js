const banmedicaPlans = [
    { 
        name: 'Mas Vidatres Plus 54/2308', 
        logo: 'images/banmedica.png',
        pdfUrl: 'planes/13-EF409-24.pdf',
        additionalInfo: '(VMASPL230854)',
        ufplan: "total-calculo",
        valorbaseplan: "1.18", // Asegúrate de que este valor sea numérico
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
        additionalInfo: '(VMASPL230854)',
        ufplan: "total-calculo",
        valorbaseplan: "1.18", // Asegúrate de que este valor sea numérico
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
    const container = document.getElementById('plans-container');
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

        // Estructura HTML del plan
        planElement.innerHTML = `
            <div class="plan-header">
                <img src="${plan.logo}" alt="${plan.name}" class="plan-logo">
                <div class="plan-info">
                    <p><strong>${plan.name}</strong></p>
                    <p>Código: ${plan.additionalInfo}</p>
                </div>
            </div>
            <div class="gray-rectangle">
                <div class="gray-content">
                    <div class="hospital-info">
                        <p class="hospital-label">Hospitalario:</p>
                        <ul class="hospital-coverage">
                            ${plan.hospitalCoverage.map(item => `<li>${item.clinic}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="ambulatory-info">
                        <p class="ambulatory-label">Ambulatorio:</p>
                        <ul class="ambulatory-coverage">
                            ${plan.ambulatoryCoverage.map(item => `<li>${item.clinic}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
            <div class="plan-footer">
                <div class="plan-price">
                    <p>Valor base: ${valorBase} UF</p> <!-- Muestra el valor base -->
                    <p>Precio total (factor etáreo aplicado): ${precioFinal.toFixed(2)} CLP</p> <!-- Muestra el precio final del plan -->
                    <p>${plan.clpPrice}</p>
                </div>
                <a href="${plan.pdfUrl}" class="plan-download-btn">Descargar Plan</a>
            </div>
        `;

        // Agregar el plan al contenedor principal
        container.appendChild(planElement);
    }

    // Iterar sobre los planes de Banmedica y crearlos
    banmedicaPlans.forEach(createPlan);

    // Muestra el precio total acumulado en el elemento correspondiente
    document.getElementById('precio-total').textContent = `Precio total: ${totalPrecio.toFixed(2)} CLP`;
});

// Función de ejemplo para calcular totalFactor (debes implementar tu lógica aquí)
function calculateTotalFactor() {
    // Aquí debería estar tu lógica para calcular totalFactor
    totalFactor = 1.5; // Ejemplo: asignar un valor fijo o calcularlo dinámicamente
}
