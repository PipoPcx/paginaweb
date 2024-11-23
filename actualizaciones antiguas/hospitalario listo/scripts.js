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
            "value": "#FFFFFF" // Color de las partículas
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
            "color": "#FFFFFF", // Color de las líneas
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

// Cargar rectángulos con logos de isapres y nombres de planes
const rectContainer = document.getElementById('rectangles-container');
const isapres = [
    { 
        logo: 'images/Banmedica.png', 
        class: 'banmedica', 
        plans: [
            { name: 'Mas banmedica', additionalInfo: '13-5698-13', coverage: ['100% Santa María', '80% Dávila','80% Dávila' ] },
            { name: 'Plan B Banmedica', additionalInfo: 'Información adicional 2 para Banmedica', coverage: ['90% Hospitalario', '75% Santa María'] }
        ]
    },
    { 
        logo: 'images/Consalud.png', 
        class: 'consalud', 
        plans: [
            { name: 'Plan A Consalud', additionalInfo: 'Información adicional 1 para Consalud', coverage: ['85% Hospitalario'] },
            { name: 'Plan B Consalud', additionalInfo: 'Información adicional 2 para Consalud', coverage: ['95% Hospitalario', '70% Dávila'] }
        ]
    },
    { 
        logo: 'images/Colmena.png', 
        class: 'colmena', 
        plans: [
            { name: 'Plan A Colmena', additionalInfo: 'Información adicional 1 para Colmena', coverage: ['100% Clínica Santa María', '90% Dávila'] },
            { name: 'Plan B Colmena', additionalInfo: 'Información adicional 2 para Colmena', coverage: ['75% Hospitalario'] }
        ]
    },
    // Aquí puedes agregar más isapres según sea necesario...
];

isapres.forEach(isapre => {
    isapre.plans.forEach(plan => {
        const rectangle = document.createElement('div');
        rectangle.classList.add('rectangle', isapre.class);

        const logo = document.createElement('img');
        logo.src = isapre.logo;
        logo.alt = `Logo ${isapre.class}`;
        logo.classList.add('logo');

        const planName = document.createElement('div');
        planName.classList.add('plan-name');
        planName.textContent = plan.name;

        const additionalText = document.createElement('div');
        additionalText.classList.add('additional-info');
        additionalText.textContent = plan.additionalInfo;

        const coverageContainer = document.createElement('div');
        coverageContainer.classList.add('coverage-container');

        // Agregar título para la cobertura
        const coverageTitle = document.createElement('div');
        coverageTitle.classList.add('coverage-title');
        coverageTitle.textContent = 'Cobertura Hospitalaria'; // Título de cobertura
        coverageContainer.appendChild(coverageTitle); // Agregar título al contenedor de coberturas

        plan.coverage.forEach(cov => {
            const coverageItem = document.createElement('div');
            coverageItem.classList.add('coverage-item');
            coverageItem.textContent = cov; // Cobertura
            coverageContainer.appendChild(coverageItem);
        });

        rectangle.appendChild(logo);
        rectangle.appendChild(planName);
        rectangle.appendChild(additionalText);
        rectangle.appendChild(coverageContainer);
        rectContainer.appendChild(rectangle);
    });
});

