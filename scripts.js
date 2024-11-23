
document.addEventListener('DOMContentLoaded', () => {
    // Llama a la función para cada plan de Isapre
    createRectangles(banmedicaPlans, 'banmedica');
    createRectangles(colmenaPlans, 'colmena');
    createRectangles(consaludPlans, 'consalud');
    createRectangles(vidatresPlans, 'vidatres');
    createRectangles(esencialPlans, 'esencial');
    createRectangles(masvidaPlans, 'masvida');
});

let totalFactor = 1; // Inicializamos con un valor por defecto de 1 (o el valor que desees)
let valorUF = 37981.22; // Variable para almacenar el valor de la UF
let currentPage = 1; // Página actual
const plansPerPage = 10; // Número de planes por página

// Función para obtener el factor etáreo según la edad y tipo
function getFactorByAge(age, type) {
    const ageRanges = {
        '0- 1': { cotizante: 0, carga: 0 },
        '2-19': { cotizante: 0.6, carga: 0.6 },
        '20-24': { cotizante: 0.9, carga: 0.7 },
        '25-34': { cotizante: 1.0, carga: 0.7 },
        '35-44': { cotizante: 1.3, carga: 0.9 },
        '45-54': { cotizante: 1.4, carga: 1.0 },
        '55-64': { cotizante: 2.0, carga: 1.4 },
        '65+': { cotizante: 2.4, carga: 2.2 }
    };

    for (const range in ageRanges) {
        const [min, max] = range.split('-').map(Number);
        if ((age >= min && age <= max) || (range === '65+' && age >= 65)) {
            return ageRanges[range][type];
        }
    }
    return 0;
}

// Función para calcular el total de factores de beneficiarios
function calculateTotalFactor() {
    const beneficiaries = document.querySelectorAll('.beneficiario-item');
    totalFactor = 0; // Reinicia el total factor

    if (beneficiaries.length === 0) {
        totalFactor = 1; // Valor por defecto si no hay beneficiarios
    } else {
        beneficiaries.forEach(item => {
            const age = parseInt(item.getAttribute('data-age'), 10);
            const type = item.classList.contains('carga') ? 'carga' : 'cotizante';
            totalFactor += getFactorByAge(age, type);
        });
    }

    document.getElementById('total-uf-value').textContent = totalFactor.toFixed(2);
    displayUpdatedPlans();
}

// Función para mostrar los planes actualizados en la interfaz
function displayUpdatedPlans() {
    const container = document.getElementById('rectangles-container');
    container.innerHTML = '';

    const isaprePlans = [
        { plans: banmedicaPlans, ges: GES_banmedica },
        { plans: colmenaPlans, ges: GES_colmena },
        { plans: consaludPlans, ges: GES_consalud },
        { plans: vidatresPlans, ges: GES_vidatres },
        { plans: esencialPlans, ges: GES_esencial },
        { plans: masvidaPlans, ges: GES_masvida }
    ];

    isaprePlans.forEach(({ plans, ges }) => {
        plans.forEach(plan => {
            const valorBase = parseFloat(plan.valorbaseplan);
            const numBeneficiarios = document.querySelectorAll('.beneficiario-item').length;
            const gesTotal = ges * numBeneficiarios;
            const precioTotal = valorBase * totalFactor + gesTotal;

            const planElement = document.createElement('div');
            planElement.classList.add('plan');
			
			planElement.setAttribute("data-isapre", plan.isapre);

            planElement.innerHTML = `
                <div class="rectangle">
                    <div class="plan-header">
                        <img src="${plan.logo}" alt="${plan.name}" class="logo">
                        <div class="info">
                            <p class="plan-name"><strong>${plan.name}</strong></p>
                            <p class="additional-info">${plan.additionalInfo}</p>
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
                            <p>${precioTotal.toFixed(3)} UF</p>
                            <p>${(precioTotal * valorUF).toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</p>
                        </div>
                        <a href="${plan.pdfUrl}" class="download-button">Descargar Plan</a>
                    </div>
                </div>
            `;
            container.appendChild(planElement);
        });
    });
}

// Mostrar los planes al cargar la página
document.addEventListener('DOMContentLoaded', function () {
    displayUpdatedPlans();
});

// Agregar beneficiarios
document.getElementById('agregar-beneficiario').addEventListener('click', function () {
    const edad = document.getElementById('edad').value;
    const esCotizante = document.getElementById('cotizante-toggle').checked;
    const tipo = esCotizante ? 'Carga' : 'Cotizante';
    const claseTipo = esCotizante ? 'carga' : 'cotizante';

    if (edad) {
        const listaBeneficiarios = document.getElementById('beneficiarios-list');
        const nuevoBeneficiario = document.createElement('li');
        nuevoBeneficiario.classList.add('beneficiario-item', claseTipo);
        nuevoBeneficiario.setAttribute('data-age', edad);
        nuevoBeneficiario.innerHTML = `Edad: ${edad} - Tipo: ${tipo} <button class="delete-button">X</button>`;
        listaBeneficiarios.appendChild(nuevoBeneficiario);

        nuevoBeneficiario.querySelector('.delete-button').addEventListener('click', function () {
            listaBeneficiarios.removeChild(nuevoBeneficiario);
            calculateTotalFactor();
        });

        document.getElementById('edad').value = '';
        document.getElementById('cotizante-toggle').checked = false;
        calculateTotalFactor();
    } else {
        alert('Por favor, ingresa una edad válida.');
    }
});

// Mostrar el texto de ayuda al pasar el puntero
document.getElementById('help-icon').addEventListener('mouseover', function () {
    document.getElementById('help-text').style.display = 'block';
});

document.getElementById('help-icon').addEventListener('mouseout', function () {
    document.getElementById('help-text').style.display = 'none';
});

// Actualizar posición del left rectangle
function actualizarPosicionLeftRectangle() {
    const leftRectangle = document.querySelector('.left-rectangle');
    const newRectangle = document.querySelector('.new-rectangle');
    const newRectangleHeight = newRectangle.getBoundingClientRect().height;
    leftRectangle.style.top = `${newRectangleHeight + 20}px`;
}

const observer = new MutationObserver(actualizarPosicionLeftRectangle);
observer.observe(document.querySelector('.new-rectangle'), {
    childList: true,
    subtree: true,
    characterData: true
});

actualizarPosicionLeftRectangle();



function filterPlans() {
    // Obtener el valor de la búsqueda
    let query = document.getElementById("searchInput").value.toLowerCase(); // Convierte el texto a minúsculas para hacer una búsqueda insensible al caso

    // Obtener todos los elementos de los planes (suponiendo que son elementos <div>, <li> o cualquier otro)
    let plans = document.querySelectorAll(".plan");  // Asumiendo que cada plan tiene la clase .plan

    // Recorrer cada plan y verificar si contiene el texto buscado
    plans.forEach(function(plan) {
        // Obtener el texto del plan (puedes ajustar esto dependiendo de la estructura del HTML)
        let planText = plan.textContent.toLowerCase();  // o plan.innerText

        // Compara el texto con la búsqueda
        if (planText.includes(query)) {
            plan.style.display = "";  // Muestra el plan si coincide
        } else {
            plan.style.display = "none";  // Oculta el plan si no coincide
        }
    });

    // Opcional: Mostrar mensaje si no se encuentran resultados
    let noResultsMessage = document.querySelector(".no-results-message");
    let visiblePlans = Array.from(plans).filter(plan => plan.style.display !== "none");

    if (visiblePlans.length === 0) {
        noResultsMessage.style.display = "block";
    } else {
        noResultsMessage.style.display = "none";
    }
}

function filterByIsapre() {
    // Obtener todas las isapres seleccionadas
    const selectedIsapres = Array.from(document.querySelectorAll('.isapre-checkbox:checked'))
        .map(checkbox => checkbox.value); // Obtener los valores de las isapres seleccionadas

    const allPlans = document.querySelectorAll('.plan'); // Seleccionar todos los planes

    // Si no hay isapres seleccionadas, mostramos todos los planes
    if (selectedIsapres.length === 0) {
        allPlans.forEach(plan => plan.style.display = 'block');
        return;
    }

    // Filtrar los planes según la selección de isapres
    allPlans.forEach(plan => {
        // Obtener el valor de la isapre asociada a cada plan
        const planIsapre = plan.getAttribute('data-isapre'); // Asegúrate de que cada plan tenga este atributo

        // Verificar si la isapre del plan está en la lista de seleccionadas
        if (selectedIsapres.includes(planIsapre)) {
            plan.style.display = 'block'; // Mostrar el plan si está en la lista seleccionada
        } else {
            plan.style.display = 'none'; // Ocultar el plan si no está en la lista seleccionada
        }
    });
}