/**
 * SVG Animations - Advanced SVG animations for Afzal Khan's Portfolio
 * This file contains custom SVG animations and morphing effects for various sections
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize SVG animations once the DOM is fully loaded
    initializeSVGAnimations();
});

/**
 * Initialize all SVG animations throughout the website
 */
function initializeSVGAnimations() {
    // Create and animate the blob SVGs for the About section
    createMorphingBlobs();
    
    // Create tech-related SVG icons for the Skills section
    createTechIcons();
    
    // Add floating code snippets with syntax highlighting
    createFloatingCodeSnippets();
    
    // Create decorative SVG elements for all sections
    createDecorativeSVGElements();
    
    // Create SVG timelines for Experience section
    enhanceExperienceTimeline();
}

/**
 * Create and animate morphing blob SVG elements
 */
function createMorphingBlobs() {
    // Select the about section's section-bg-animation div
    const aboutSection = document.querySelector('#about .section-bg-animation');
    if (!aboutSection) return;
    
    // Create and append SVG blobs with unique animations
    const blobsData = [
        {
            position: { top: '-5%', right: '5%' },
            size: { width: '300px', height: '300px' },
            animation: 'rotateBlob 30s infinite linear',
            paths: [
                "M42.7,-57.2C55.9,-51.8,67.7,-40.6,72.5,-27C77.2,-13.3,74.9,2.8,70.4,18.5C65.9,34.2,59.2,49.5,47.6,57.9C36,66.3,19.5,67.8,2.4,65.1C-14.7,62.5,-32.4,55.7,-45.3,44.5C-58.3,33.3,-66.5,17.6,-69.8,-0.2C-73.1,-18.1,-71.5,-38.1,-61.3,-49.9C-51.1,-61.7,-32.4,-65.3,-15.5,-67.1C1.4,-68.9,16.4,-68.9,29.8,-63.8C43.2,-58.8,54.9,-47.8,42.7,-57.2Z",
                "M39.3,-65.6C50.9,-60.5,60.3,-49.2,65.8,-36.7C71.3,-24.2,72.8,-10.5,71.2,2.4C69.5,15.2,64.8,27.2,57.4,38C50.1,48.8,40.2,58.4,28.4,65.9C16.6,73.3,3,78.7,-10.2,76.8C-23.4,74.9,-36.3,65.8,-47.7,54.9C-59.1,44,-69.1,31.4,-73.6,17.1C-78.1,2.7,-77.1,-13.4,-72.3,-28.2C-67.5,-43,-58.9,-56.5,-46.8,-61.5C-34.7,-66.5,-19.1,-63,-3.6,-58.2C11.9,-53.4,27.6,-47.4,39.3,-65.6Z",
                "M36.3,-62.7C46.7,-57.5,54.7,-45.8,63.2,-33.3C71.7,-20.8,80.8,-7.5,81.5,6.4C82.3,20.3,74.8,34.8,64.4,45.4C54,56.1,40.7,62.9,26.9,67.9C13.1,73,-1.2,76.3,-15.4,74.4C-29.7,72.6,-43.8,65.7,-52.6,54.9C-61.4,44.1,-64.8,29.4,-68.9,14.4C-73,-0.7,-77.7,-16.1,-74.1,-29.8C-70.5,-43.5,-58.7,-55.5,-45,-60.4C-31.3,-65.3,-15.7,-63.2,-0.8,-61.9C14.1,-60.5,28.1,-59.9,36.3,-62.7Z"
            ],
            id: 'blob-1'
        },
        {
            position: { bottom: '10%', left: '5%' },
            size: { width: '250px', height: '250px' },
            animation: 'floatBlob 20s infinite ease-in-out alternate',
            paths: [
                "M45.4,-75.3C59.2,-68.6,71.1,-56.7,79.4,-42.4C87.7,-28.1,92.4,-11.5,90.4,4.5C88.4,20.5,79.7,36,68.6,48.8C57.4,61.7,43.8,71.9,28.5,76.8C13.1,81.7,-4,81.4,-19.7,76.5C-35.4,71.7,-49.7,62.3,-62.3,49.8C-74.9,37.4,-85.8,21.9,-88.3,4.6C-90.8,-12.7,-84.8,-32,-74.1,-47.8C-63.4,-63.6,-47.9,-75.8,-32.1,-81.4C-16.3,-87,-8.1,-85.9,3.2,-91.1C14.5,-96.3,29,-91.8,45.4,-75.3Z",
                "M42.1,-71.9C55.2,-65.2,67.1,-54.9,76.2,-41.8C85.3,-28.7,91.6,-12.9,90.6,2.1C89.5,17.1,81.1,31.3,70.4,43.2C59.7,55,46.7,64.4,32.2,70.1C17.8,75.9,2,78.1,-12.2,75.1C-26.4,72.1,-38.9,64,-49.1,53.7C-59.3,43.3,-67.2,30.7,-72.6,16.1C-77.9,1.5,-80.8,-15.1,-76.9,-29.8C-72.9,-44.5,-62.2,-57.3,-48.8,-64C-35.4,-70.6,-19.4,-71.2,-3.4,-66.1C12.6,-61,29,-78.5,42.1,-71.9Z",
                "M45.2,-78.5C58.4,-72.1,69,-58.9,76.2,-44.5C83.5,-30.1,87.3,-14.2,87.4,1.9C87.5,18,83.8,34.6,75.6,49.3C67.3,64,54.5,76.8,39.1,82.4C23.7,88.1,5.7,86.6,-9.9,80.5C-25.5,74.4,-38.5,63.7,-50.3,52.3C-62,40.9,-72.4,28.7,-77.8,14C-83.1,-0.7,-83.4,-17.8,-76.9,-32C-70.5,-46.2,-57.2,-57.4,-43.2,-63.6C-29.2,-69.7,-14.6,-70.9,0.8,-72.2C16.3,-73.5,32.1,-74.9,45.2,-78.5Z"
            ],
            id: 'blob-2'
        },
        {
            position: { top: '40%', left: '60%' },
            size: { width: '200px', height: '200px' },
            animation: 'floatBlob 15s infinite ease-in-out reverse',
            paths: [
                "M32.2,-54.5C42.3,-50,51.9,-42,58.2,-31.6C64.6,-21.2,67.8,-8.5,67.2,4.5C66.6,17.4,62.2,30.7,53.9,40.7C45.6,50.8,33.3,57.6,20.2,62.5C7.1,67.4,-6.9,70.4,-18.8,66.7C-30.8,62.9,-40.7,52.4,-48.5,41.1C-56.3,29.9,-62,18,-63.5,5.6C-65,-6.8,-62.4,-19.8,-56.3,-31.3C-50.2,-42.9,-40.6,-53,-29.4,-56.5C-18.2,-60,-5.4,-57,4.3,-64.3C14,-71.7,22.1,-89.3,32.2,-54.5Z",
                "M25.9,-45C33.4,-40.6,39.5,-33.1,44.4,-24.4C49.3,-15.7,53,-5.8,53,4.4C53.1,14.6,49.4,25.3,42.7,33.7C36,42.1,26.1,48.3,15.1,51.7C4,55.1,-8.3,55.7,-19.6,52.3C-30.9,49,-41.2,41.6,-47.6,31.8C-54,22,-56.4,9.6,-55.5,-2.3C-54.6,-14.2,-50.3,-25.6,-43,-34.3C-35.7,-43,-25.3,-48.9,-15.3,-51.1C-5.2,-53.4,4.5,-52,12.9,-48.7C21.4,-45.4,28.5,-40.1,25.9,-45Z",
                "M27.3,-46.1C34.8,-42.6,39.9,-33.7,44.8,-24.6C49.8,-15.5,54.7,-6.2,54.1,2.8C53.6,11.8,47.6,20.7,41.1,30.5C34.7,40.3,27.7,51.1,17.9,55.3C8,59.5,-4.6,57,-15.2,52.2C-25.9,47.3,-34.6,40.1,-40.8,31.2C-47,22.2,-50.6,11.1,-50.5,0.1C-50.4,-10.9,-46.5,-21.8,-39.9,-25.9C-33.2,-30,-24,-27.3,-16.4,-31C-8.8,-34.6,-2.9,-44.6,3.9,-50.6C10.6,-56.6,21.2,-58.5,27.3,-46.1Z"
            ],
            id: 'blob-3'
        }
    ];
    
    blobsData.forEach(blob => {
        // Create SVG element
        const svgBlob = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svgBlob.setAttribute('viewBox', '0 0 200 200');
        svgBlob.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        svgBlob.classList.add('decorative-svg');
        svgBlob.id = blob.id;
        svgBlob.style.position = 'absolute';
        
        // Set positioning
        if (blob.position.top) svgBlob.style.top = blob.position.top;
        if (blob.position.right) svgBlob.style.right = blob.position.right;
        if (blob.position.bottom) svgBlob.style.bottom = blob.position.bottom;
        if (blob.position.left) svgBlob.style.left = blob.position.left;
        
        // Set size
        svgBlob.style.width = blob.size.width;
        svgBlob.style.height = blob.size.height;
        
        // Set animation
        svgBlob.style.animation = blob.animation;
        
        // Create the path element
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.classList.add('blob-path');
        path.setAttribute('d', blob.paths[0]);
        path.setAttribute('transform', 'translate(100 100)');
        
        // Set up the keyframe animation for path morphing
        const animateElement = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
        animateElement.setAttribute('attributeName', 'd');
        animateElement.setAttribute('dur', '15s');
        animateElement.setAttribute('repeatCount', 'indefinite');
        
        // Create the values string from paths array
        const valuesStr = blob.paths.join('; ');
        animateElement.setAttribute('values', valuesStr);
        
        // Add keySplines for smooth transitions (cubic-bezier)
        animateElement.setAttribute('keySplines', '0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1');
        animateElement.setAttribute('calcMode', 'spline');
        
        // Append the animate element to the path
        path.appendChild(animateElement);
        
        // Append the path to the SVG
        svgBlob.appendChild(path);
        
        // Append SVG to the about section
        aboutSection.appendChild(svgBlob);
    });
}

/**
 * Create and animate tech-related SVG icons for the Skills section
 */
function createTechIcons() {
    const skillsSection = document.querySelector('#skills .section-bg-animation');
    if (!skillsSection) return;
    
    // Define tech icons with SVG paths
    const techIcons = [
        {
            id: 'python-icon',
            position: { top: '10%', right: '15%' },
            size: { width: '80px', height: '80px' },
            viewBox: '0 0 128 128',
            paths: [
                {
                    d: 'M49.33 62h29.159c8.117 0 14.511-6.868 14.511-15.019v-27.798c0-7.912-6.632-13.856-14.555-15.176-5.014-.835-10.195-1.215-15.187-1.191-4.99.023-9.612.448-13.805 1.191-12.355 2.181-14.453 6.751-14.453 15.176v10.817h29v4h-40.224c-8.484 0-15.914 5.108-18.237 14.811-2.681 11.12-2.8 17.919 0 29.53 2.075 8.642 7.03 14.659 15.515 14.659h9.946v-13.048c0-9.637 8.428-17.952 18.33-17.952zm-1.838-39.11c-3.026 0-5.478-2.479-5.478-5.545 0-3.079 2.451-5.581 5.478-5.581 3.015 0 5.479 2.502 5.479 5.581-.001 3.066-2.465 5.545-5.479 5.545zM122.281 48.811c-2.098-8.448-6.103-14.811-14.599-14.811h-10.682v12.981c0 10.05-8.794 18.019-18.511 18.019h-29.159c-7.988 0-14.33 7.326-14.33 15.326v27.8c0 7.91 6.745 12.564 14.462 14.834 9.242 2.717 17.994 3.208 29.051 0 7.349-2.129 14.487-6.411 14.487-14.834v-11.126h-29v-4h43.682c8.484 0 11.647-5.776 14.599-14.66 3.047-9.145 2.916-17.799 0-29.529zm-41.955 55.606c3.027 0 5.479 2.479 5.479 5.547 0 3.076-2.451 5.579-5.479 5.579-3.015 0-5.478-2.502-5.478-5.579 0-3.068 2.463-5.547 5.478-5.547z',
                    fill: 'rgba(42, 157, 143, 0.15)'
                }
            ],
            animation: 'floatIcon 15s infinite alternate ease-in-out'
        },
        {
            id: 'db-icon',
            position: { bottom: '15%', left: '10%' },
            size: { width: '70px', height: '70px' },
            viewBox: '0 0 24 24',
            paths: [
                {
                    d: 'M12 3C7.58 3 4 4.79 4 7V17C4 19.21 7.59 21 12 21S20 19.21 20 17V7C20 4.79 16.42 3 12 3M12 5C16.41 5 18 6.69 18 7S16.41 9 12 9 6 8.31 6 7 7.59 5 12 5M12 11C16.41 11 18 12.69 18 13S16.41 15 12 15 6 14.31 6 13 7.59 11 12 11M12 17C16.41 17 18 18.69 18 19S16.41 21 12 21 6 20.31 6 19 7.59 17 12 17Z',
                    fill: 'rgba(42, 157, 143, 0.15)'
                }
            ],
            animation: 'floatIcon 12s infinite alternate-reverse ease-in-out 2s'
        },
        {
            id: 'chart-icon',
            position: { top: '30%', left: '15%' },
            size: { width: '60px', height: '60px' },
            viewBox: '0 0 24 24',
            paths: [
                {
                    d: 'M22,21H2V3H4V19H22V21M5,17L8.5,12.5L11,15.5L14.5,11L19,17H5Z',
                    fill: 'rgba(233, 196, 106, 0.15)'
                }
            ],
            animation: 'floatIcon 10s infinite alternate ease-in-out 1s'
        },
        {
            id: 'map-icon',
            position: { top: '60%', right: '10%' },
            size: { width: '75px', height: '75px' },
            viewBox: '0 0 24 24',
            paths: [
                {
                    d: 'M15,19L9,16.89V5L15,7.11V19M20.5,3C20.44,3 20.39,3 20.34,3L15,5.1L9,3L3.36,4.9C3.15,4.97 3,5.15 3,5.38V20.5A0.5,0.5 0 0,0 3.5,21C3.55,21 3.61,21 3.66,20.97L9,18.9L15,21L20.64,19.1C20.85,19 21,18.85 21,18.62V3.5A0.5,0.5 0 0,0 20.5,3Z',
                    fill: 'rgba(231, 111, 81, 0.15)'
                }
            ],
            animation: 'floatIcon 18s infinite alternate-reverse ease-in-out'
        }
    ];
    
    techIcons.forEach(icon => {
        // Create SVG element
        const svgIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svgIcon.setAttribute('viewBox', icon.viewBox);
        svgIcon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        svgIcon.classList.add('tech-svg');
        svgIcon.id = icon.id;
        svgIcon.style.position = 'absolute';
        
        // Set positioning
        if (icon.position.top) svgIcon.style.top = icon.position.top;
        if (icon.position.right) svgIcon.style.right = icon.position.right;
        if (icon.position.bottom) svgIcon.style.bottom = icon.position.bottom;
        if (icon.position.left) svgIcon.style.left = icon.position.left;
        
        // Set size
        svgIcon.style.width = icon.size.width;
        svgIcon.style.height = icon.size.height;
        
        // Set animation
        svgIcon.style.animation = icon.animation;
        
        // Add paths
        icon.paths.forEach(pathData => {
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.classList.add('tech-path');
            path.setAttribute('d', pathData.d);
            if (pathData.fill) path.setAttribute('fill', pathData.fill);
            
            // Append the path to the SVG
            svgIcon.appendChild(path);
        });
        
        // Append SVG to the skills section
        skillsSection.appendChild(svgIcon);
    });
}

/**
 * Create floating code snippets with syntax highlighting
 */
function createFloatingCodeSnippets() {
    // Define code snippets for different sections
    const codeSnippets = [
        {
            section: '#about',
            snippets: [
                {
                    language: 'python',
                    code: 'def analyze_spatial_data(dataset):\n    # Process geospatial features\n    features = extract_features(dataset)\n    return spatial_model.predict(features)',
                    position: { top: '25%', right: '10%' }
                }
            ]
        },
        {
            section: '#skills',
            snippets: [
                {
                    language: 'sql',
                    code: 'SELECT st_distance(\n    geometry,\n    ST_SetSRID(ST_Point(-74.0060, 40.7128), 4326)\n) as dist\nFROM spatial_data\nORDER BY dist\nLIMIT 10;',
                    position: { bottom: '20%', right: '5%' }
                },
                {
                    language: 'javascript',
                    code: 'const map = L.map("mapContainer")\n    .setView([51.505, -0.09], 13);\n\nL.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")\n    .addTo(map);',
                    position: { top: '15%', left: '5%' }
                }
            ]
        },
        {
            section: '#projects',
            snippets: [
                {
                    language: 'r',
                    code: 'library(sf)\nlibrary(ggplot2)\n\n# Create spatial visualization\nggplot(data) +\n  geom_sf(aes(fill = temperature)) +\n  scale_fill_viridis_c() +\n  theme_minimal()',
                    position: { top: '30%', left: '8%' }
                }
            ]
        }
    ];
    
    // Create and append code snippets
    codeSnippets.forEach(sectionSnippets => {
        const section = document.querySelector(`${sectionSnippets.section} .section-bg-animation`);
        if (!section) return;
        
        sectionSnippets.snippets.forEach(snippet => {
            // Create container
            const snippetContainer = document.createElement('div');
            snippetContainer.classList.add('floating-code-snippet');
            snippetContainer.classList.add(`${snippet.language}-snippet`);
            
            // Set positioning
            if (snippet.position.top) snippetContainer.style.top = snippet.position.top;
            if (snippet.position.right) snippetContainer.style.right = snippet.position.right;
            if (snippet.position.bottom) snippetContainer.style.bottom = snippet.position.bottom;
            if (snippet.position.left) snippetContainer.style.left = snippet.position.left;
            
            // Set random rotation for a casual look
            const rotation = Math.random() * 6 - 3; // -3 to 3 degrees
            snippetContainer.style.transform = `rotate(${rotation}deg)`;
            
            // Different animation delay for each snippet
            const delay = Math.random() * 5;
            snippetContainer.style.animationDelay = `${delay}s`;
            
            // Create pre and code elements
            const pre = document.createElement('pre');
            const code = document.createElement('code');
            code.classList.add(snippet.language);
            code.textContent = snippet.code;
            
            // Add header with language name
            const header = document.createElement('div');
            header.classList.add('snippet-header');
            
            const langBadge = document.createElement('span');
            langBadge.classList.add('lang-badge');
            langBadge.textContent = snippet.language.toUpperCase();
            
            header.appendChild(langBadge);
            snippetContainer.appendChild(header);
            
            // Assemble the snippet
            pre.appendChild(code);
            snippetContainer.appendChild(pre);
            
            // Append to section
            section.appendChild(snippetContainer);
        });
    });
}

/**
 * Create decorative SVG elements for different sections
 */
function createDecorativeSVGElements() {
    // Projects section polygon decorations
    const projectsSection = document.querySelector('#projects .section-bg-animation');
    if (projectsSection) {
        const polygons = [
            {
                points: "0,0 50,25 50,75 0,100",
                position: { top: '10%', left: '5%' },
                size: { width: '100px', height: '200px' },
                fill: 'rgba(42, 157, 143, 0.05)',
                animation: 'rotatePolygon 20s infinite linear'
            },
            {
                points: "0,0 100,0 100,100 0,100",
                position: { top: '50%', right: '10%' },
                size: { width: '150px', height: '150px' },
                fill: 'rgba(233, 196, 106, 0.05)',
                animation: 'floatPolygon 15s infinite alternate ease-in-out'
            },
            {
                points: "50,0 100,50 50,100 0,50",
                position: { bottom: '15%', left: '15%' },
                size: { width: '120px', height: '120px' },
                fill: 'rgba(231, 111, 81, 0.05)',
                animation: 'rotatePolygon 25s infinite linear reverse'
            }
        ];
        
        polygons.forEach((poly, index) => {
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('viewBox', '0 0 100 100');
            svg.style.position = 'absolute';
            svg.style.width = poly.size.width;
            svg.style.height = poly.size.height;
            
            // Set position
            if (poly.position.top) svg.style.top = poly.position.top;
            if (poly.position.right) svg.style.right = poly.position.right;
            if (poly.position.bottom) svg.style.bottom = poly.position.bottom;
            if (poly.position.left) svg.style.left = poly.position.left;
            
            // Set animation
            svg.style.animation = poly.animation;
            
            // Create polygon
            const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
            polygon.setAttribute('points', poly.points);
            polygon.setAttribute('fill', poly.fill);
            polygon.classList.add('decorative-polygon');
            
            svg.appendChild(polygon);
            projectsSection.appendChild(svg);
        });
    }
    
    // Contact section wave SVG
    const contactSection = document.querySelector('#contact .section-bg-animation');
    if (contactSection) {
        const waveSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        waveSvg.setAttribute('viewBox', '0 0 1440 320');
        waveSvg.classList.add('wave-svg');
        waveSvg.style.position = 'absolute';
        waveSvg.style.bottom = '0';
        waveSvg.style.left = '0';
        waveSvg.style.width = '100%';
        waveSvg.style.height = '200px';
        
        // Create multiple wave paths with different opacity and animation
        const waves = [
            {
                d: "M0,192L48,202.7C96,213,192,235,288,229.3C384,224,480,192,576,181.3C672,171,768,181,864,186.7C960,192,1056,192,1152,170.7C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                fill: 'rgba(42, 157, 143, 0.1)',
                animation: 'moveWave 25s linear infinite'
            },
            {
                d: "M0,224L48,213.3C96,203,192,181,288,154.7C384,128,480,96,576,106.7C672,117,768,171,864,176C960,181,1056,139,1152,144C1248,149,1344,203,1392,229.3L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                fill: 'rgba(42, 157, 143, 0.05)',
                animation: 'moveWave 20s linear infinite reverse'
            },
            {
                d: "M0,256L48,261.3C96,267,192,277,288,261.3C384,245,480,203,576,186.7C672,171,768,181,864,192C960,203,1056,213,1152,208C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                fill: 'rgba(42, 157, 143, 0.15)',
                animation: 'moveWave 30s linear infinite'
            }
        ];
        
        waves.forEach((wave, index) => {
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', wave.d);
            path.setAttribute('fill', wave.fill);
            path.style.animation = wave.animation;
            path.style.animationDelay = `${index * 0.5}s`;
            
            waveSvg.appendChild(path);
        });
        
        contactSection.appendChild(waveSvg);
    }
}

/**
 * Enhance the experience timeline with SVG elements
 */
function enhanceExperienceTimeline() {
    const timelinePath = document.querySelector('.experience-path');
    if (!timelinePath) return;
    
    // Create animated dots along the timeline
    const dots = document.querySelectorAll('.experience-dot');
    dots.forEach((dot, index) => {
        // Add pulsing animation with delay based on index
        dot.style.animation = `dotPulse 2s ease-in-out infinite`;
        dot.style.animationDelay = `${index * 0.5}s`;
    });
    
    // Create connecting arcs between timeline dots and experience cards
    const experienceItems = document.querySelectorAll('.experience-item');
    experienceItems.forEach((item, index) => {
        if (index < dots.length) {
            const dot = dots[index];
            const dotRect = dot.getBoundingClientRect();
            const itemRect = item.getBoundingClientRect();
            
            // Create SVG element for connector
            const connectorSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            connectorSvg.style.position = 'absolute';
            connectorSvg.style.top = '0';
            connectorSvg.style.left = '0';
            connectorSvg.style.width = '100%';
            connectorSvg.style.height = '100%';
            connectorSvg.style.pointerEvents = 'none';
            connectorSvg.style.zIndex = '1';
            
            // Create path for connector
            const connector = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            connector.classList.add('experience-connector');
            connector.style.fill = 'none';
            connector.style.stroke = 'var(--primary-color, #2a9d8f)';
            connector.style.strokeWidth = '2';
            connector.style.strokeDasharray = '4,4';
            connector.style.opacity = '0.6';
            
            // Add path data attribute
            connector.setAttribute('d', `M ${dotRect.x + dotRect.width/2} ${dotRect.y + dotRect.height/2} 
                                      C ${dotRect.x + 50} ${dotRect.y + dotRect.height/2}, 
                                        ${itemRect.x - 20} ${itemRect.y + itemRect.height/2}, 
                                        ${itemRect.x} ${itemRect.y + itemRect.height/2}`);
            
            // Add animation for dashed line flow
            connector.style.animation = 'dashFlow 30s linear infinite';
            
            connectorSvg.appendChild(connector);
            document.querySelector('.experience-timeline-wrapper').appendChild(connectorSvg);
        }
    });
}

/**
 * Add these keyframes animations to the document
 */
function addKeyframeAnimations() {
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.textContent = `
        @keyframes moveWave {
            0% { transform: translateX(-25%); }
            100% { transform: translateX(25%); }
        }
        
        @keyframes rotatePolygon {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        @keyframes floatPolygon {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes dashFlow {
            to { stroke-dashoffset: -100; }
        }
        
        @keyframes dotPulse {
            0%, 100% { opacity: 0.8; r: 3; fill: white; }
            50% { opacity: 1; r: 5; fill: var(--primary-color, #2a9d8f); }
        }
        
        /* Floating code snippet styles */
        .floating-code-snippet {
            position: absolute;
            background-color: rgba(30, 30, 30, 0.8);
            border-radius: 8px;
            padding: 0;
            font-family: 'Courier New', monospace;
            font-size: 10px;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
            z-index: 1;
            max-width: 250px;
            animation: floatSnippet 15s infinite ease-in-out;
            opacity: 0.6;
            pointer-events: none;
        }
        
        .floating-code-snippet pre {
            margin: 0;
            padding: 10px;
            overflow: hidden;
        }
        
        .floating-code-snippet code {
            color: #f8f8f2;
        }
        
        .snippet-header {
            background-color: rgba(42, 157, 143, 0.3);
            padding: 5px 10px;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .lang-badge {
            background-color: rgba(42, 157, 143, 0.8);
            color: white;
            font-size: 8px;
            padding: 2px 6px;
            border-radius: 4px;
            font-weight: bold;
        }
        
        /* Language-specific colors */
        .python-snippet .lang-badge { background-color: #306998; }
        .sql-snippet .lang-badge { background-color: #f29111; }
        .javascript-snippet .lang-badge { background-color: #f0db4f; color: #323330; }
        .r-snippet .lang-badge { background-color: #1f65b7; }
        
        @keyframes floatSnippet {
            0%, 100% { transform: translateY(0) rotate(var(--rotation, 0deg)); }
            50% { transform: translateY(-15px) rotate(calc(var(--rotation, 0deg) + 2deg)); }
        }
    `;
    
    document.head.appendChild(styleSheet);
}

// Initialize keyframe animations
document.addEventListener('DOMContentLoaded', addKeyframeAnimations);