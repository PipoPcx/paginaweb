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

// Cargar rectángulos con logos de isapres y nombres de planes
const rectContainer = document.getElementById('rectangles-container');
const isapres = [
    {
        class: 'banmedica',
        logo: 'images/banmedica.png',
        plans: [
            { 
                name: 'Plan 1 Banmedica', 
                additionalInfo: 'Código 1234',
                uf: '3.5 UF', // Precio agregado
				clpPrice: '$ 27000 UF', // Precio agregado
                hospitalCoverage: [
                    { clinic: 'Santa María', coverage: '90%' },
                    { clinic: 'Dávila', coverage: '80%' },
                    { clinic: 'san carlos de apoquindo', coverage: '80%' },
                    { clinic: 'universidad de los andes', coverage: '80%' }
                ],
                ambulatoryCoverage: [
                    { clinic: 'Santa María', coverage: '85%' },
                    { clinic: 'Dávila', coverage: '75%' },
                    { clinic: 'san carlos de apoquindo', coverage: '80%' },
                    { clinic: 'universidad de los andes', coverage: '80%' }
                ],
            },
            { 
                name: 'Plan 2 Banmedica', 
                additionalInfo: 'Código 5678',
                uf: '4.8 UF', // Precio agregado
				clpPrice: '$ 100000', // Precio agregado
                hospitalCoverage: [
                    { clinic: 'Santa María', coverage: '85%' },
                    { clinic: 'Dávila', coverage: '75%' }
                ],
                ambulatoryCoverage: [
                    { clinic: 'Santa María', coverage: '80%' },
                    { clinic: 'Dávila', coverage: '70%' }
                ]
            },
        ]
    },
    // Agregar más isapres y planes de manera similar
];

// Función para crear los rectángulos con información
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
        planName.innerHTML = `<strong>${plan.name}</strong>`;

        const additionalText = document.createElement('div');
        additionalText.classList.add('additional-info');
        additionalText.innerHTML = `Código: <span>${plan.additionalInfo}</span>`;

        const ufText = document.createElement('div'); // Texto de UF agregado
        ufText.classList.add('uf-info');
        ufText.innerHTML = `<span>${plan.uf}</span>`; // Mostrar precio con UF
		
		const priceTextCLP = document.createElement('div'); // Texto de CLP agregado
        priceTextCLP.classList.add('price-info-clp'); // Nueva clase para CLP
        priceTextCLP.innerHTML = `<span>${plan.clpPrice}</span>`; // Mostrar precio en CLP

        const grayRectangle = document.createElement('div');
        grayRectangle.classList.add('gray-rectangle');

        const grayContent = document.createElement('div');
        grayContent.classList.add('gray-content');

        // Añadir la información de coberturas hospitalarias
        const hospitalInfo = document.createElement('div');
        hospitalInfo.classList.add('hospital-info');
        hospitalInfo.innerHTML = `<strong>Hospitalario:</strong>`;
        
        const hospitalClinics = document.createElement('ul');
        plan.hospitalCoverage.forEach(clinic => {
            const clinicItem = document.createElement('li');
            clinicItem.innerHTML = `${clinic.coverage} - ${clinic.clinic}`;
            hospitalClinics.appendChild(clinicItem);
        });
        hospitalInfo.appendChild(hospitalClinics);

        const ambulatoryInfo = document.createElement('div');
        ambulatoryInfo.classList.add('ambulatory-info');
        ambulatoryInfo.innerHTML = `<strong>Ambulatorio:</strong>`;

        const ambulatoryClinics = document.createElement('ul');
        plan.ambulatoryCoverage.forEach(clinic => {
            const clinicItem = document.createElement('li');
            clinicItem.innerHTML = `${clinic.coverage} - ${clinic.clinic}`;
            ambulatoryClinics.appendChild(clinicItem);
        });
        ambulatoryInfo.appendChild(ambulatoryClinics);

        // Botón de descarga de plan
        const downloadButton = document.createElement('button');
        downloadButton.classList.add('download-button');
        downloadButton.innerHTML = 'Descargar Plan';

        // Asignar la funcionalidad de descarga
        downloadButton.addEventListener('click', () => {
            const pdfUrl = `planes/.pdf`; // Ajustar ruta del archivo PDF
            window.open(pdfUrl, '_blank');
        });

        grayContent.appendChild(hospitalInfo);
        grayContent.appendChild(ambulatoryInfo);
        grayRectangle.appendChild(grayContent);

        rectangle.appendChild(logo);
        rectangle.appendChild(planName);
        rectangle.appendChild(additionalText);
        rectangle.appendChild(ufText); // Agregar el texto de precio
		rectangle.appendChild(priceTextCLP); // Agregar el texto de CLP al rectángulo
        rectangle.appendChild(grayRectangle);
        rectangle.appendChild(downloadButton); // Agregar botón de descarga
        rectContainer.appendChild(rectangle);
    });
});
