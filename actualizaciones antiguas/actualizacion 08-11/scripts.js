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

document.addEventListener('DOMContentLoaded', () => {
    

    
    // Llama a la función para cada plan de Isapre
    createRectangles(banmedicaPlans, 'banmedica');
   // createRectangles(colmenaPlans, 'colmena');
   // createRectangles(consaludPlans, 'consalud');
   // createRectangles(vidatresPlans, 'vidatres');
   // createRectangles(esencialPlans, 'esencial');
   // createRectangles(masvidaPlans, 'masvida');
});


let totalFactor = 0; // Variable global para el total de factor etáreo
let valorUF = 37981.22; // Variable para almacenar el valor de la UF

// Función para obtener el factor etáreo según la edad y tipo
function getFactorByAge(age, type) {
    const ageRanges = {
		'0- 1': { cotizante: 0, carga: 0 },
        '>2-19': { cotizante: 0.6, carga: 0.6 },
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

    beneficiaries.forEach(item => {
        const age = parseInt(item.getAttribute('data-age'), 10);
        const type = item.classList.contains('carga') ? 'carga' : 'cotizante';
        totalFactor += getFactorByAge(age, type);
    });

    // Muestra el valor del total de factores en el HTML
    document.getElementById('total-uf-value').textContent = totalFactor.toFixed(2);

    // Luego de actualizar el factor, recarga los planes para reflejar el cambio en el cálculo
    displayUpdatedPlans();
}

// Función para mostrar los planes actualizados en la interfaz
function displayUpdatedPlans() {
    const container = document.getElementById('rectangles-container');
    container.innerHTML = ''; // Limpia el contenedor antes de volver a llenarlo

    banmedicaPlans.forEach(plan => {
        const valorBase = parseFloat(plan.valorbaseplan);

        // Número de beneficiarios (cotizantes + cargas)
        const numBeneficiarios = document.querySelectorAll('.beneficiario-item').length;
        
        // Cálculo de GES total según número de beneficiarios
        const gesTotal = GES * numBeneficiarios;

        // Calcula el precio total incluyendo el valor base, totalFactor y gesTotal
        const precioTotal = (valorBase * totalFactor + gesTotal)
		
		

        // Crea el contenedor principal del plan
        const planElement = document.createElement('div');
        planElement.classList.add('plan');

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
        // Agrega el plan al contenedor principal
        container.appendChild(planElement);
    });
}

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

        // Evento para eliminar beneficiarios
        nuevoBeneficiario.querySelector('.delete-button').addEventListener('click', function () {
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

// Mostrar el texto de ayuda al pasar el puntero
document.getElementById('help-icon').addEventListener('mouseover', function () {
    document.getElementById('help-text').style.display = 'block';
});

// Ocultar el texto de ayuda al retirar el puntero
document.getElementById('help-icon').addEventListener('mouseout', function () {
    document.getElementById('help-text').style.display = 'none';
});

// Función para actualizar la posición del left rectangle
function actualizarPosicionLeftRectangle() {
    const leftRectangle = document.querySelector('.left-rectangle');
    const newRectangle = document.querySelector('.new-rectangle');
    
    // Obtiene la altura actual del new rectangle y establece el top del left rectangle
    const newRectangleHeight = newRectangle.getBoundingClientRect().height;
    leftRectangle.style.top = `${newRectangleHeight + 20}px`; // Ajusta el 20px según el espacio deseado
}

// Configura un observador para detectar cambios en la altura de new rectangle
const observer = new MutationObserver(actualizarPosicionLeftRectangle);
observer.observe(document.querySelector('.new-rectangle'), {
    childList: true, // Observa cambios en la lista de hijos
    subtree: true,   // Observa dentro de los subárboles
    characterData: true // Observa cambios en el texto
});

// Llama a la función para ajustar la posición desde el inicio
actualizarPosicionLeftRectangle();
