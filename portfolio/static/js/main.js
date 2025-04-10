document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    setTimeout(function() {
        const preloader = document.querySelector('.preloader');
        preloader.style.opacity = '0';
        setTimeout(function() {
            preloader.style.display = 'none';
        }, 500);
    }, 1000);
    
    // Initialize background animations for each section
    initSectionBackgrounds();

    // Initialize AOS (Animate on Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }
    
    // Initialize SVG animations if script is loaded
    if (typeof initializeSVGAnimations === 'function') {
        initializeSVGAnimations();
    }
    
    // Initialize Awards Slider
    initAwardsSlider();

    // Navbar scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });

    // Modern Mobile Navigation
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const modernNav = document.querySelector('.modern-nav');
    
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', function() {
            modernNav.classList.toggle('active');
            this.classList.toggle('active');
            
            // Add body scroll lock when menu is open
            if (modernNav.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }

    // Close mobile nav when clicking a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (modernNav.classList.contains('active')) {
                modernNav.classList.remove('active');
                mobileNavToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Activate nav links on scroll
    const sections = document.querySelectorAll('section[id]');
    if (sections.length > 0) {
        window.addEventListener('scroll', function() {
            const scrollY = window.pageYOffset;
            
            sections.forEach(section => {
                const sectionHeight = section.offsetHeight;
                const sectionTop = section.offsetTop - 100;
                const sectionId = section.getAttribute('id');
                
                const navLink = document.querySelector('.nav-menu a[href*=' + sectionId + ']');
                if (navLink) {
                    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                        navLink.classList.add('active');
                    } else {
                        navLink.classList.remove('active');
                    }
                }
            });
        });
    }

    // Skills Section - Tabs & Hexagon Animation
    const skillsSection = document.querySelector('#skills');
    if (skillsSection) {
        // Handle tab switching
        const skillTabs = document.querySelectorAll('.skill-tab');
        const skillCategories = document.querySelectorAll('.skills-category');
        
        skillTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs
                skillTabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Hide all skill categories
                skillCategories.forEach(category => {
                    category.classList.remove('active');
                });
                
                // Show the selected category
                const targetCategory = this.getAttribute('data-target');
                document.getElementById(`${targetCategory}-skills`).classList.add('active');
                
                // Reinitialize radar chart if it exists
                if (targetCategory === 'technical' && typeof Chart !== 'undefined') {
                    initSkillsRadarChart();
                }
            });
        });
        
        // Initialize Radar Chart for technical skills
        function initSkillsRadarChart() {
            const radarCanvas = document.getElementById('skills-radar-chart');
            if (!radarCanvas || typeof Chart === 'undefined') return;
            
            // Destroy existing chart if it exists
            if (window.skillsRadarChart) {
                window.skillsRadarChart.destroy();
            }
            
            // Get top skills for radar chart (max 7)
            const topTechnicalSkills = [];
            const topTechnicalValues = [];
            
            // Get skill data from DOM (only if using server-side rendering)
            const skillItems = document.querySelectorAll('#technical-skills .hex-item');
            let count = 0;
            
            skillItems.forEach(item => {
                if (count < 7) { // Limit to 7 for better visualization
                    const skillName = item.querySelector('h4').textContent;
                    const skillValue = parseInt(item.querySelector('.skill-value').textContent);
                    topTechnicalSkills.push(skillName);
                    topTechnicalValues.push(skillValue);
                    count++;
                }
            });
            
            // Create the radar chart
            const ctx = radarCanvas.getContext('2d');
            
            // Create a gradient
            const gradientFill = ctx.createLinearGradient(0, 0, 0, 400);
            gradientFill.addColorStop(0, 'rgba(42, 157, 143, 0.7)');
            gradientFill.addColorStop(1, 'rgba(38, 70, 83, 0.3)');
            
            window.skillsRadarChart = new Chart(ctx, {
                type: 'radar',
                data: {
                    labels: topTechnicalSkills,
                    datasets: [{
                        label: 'Expertise',
                        data: topTechnicalValues,
                        backgroundColor: gradientFill,
                        borderColor: 'rgba(42, 157, 143, 1)',
                        borderWidth: 2,
                        pointBackgroundColor: 'rgba(42, 157, 143, 1)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgba(42, 157, 143, 1)',
                        pointRadius: 5,
                        pointHoverRadius: 7
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        r: {
                            angleLines: {
                                display: true,
                                color: 'rgba(42, 157, 143, 0.2)'
                            },
                            grid: {
                                color: 'rgba(42, 157, 143, 0.1)'
                            },
                            suggestedMin: 50,
                            suggestedMax: 100,
                            ticks: {
                                stepSize: 10,
                                backdropColor: 'transparent',
                                color: '#666'
                            },
                            pointLabels: {
                                color: '#444',
                                font: {
                                    family: "'Poppins', sans-serif",
                                    size: 12,
                                    weight: 'bold'
                                }
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            backgroundColor: 'rgba(38, 70, 83, 0.8)',
                            titleFont: {
                                family: "'Poppins', sans-serif",
                                size: 14
                            },
                            bodyFont: {
                                family: "'Poppins', sans-serif",
                                size: 13
                            },
                            padding: 12,
                            boxPadding: 8,
                            cornerRadius: 8
                        }
                    }
                }
            });
        }
        
        // Initialize radar chart on page load
        if (typeof Chart !== 'undefined') {
            // Wait for DOM to be fully loaded with data
            setTimeout(initSkillsRadarChart, 500);
        }
        
        // Animate skill cards on scroll
        const skillCards = document.querySelectorAll('.skill-card');
        let skillsAnimationTriggered = false;
        
        // Create staggered hover effect
        skillCards.forEach((card) => {
            // Add slight 3D rotation effect on mouse move
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const posX = e.clientX - centerX;
                const posY = e.clientY - centerY;
                
                // Calculate rotation based on mouse position
                const rotateX = posY * -0.05;
                const rotateY = posX * 0.05;
                
                // Apply the transform
                this.style.transform = `translateY(-5px) scale(1.01) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
            
            // Reset on mouse leave
            card.addEventListener('mouseleave', function() {
                this.style.transform = '';
                setTimeout(() => {
                    this.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                }, 100);
            });
        });
        
        // Staggered entrance animation on scroll
        window.addEventListener('scroll', function() {
            const sectionPos = skillsSection.getBoundingClientRect().top;
            const screenPos = window.innerHeight / 1.3;
            
            if (sectionPos < screenPos && !skillsAnimationTriggered) {
                skillCards.forEach((card, index) => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(30px)';
                    
                    setTimeout(() => {
                        card.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 80); // Staggered timing
                });
                skillsAnimationTriggered = true;
            }
        });
    }

    // Projects filter
    const filterItems = document.querySelectorAll('.filter-item');
    const projectItems = document.querySelectorAll('.project-item');
    
    if (filterItems.length > 0) {
        filterItems.forEach(item => {
            item.addEventListener('click', function() {
                // Remove active class from all items
                filterItems.forEach(item => {
                    item.classList.remove('active');
                });
                
                // Add active class to clicked item
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                // Show/hide projects based on filter
                projectItems.forEach(project => {
                    if (filterValue === 'all' || project.classList.contains(filterValue)) {
                        project.style.display = 'block';
                    } else {
                        project.style.display = 'none';
                    }
                });
            });
        });
    }

    // Dark mode toggles (both in nav and footer)
    const darkModeToggles = document.querySelectorAll('.dark-mode-toggle');
    if (darkModeToggles.length) {
        // Check for saved user preference
        if (localStorage.getItem('darkMode') === 'enabled') {
            document.body.classList.add('dark-mode');
            darkModeToggles.forEach(toggle => {
                toggle.checked = true;
            });
        }
        
        darkModeToggles.forEach(toggle => {
            toggle.addEventListener('change', function() {
                if (this.checked) {
                    document.body.classList.add('dark-mode');
                    localStorage.setItem('darkMode', 'enabled');
                    // Sync all toggles
                    darkModeToggles.forEach(t => t.checked = true);
                } else {
                    document.body.classList.remove('dark-mode');
                    localStorage.setItem('darkMode', null);
                    // Sync all toggles
                    darkModeToggles.forEach(t => t.checked = false);
                }
            });
        });
    }

    // Initialize Experience Section Interactivity
    initExperienceInteractivity();
    
    // Initialize Data Visualizations
    initializeVisualizations();
    
    // Initialize Landing Page Data Animation
    initializeDataAnimation();
    
    // Initialize Dark Leaflet Map
    initDarkLeafletMap();
});

// Data Visualizations
function initializeVisualizations() {
    // Skills Distribution Chart
    if (document.getElementById('skills-chart') && typeof Chart !== 'undefined') {
        const ctx = document.getElementById('skills-chart').getContext('2d');
        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['GIS', 'Remote Sensing', 'Spatial Analysis', 'Data Science', 'Machine Learning', 'Big Data', 'Statistics'],
                datasets: [{
                    label: 'Technical Skills',
                    data: [95, 90, 92, 88, 82, 85, 87],
                    backgroundColor: 'rgba(42, 157, 143, 0.2)',
                    borderColor: 'rgba(42, 157, 143, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(42, 157, 143, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(42, 157, 143, 1)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scale: {
                    ticks: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    }

    // Project Technology Distribution
    if (document.getElementById('tech-chart') && typeof Chart !== 'undefined') {
        const ctx = document.getElementById('tech-chart').getContext('2d');
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['GIS', 'Python', 'R', 'Machine Learning', 'Remote Sensing', 'Big Data'],
                datasets: [{
                    data: [25, 20, 15, 18, 12, 10],
                    backgroundColor: [
                        'rgba(42, 157, 143, 0.8)',
                        'rgba(233, 196, 106, 0.8)',
                        'rgba(244, 162, 97, 0.8)',
                        'rgba(231, 111, 81, 0.8)',
                        'rgba(38, 70, 83, 0.8)',
                        'rgba(42, 157, 143, 0.6)'
                    ],
                    borderColor: [
                        'rgba(42, 157, 143, 1)',
                        'rgba(233, 196, 106, 1)',
                        'rgba(244, 162, 97, 1)',
                        'rgba(231, 111, 81, 1)',
                        'rgba(38, 70, 83, 1)',
                        'rgba(42, 157, 143, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    position: 'right'
                }
            }
        });
    }

    // Initialize 3D Globe Visualization
    if (document.getElementById('globe-visualization')) {
        // Check if Three.js is loaded
        if (typeof THREE !== 'undefined') {
            initGlobe();
        }
    }
}

// 3D Globe Visualization
function initGlobe() {
    const container = document.getElementById('globe-visualization');
    
    // Create scene
    const scene = new THREE.Scene();
    
    // Create camera
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 200;
    
    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
    
    // Create globe
    const sphereGeometry = new THREE.SphereGeometry(80, 64, 64);
    
    // Use a simple material if texture loading fails
    const sphereMaterial = new THREE.MeshPhongMaterial({
        color: 0x2a9d8f,
        shininess: 30,
        transparent: true,
        opacity: 0.8
    });
    
    // Try to load textures if possible
    const textureLoader = new THREE.TextureLoader();
    try {
        // First try loading from our static directory
        textureLoader.load('static/images/earth-texture.jpg', 
            // On successful load
            function(texture) {
                sphereMaterial.map = texture;
                sphereMaterial.needsUpdate = true;
                
                // Also try to load bump map
                textureLoader.load('static/images/earth-bump.jpg', 
                    function(bumpMap) {
                        sphereMaterial.bumpMap = bumpMap;
                        sphereMaterial.bumpScale = 0.5;
                        sphereMaterial.needsUpdate = true;
                    }
                );
            },
            // On progress
            undefined,
            // On error, try loading from a CDN
            function() {
                textureLoader.load('https://threejs.org/examples/textures/land_ocean_ice_cloud_2048.jpg', 
                    function(texture) {
                        sphereMaterial.map = texture;
                        sphereMaterial.needsUpdate = true;
                    }
                );
            }
        );
    } catch (e) {
        console.log("Unable to load textures, using solid color", e);
    }
    
    const earthMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(earthMesh);
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);
    
    // Add points of interest (project locations)
    const projectLocations = [
        { lat: 40.7128, lng: -74.0060, name: "New York Project" },
        { lat: 51.5074, lng: -0.1278, name: "London Project" },
        { lat: 48.8566, lng: 2.3522, name: "Paris Project" },
        { lat: 35.6762, lng: 139.6503, name: "Tokyo Project" },
        { lat: -33.8688, lng: 151.2093, name: "Sydney Project" }
    ];
    
    const pointGeometry = new THREE.SphereGeometry(1, 16, 16);
    const pointMaterial = new THREE.MeshBasicMaterial({ color: 0xe9c46a });
    
    projectLocations.forEach(location => {
        const point = new THREE.Mesh(pointGeometry, pointMaterial);
        
        // Convert lat/lng to 3D position
        const phi = (90 - location.lat) * (Math.PI / 180);
        const theta = (location.lng + 180) * (Math.PI / 180);
        
        const x = -(80 * Math.sin(phi) * Math.cos(theta));
        const y = (80 * Math.cos(phi));
        const z = (80 * Math.sin(phi) * Math.sin(theta));
        
        point.position.set(x, y, z);
        earthMesh.add(point);
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        earthMesh.rotation.y += 0.002;
        
        renderer.render(scene, camera);
    }
    
    animate();
}

// Initialize Particles.js
if (document.getElementById('particles-js') && typeof particlesJS !== 'undefined') {
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
                "value": "#2a9d8f"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                }
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#2a9d8f",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 2,
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
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
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
}

// Advanced Data Animation for Landing Page
// Initialize animated backgrounds for each section with dynamic elements
function initSectionBackgrounds() {
    // About section dynamic particles
    if (document.querySelector('#about')) {
        const aboutSection = document.querySelector('#about');
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'dynamic-particles';
        aboutSection.querySelector('.section-bg-animation').appendChild(dotsContainer);
        
        // Create dynamic dots
        for (let i = 0; i < 50; i++) {
            const dot = document.createElement('div');
            dot.className = 'dynamic-particle';
            dot.style.left = `${Math.random() * 100}%`;
            dot.style.top = `${Math.random() * 100}%`;
            dot.style.animationDelay = `${Math.random() * 5}s`;
            dot.style.width = `${Math.random() * 5 + 2}px`;
            dot.style.height = dot.style.width;
            dotsContainer.appendChild(dot);
        }
    }
    
    // Skills section interactive grid
    if (document.querySelector('#skills')) {
        const skillsSection = document.querySelector('#skills');
        const gridContainer = document.createElement('div');
        gridContainer.className = 'interactive-grid';
        skillsSection.querySelector('.section-bg-animation').appendChild(gridContainer);
        
        // Create interactive grid lines
        for (let i = 0; i < 20; i++) {
            const line = document.createElement('div');
            line.className = 'grid-line';
            line.style.left = `${i * 5}%`;
            line.style.animationDelay = `${i * 0.1}s`;
            gridContainer.appendChild(line);
        }
    }
    
    // Resume section flowing particles
    if (document.querySelector('#resume')) {
        const resumeSection = document.querySelector('#resume');
        const timelineParticles = document.createElement('div');
        timelineParticles.className = 'timeline-particles';
        resumeSection.querySelector('.section-bg-animation').appendChild(timelineParticles);
        
        // Create timeline flowing particles
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'timeline-particle';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.animationDuration = `${Math.random() * 10 + 5}s`;
            particle.style.animationDelay = `${Math.random() * 5}s`;
            timelineParticles.appendChild(particle);
        }
    }
    
    // Projects section code snippets
    if (document.querySelector('#projects')) {
        const projectsSection = document.querySelector('#projects');
        const snippetsContainer = document.createElement('div');
        snippetsContainer.className = 'floating-snippets';
        projectsSection.querySelector('.section-bg-animation').appendChild(snippetsContainer);
        
        // Create floating code snippets
        const snippets = [
            '<div class="python-code">import numpy as np</div>',
            '<div class="python-code">def analyze_data():</div>',
            '<div class="python-code">plt.plot(data)</div>',
            '<div class="js-code">function initMap() {</div>',
            '<div class="js-code">const data = await fetch()</div>',
            '<div class="sql-code">SELECT * FROM spatial_data</div>'
        ];
        
        for (let i = 0; i < 6; i++) {
            const snippet = document.createElement('div');
            snippet.className = 'floating-snippet';
            snippet.innerHTML = snippets[i];
            snippet.style.left = `${Math.random() * 80 + 10}%`;
            snippet.style.top = `${Math.random() * 80 + 10}%`;
            snippet.style.animationDelay = `${Math.random() * 5}s`;
            snippet.style.transform = `rotate(${Math.random() * 10 - 5}deg)`;
            snippetsContainer.appendChild(snippet);
        }
    }
    
    // Initialize scroll-based animation triggers
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        window.addEventListener('scroll', () => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75 && sectionTop > -section.offsetHeight * 0.5) {
                section.classList.add('section-visible');
            } else {
                section.classList.remove('section-visible');
            }
        });
    });
    
    console.log('Enhanced section backgrounds initialized');
}

// Interactive Experience Section
function initExperienceInteractivity() {
    // Toggle for achievements sections
    const toggles = document.querySelectorAll('.experience-collapse-toggle');
    
    toggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const achievements = this.nextElementSibling;
            
            // Toggle active class to control the dropdown
            this.classList.toggle('active');
            
            if (this.classList.contains('active')) {
                achievements.classList.add('active');
                
                // Add sliding animation
                achievements.style.maxHeight = achievements.scrollHeight + 'px';
                achievements.style.padding = '15px 20px';
            } else {
                achievements.classList.remove('active');
                achievements.style.maxHeight = '0';
                achievements.style.padding = '0 20px';
                
                // Ensure text is hidden during transition
                setTimeout(() => {
                    if (!this.classList.contains('active')) {
                        achievements.scrollTop = 0;
                    }
                }, 400);
            }
        });
    });
    
    // Add hover effects for experience items
    const experienceItems = document.querySelectorAll('.experience-item');
    
    experienceItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const shapes = this.querySelectorAll('.card-shape');
            
            shapes.forEach(shape => {
                shape.style.opacity = '0.6';
                
                // Add slight movement on hover
                if (shape.classList.contains('shape-1')) {
                    shape.style.transform = 'translateX(-5px) translateY(5px)';
                } else {
                    shape.style.transform = 'translateX(5px) translateY(-5px)';
                }
            });
        });
        
        item.addEventListener('mouseleave', function() {
            const shapes = this.querySelectorAll('.card-shape');
            
            shapes.forEach(shape => {
                shape.style.opacity = '0.4';
                shape.style.transform = 'translateX(0) translateY(0)';
            });
        });
    });
    
    // Add SVG path animation triggers on scroll
    const resumeSection = document.getElementById('resume');
    if (resumeSection) {
        window.addEventListener('scroll', function() {
            const sectionTop = resumeSection.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.5) {
                const svgLine = document.querySelector('.experience-line');
                if (svgLine) {
                    svgLine.style.strokeDashoffset = '0';
                }
            }
        });
    }
}

// Awards Slider Functionality
function initAwardsSlider() {
    const sliderContainer = document.querySelector('.awards-slider-container');
    if (!sliderContainer) return;
    
    const prevBtn = document.querySelector('.prev-arrow');
    const nextBtn = document.querySelector('.next-arrow');
    const dotsContainer = document.querySelector('.slider-dots');
    const slides = document.querySelectorAll('.award-item');
    
    if (slides.length === 0) return;
    
    // Variables
    let slideWidth;
    let currentIndex = 0;
    let visibleSlides;
    
    // Create dots based on number of pages
    function createDots() {
        dotsContainer.innerHTML = '';
        
        // Determine visible slides based on screen width
        if (window.innerWidth <= 576) {
            visibleSlides = 1;
        } else if (window.innerWidth <= 991) {
            visibleSlides = 2;
        } else {
            visibleSlides = 3;
        }
        
        // Calculate how many pages (dots) we need
        const numPages = Math.ceil(slides.length / visibleSlides);
        
        // Create dots
        for (let i = 0; i < numPages; i++) {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if (i === 0) dot.classList.add('active');
            
            dot.addEventListener('click', () => {
                goToSlide(i);
            });
            
            dotsContainer.appendChild(dot);
        }
    }
    
    // Update the slider position
    function updateSlider() {
        // Get the current slide width (including gap)
        slideWidth = slides[0].offsetWidth + 20; // 20px is our gap
        
        // Calculate new position
        const newPosition = -currentIndex * slideWidth * visibleSlides;
        sliderContainer.style.transform = `translateX(${newPosition}px)`;
        
        // Update active dot
        const dots = document.querySelectorAll('.slider-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Go to a specific slide
    function goToSlide(index) {
        // Ensure the index is within bounds
        const numPages = Math.ceil(slides.length / visibleSlides);
        currentIndex = Math.max(0, Math.min(index, numPages - 1));
        updateSlider();
    }
    
    // Next slide
    function nextSlide() {
        const numPages = Math.ceil(slides.length / visibleSlides);
        currentIndex = (currentIndex + 1) % numPages;
        updateSlider();
    }
    
    // Previous slide
    function prevSlide() {
        const numPages = Math.ceil(slides.length / visibleSlides);
        currentIndex = (currentIndex - 1 + numPages) % numPages;
        updateSlider();
    }
    
    // Add event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    // Initialize slider
    createDots();
    updateSlider();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        createDots(); // Recreate dots based on new screen size
        currentIndex = 0; // Reset to first slide
        updateSlider();
    });
    
    // Touch events for swipe
    let touchStartX = 0;
    let touchEndX = 0;
    
    sliderContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    sliderContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchStartX - touchEndX > swipeThreshold) {
            nextSlide(); // Swipe left means next slide
        } else if (touchEndX - touchStartX > swipeThreshold) {
            prevSlide(); // Swipe right means previous slide
        }
    }
}

// Initialize Dark-themed Leaflet Map
function initDarkLeafletMap() {
    const mapElement = document.getElementById('leaflet-map');
    if (!mapElement) return;
    
    // Melbourne Central coordinates
    const melbourneCentral = [-37.8110, 144.9626];
    
    // Initialize map
    const map = L.map('leaflet-map', {
        center: melbourneCentral,
        zoom: 13,
        zoomControl: false, // We'll add it in a better position
        attributionControl: false // We'll add it back in a better position
    });
    
    // Add zoom control to the top right
    L.control.zoom({
        position: 'topright'
    }).addTo(map);
    
    // Add attribution control to the bottom right
    L.control.attribution({
        position: 'bottomright',
        prefix: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    
    // Dark theme map from CartoDB
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
    }).addTo(map);
    
    // Create custom marker
    const customMarkerIcon = L.divIcon({
        className: 'custom-map-marker',
        iconSize: [20, 20],
        iconAnchor: [10, 10]
    });
    
    // Add marker for Melbourne Central
    const marker = L.marker(melbourneCentral, {
        icon: customMarkerIcon
    }).addTo(map);
    
    // Add a pulsing circle around the marker
    const pulsingCircle = L.circleMarker(melbourneCentral, {
        radius: 30,
        color: 'rgba(42, 157, 143, 0.4)',
        fillColor: 'rgba(42, 157, 143, 0.1)',
        weight: 2,
        fillOpacity: 0.3
    }).addTo(map);
    
    // Animate the pulsing circle
    function animateCircle() {
        const start = 15;
        const end = 40;
        const duration = 1500;
        let step = 0;
        
        function animate() {
            step = (step + 1) % 60;
            const size = start + (end - start) * Math.abs(Math.sin(step / 60 * Math.PI));
            pulsingCircle.setRadius(size);
            requestAnimationFrame(animate);
        }
        
        animate();
    }
    
    animateCircle();
    
    // Add a popup with info
    marker.bindPopup('<strong>Melbourne, Australia</strong><br>My Current Location', {
        className: 'custom-popup'
    });
    
    // Refresh map size when tab is shown (fixes Leaflet not rendering properly)
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            setTimeout(() => {
                map.invalidateSize();
            }, 400);
        });
    });
}

function initializeDataAnimation() {
    const dataAnimationContainer = document.getElementById('data-animation-container');
    if (!dataAnimationContainer) return;
    
    // Create canvas for data visualization animation
    const canvas = document.createElement('canvas');
    canvas.width = dataAnimationContainer.offsetWidth;
    canvas.height = dataAnimationContainer.offsetHeight;
    dataAnimationContainer.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    // Animation properties
    const dataPoints = [];
    const connections = [];
    const NUM_POINTS = 50;
    const CONNECTION_DIST = 100;
    const COLORS = ['#2a9d8f', '#e9c46a', '#f4a261', '#e76f51', '#264653'];
    
    // Create data points
    for (let i = 0; i < NUM_POINTS; i++) {
        dataPoints.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 5 + 2,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            highlighted: Math.random() > 0.7 // Some points are highlighted
        });
    }
    
    // Create some fixed analysis elements
    const analysisElements = [
        {
            type: 'chart',
            x: canvas.width * 0.2,
            y: canvas.height * 0.3,
            width: 100,
            height: 60,
            data: [30, 50, 20, 70, 40],
            color: COLORS[0],
            rotation: 0,
            rotationSpeed: 0.01
        },
        {
            type: 'map',
            x: canvas.width * 0.7,
            y: canvas.height * 0.4,
            width: 120,
            height: 80,
            color: COLORS[2],
            rotation: 0,
            rotationSpeed: 0.005
        },
        {
            type: 'satellite',
            x: canvas.width * 0.5,
            y: canvas.height * 0.7,
            width: 80,
            height: 80,
            color: COLORS[4],
            rotation: 0,
            rotationSpeed: -0.02
        }
    ];
    
    // Animation function
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw analysis elements
        analysisElements.forEach(element => {
            element.rotation += element.rotationSpeed;
            
            ctx.save();
            ctx.translate(element.x, element.y);
            ctx.rotate(element.rotation);
            
            // Draw based on element type
            if (element.type === 'chart') {
                drawChart(element, -element.width/2, -element.height/2);
            } else if (element.type === 'map') {
                drawMap(element, -element.width/2, -element.height/2);
            } else if (element.type === 'satellite') {
                drawSatellite(element, -element.width/2, -element.height/2);
            }
            
            ctx.restore();
        });
        
        // Create connections between points
        connections.length = 0;
        for (let i = 0; i < dataPoints.length; i++) {
            for (let j = i + 1; j < dataPoints.length; j++) {
                const dx = dataPoints[i].x - dataPoints[j].x;
                const dy = dataPoints[i].y - dataPoints[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < CONNECTION_DIST) {
                    connections.push({
                        p1: dataPoints[i],
                        p2: dataPoints[j],
                        distance: distance
                    });
                }
            }
        }
        
        // Draw connections
        ctx.lineWidth = 0.5;
        connections.forEach(connection => {
            const opacity = 1 - (connection.distance / CONNECTION_DIST);
            ctx.strokeStyle = `rgba(42, 157, 143, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(connection.p1.x, connection.p1.y);
            ctx.lineTo(connection.p2.x, connection.p2.y);
            ctx.stroke();
        });
        
        // Update and draw data points
        dataPoints.forEach(point => {
            // Update position
            point.x += point.vx;
            point.y += point.vy;
            
            // Bounce off walls
            if (point.x < 0 || point.x > canvas.width) point.vx *= -1;
            if (point.y < 0 || point.y > canvas.height) point.vy *= -1;
            
            // Draw point
            ctx.beginPath();
            ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
            
            if (point.highlighted) {
                // Create a gradient for highlighted points
                const gradient = ctx.createRadialGradient(
                    point.x, point.y, 0,
                    point.x, point.y, point.radius * 2
                );
                gradient.addColorStop(0, point.color);
                gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
                
                ctx.fillStyle = gradient;
                ctx.fill();
                
                // Add a glowing effect
                ctx.shadowColor = point.color;
                ctx.shadowBlur = 15;
                ctx.fill();
                ctx.shadowBlur = 0;
            } else {
                ctx.fillStyle = point.color;
                ctx.fill();
            }
        });
        
        // Call next frame
        requestAnimationFrame(animate);
    }
    
    // Helper functions to draw analysis elements
    function drawChart(element, x, y) {
        ctx.fillStyle = element.color;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.lineWidth = 1;
        
        // Draw chart background
        ctx.fillRect(x, y, element.width, element.height);
        ctx.strokeRect(x, y, element.width, element.height);
        
        // Draw chart bars
        const barWidth = element.width / element.data.length;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        
        element.data.forEach((value, i) => {
            const barHeight = (value / 100) * element.height;
            ctx.fillRect(
                x + i * barWidth, 
                y + element.height - barHeight, 
                barWidth - 2, 
                barHeight
            );
        });
    }
    
    function drawMap(element, x, y) {
        // Draw map background
        ctx.fillStyle = element.color;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.lineWidth = 1;
        ctx.fillRect(x, y, element.width, element.height);
        ctx.strokeRect(x, y, element.width, element.height);
        
        // Draw simplified continent shapes
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        
        // North America
        ctx.beginPath();
        ctx.moveTo(x + element.width * 0.2, y + element.height * 0.3);
        ctx.lineTo(x + element.width * 0.4, y + element.height * 0.2);
        ctx.lineTo(x + element.width * 0.4, y + element.height * 0.5);
        ctx.lineTo(x + element.width * 0.2, y + element.height * 0.6);
        ctx.closePath();
        ctx.fill();
        
        // Europe
        ctx.beginPath();
        ctx.moveTo(x + element.width * 0.5, y + element.height * 0.2);
        ctx.lineTo(x + element.width * 0.6, y + element.height * 0.2);
        ctx.lineTo(x + element.width * 0.58, y + element.height * 0.4);
        ctx.lineTo(x + element.width * 0.48, y + element.height * 0.35);
        ctx.closePath();
        ctx.fill();
        
        // Africa
        ctx.beginPath();
        ctx.moveTo(x + element.width * 0.5, y + element.height * 0.4);
        ctx.lineTo(x + element.width * 0.6, y + element.height * 0.4);
        ctx.lineTo(x + element.width * 0.55, y + element.height * 0.7);
        ctx.lineTo(x + element.width * 0.47, y + element.height * 0.65);
        ctx.closePath();
        ctx.fill();
        
        // Add some data points
        const dataPoints = [
            { x: x + element.width * 0.3, y: y + element.height * 0.4 },
            { x: x + element.width * 0.55, y: y + element.height * 0.25 },
            { x: x + element.width * 0.52, y: y + element.height * 0.55 },
            { x: x + element.width * 0.7, y: y + element.height * 0.6 }
        ];
        
        dataPoints.forEach(point => {
            // Outer glow
            ctx.beginPath();
            ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(233, 196, 106, 0.3)';
            ctx.fill();
            
            // Inner point
            ctx.beginPath();
            ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(233, 196, 106, 1)';
            ctx.fill();
        });
    }
    
    function drawSatellite(element, x, y) {
        // Draw satellite body
        ctx.fillStyle = element.color;
        ctx.fillRect(x + element.width * 0.4, y + element.height * 0.3, element.width * 0.2, element.height * 0.4);
        
        // Draw solar panels
        ctx.fillStyle = 'rgba(233, 196, 106, 0.8)';
        ctx.fillRect(x + element.width * 0.1, y + element.height * 0.4, element.width * 0.3, element.height * 0.2);
        ctx.fillRect(x + element.width * 0.6, y + element.height * 0.4, element.width * 0.3, element.height * 0.2);
        
        // Draw satellite dish
        ctx.beginPath();
        ctx.arc(x + element.width * 0.5, y + element.height * 0.2, element.width * 0.1, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.fill();
        
        // Draw transmission waves
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.beginPath();
        ctx.arc(x + element.width * 0.5, y + element.height * 0.2, element.width * 0.2, Math.PI * 0.8, Math.PI * 1.6);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(x + element.width * 0.5, y + element.height * 0.2, element.width * 0.3, Math.PI * 0.9, Math.PI * 1.5);
        ctx.stroke();
    }
    
    // Start animation
    animate();
    
    // Handle window resize
    window.addEventListener('resize', function() {
        canvas.width = dataAnimationContainer.offsetWidth;
        canvas.height = dataAnimationContainer.offsetHeight;
        
        // Update element positions
        analysisElements.forEach(element => {
            element.x = Math.random() * canvas.width;
            element.y = Math.random() * canvas.height;
        });
    });
}