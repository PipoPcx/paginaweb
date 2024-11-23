// Configuración de las partículas
particlesJS('particles-js', {
    "particles": {
        "number": {
            "value": 80,
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": "#FFFFFF"
        },
        "shape": {
            "type": "circle"
        },
        "opacity": {
            "value": 0.5
        },
        "size": {
            "value": 3,
            "random": true
        },
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#FFFFFF",
            "opacity": 0.4,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 3,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
            }
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": true,
                "mode": "repulse"
            },
            "onclick": {
                "enable": true,
                "mode": "push"
            },
            "resize": true
        },
        "modes": {
            "grab": {
                "distance": 400,
                "line_linked": {
                    "opacity": 1
                }
            },
            "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
            },
            "repulse": {
                "distance": 200,
                "duration": 0.4
            },
            "push": {
                "particles_nb": 4
            },
            "remove": {
                "particles_nb": 2
            }
        }
    },
    "retina_detect": true
});

 // Esperar a que el documento esté completamente cargado
        document.addEventListener('DOMContentLoaded', () => {
            // Función para crear los rectángulos con información
            function createRectangles(plans, planType) {
                const rectContainer = document.getElementById('rectangles-container');

                plans.forEach(plan => {
                    const rectangle = document.createElement('div');
                    rectangle.classList.add('rectangle', planType); // Añadir clase de tipo de plan (e.g., 'banmedica')

                    // Crear y añadir el logo a la izquierda
                    const logo = document.createElement('img');
                    logo.src = plan.logo;
                    logo.alt = `Logo ${plan.name}`;
                    logo.classList.add('logo');
                    rectangle.appendChild(logo); // Añadir logo al rectángulo

                    // Crear el contenedor de información
                    const infoContainer = document.createElement('div');
                    infoContainer.classList.add('info-container');

                    const planName = document.createElement('div');
                    planName.classList.add('plan-name');
                    planName.innerHTML = `<strong>${plan.name}</strong>`;

                    const additionalText = document.createElement('div');
                    additionalText.classList.add('additional-info');
                    additionalText.innerHTML = `<span>${plan.additionalInfo}</span>`;

                    const ufText = document.createElement('div');
                    ufText.classList.add('uf-info');
                    ufText.innerHTML = `<span>${plan.uf}</span>`;

                    const priceTextCLP = document.createElement('div');
                    priceTextCLP.classList.add('price-info-clp');
                    priceTextCLP.innerHTML = `<span>${plan.clpPrice}</span>`;

                    const grayRectangle = document.createElement('div');
                    grayRectangle.classList.add('gray-rectangle');

                    const grayContent = document.createElement('div');
                    grayContent.classList.add('gray-content');

                    // Añadir la información de coberturas hospitalarias
                    const hospitalInfo = document.createElement('div');
                    hospitalInfo.classList.add('hospital-info');
                    hospitalInfo.innerHTML = `<strong>Hospitalario:</strong>`;
					//hospitalInfo.style.marginTop = '1px'; // Establece el margen superior para el hospitalInfo
					
					

                    const hospitalClinics = document.createElement('ul');
                    plan.hospitalCoverage.forEach(clinic => {
                        const clinicItem = document.createElement('li');
                        clinicItem.innerHTML = `${clinic.clinic}`;
                        hospitalClinics.appendChild(clinicItem);
                    });
                    hospitalInfo.appendChild(hospitalClinics);

                    const ambulatoryInfo = document.createElement('div');
                    ambulatoryInfo.classList.add('ambulatory-info');
                    ambulatoryInfo.innerHTML = `<strong>Ambulatorio:</strong>`;

                    const ambulatoryClinics = document.createElement('ul');
                    plan.ambulatoryCoverage.forEach(clinic => {
                        const clinicItem = document.createElement('li');
                        clinicItem.innerHTML = `${clinic.clinic}`;
                        ambulatoryClinics.appendChild(clinicItem);
                    });
                    ambulatoryInfo.appendChild(ambulatoryClinics);

                    const downloadButton = document.createElement('button');
                    downloadButton.classList.add('download-button');
                    downloadButton.innerHTML = 'Descargar Plan';
                    downloadButton.onclick = () => {
                        alert(`Descargando ${plan.name}`);
                    };

                 // Añadir los elementos al contenedor gris
            grayRectangle.appendChild(hospitalInfo); // Hospitalario primero
            grayRectangle.appendChild(ambulatoryInfo); // Luego Ambulatorio
            grayContent.appendChild(grayRectangle); // Añadir grayRectangle al contenido gris

            // Añadir todos los elementos al contenedor de información
            infoContainer.appendChild(planName);
            infoContainer.appendChild(additionalText);
            infoContainer.appendChild(priceTextCLP);
            infoContainer.appendChild(ufText);
            infoContainer.appendChild(grayContent); // Añadir grayContent al contenedor de información
            infoContainer.appendChild(downloadButton); // Añadir botón de descarga

            rectangle.appendChild(infoContainer); // Añadir infoContainer al rectángulo
            rectContainer.appendChild(rectangle); // Finalmente, añadir el rectángulo al contenedor principal
        });
            }

            // Crear rectángulos para cada Isapre
            createRectangles(banmedicaPlans, 'banmedica');
            createRectangles(colmenaPlans, 'colmena');
            createRectangles(consaludPlans, 'consalud');
            createRectangles(vidatresPlans, 'vidatres');
            createRectangles(esencialPlans, 'esencial');
            createRectangles(masvidaPlans, 'masvida');
        });

   let totalFactor = 0; // Variable global para el totalFactor

// Tabla de factores etarios
function getFactorByAge(age, type) {
    const ageRanges = {
        '0-19': { cotizante: 0.6, carga: 0.6 },
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

// Calcular y actualizar el total de factores
function calculateTotalFactor() {
    const beneficiaries = document.querySelectorAll('.beneficiario-item');
    totalFactor = 0; // Resetea el total factor

    beneficiaries.forEach(item => {
        const age = parseInt(item.getAttribute('data-age'), 10);
        const type = item.classList.contains('carga') ? 'carga' : 'cotizante';
        totalFactor += getFactorByAge(age, type);
    });

    // Iterar sobre los planes para actualizar el ufplan
    banmedicaPlans.forEach(plan => {
        const valorBasePlan = plan.valorbaseplan;

        // Calcular el precio total
        const precioTotal = totalFactor * valorBasePlan;

        // Actualizar el ufplan con el resultado de la multiplicación
        plan.ufplan = precioTotal.toFixed(2); // Actualiza el ufplan con el resultado
    });

    // También puedes mostrar el valor en la interfaz de usuario si lo deseas
    displayUpdatedPlans();
}

// Función para mostrar los planes actualizados en la interfaz
function displayUpdatedPlans() {
    const container = document.getElementById('plans-container');
    container.innerHTML = ''; // Limpiar el contenedor antes de volver a llenarlo

    banmedicaPlans.forEach(plan => {
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
                    <p>${plan.ufplan} UF</p> <!-- Se mostrará el total calculado aquí -->
                    <p>${plan.clpPrice}</p>
                </div>
                <a href="${plan.pdfUrl}" class="plan-download-btn">Descargar Plan</a>
            </div>
        `;

        // Agregar el plan al contenedor principal
        container.appendChild(planElement);
    });
}

// Agregar beneficiarios
document.getElementById('agregar-beneficiario').addEventListener('click', function() {
    const edad = document.getElementById('edad').value;
    const esCotizante = document.getElementById('cotizante-toggle').checked;
    const tipo = esCotizante ? 'Cotizante' : 'Carga';
    const claseTipo = esCotizante ? 'cotizante' : 'carga';

    if (edad) {
        const listaBeneficiarios = document.getElementById('beneficiarios-list');
        const nuevoBeneficiario = document.createElement('li');
        nuevoBeneficiario.classList.add('beneficiario-item', claseTipo);
        nuevoBeneficiario.setAttribute('data-age', edad);
        nuevoBeneficiario.innerHTML = `Edad: ${edad} - Tipo: ${tipo} <button class="delete-button">X</button>`;
        listaBeneficiarios.appendChild(nuevoBeneficiario);

        // Evento para eliminar beneficiarios
        nuevoBeneficiario.querySelector('.delete-button').addEventListener('click', function() {
            listaBeneficiarios.removeChild(nuevoBeneficiario);
            calculateTotalFactor();
        });

        // Limpiar campos
        document.getElementById('edad').value = '';
        document.getElementById('cotizante-toggle').checked = false;

        // Actualizar el total de factor etario y el ufplan
        calculateTotalFactor();
    } else {
        alert('Por favor, ingresa una edad válida.');
    }
});

