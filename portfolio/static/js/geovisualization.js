// GeoVisualization.js - Advanced GIS and Data Science Visualizations

document.addEventListener('DOMContentLoaded', function() {
    // Initialize 3D globe for hero background
    // The visualizations are now integrated into the hero section
    // and not as separate sections
});

// 3D Interactive Globe with Data Points
function initGlobe() {
    const container = document.getElementById('globe-container');
    
    // Create scene
    const scene = new THREE.Scene();
    
    // Create camera with wider field of view
    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 220;
    
    // Create renderer with improved settings
    const renderer = new THREE.WebGLRenderer({ 
        antialias: true, 
        alpha: true,
        precision: 'highp'
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    
    // Create Earth
    const earthGroup = new THREE.Group();
    scene.add(earthGroup);
    
    // Earth geometry with higher detail
    const earthGeometry = new THREE.SphereGeometry(100, 64, 64);
    
    // Earth material with enhanced appearance
    const earthMaterial = new THREE.MeshPhongMaterial({
        color: 0x2244aa,
        shininess: 15,
        transparent: true,
        opacity: 0.9,
        specular: 0x333333
    });
    
    // Try to load texture if available
    const textureLoader = new THREE.TextureLoader();
    try {
        // Load earth texture map
        textureLoader.load('https://raw.githubusercontent.com/turban/webgl-earth/master/images/2_no_clouds_4k.jpg', 
            function(texture) {
                earthMaterial.map = texture;
                earthMaterial.needsUpdate = true;
            }
        );
        
        // Load bump map for topography
        textureLoader.load('https://raw.githubusercontent.com/turban/webgl-earth/master/images/elev_bump_4k.jpg', 
            function(texture) {
                earthMaterial.bumpMap = texture;
                earthMaterial.bumpScale = 0.5;
                earthMaterial.needsUpdate = true;
            }
        );
        
        // Load specular map for oceans
        textureLoader.load('https://raw.githubusercontent.com/turban/webgl-earth/master/images/water_4k.png', 
            function(texture) {
                earthMaterial.specularMap = texture;
                earthMaterial.needsUpdate = true;
            }
        );
    } catch (e) {
        console.log("Unable to load earth textures:", e);
    }
    
    const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
    earthGroup.add(earthMesh);
    
    // Add latitude/longitude grid lines (graticule)
    const graticuleGroup = new THREE.Group();
    earthGroup.add(graticuleGroup);
    
    const lineMaterial = new THREE.LineBasicMaterial({
        color: 0xaaaaaa,
        transparent: true,
        opacity: 0.3
    });
    
    // Create latitude lines
    for (let lat = -80; lat <= 80; lat += 20) {
        const radius = Math.cos(Math.abs(lat) * Math.PI / 180) * 100;
        const height = Math.sin(lat * Math.PI / 180) * 100;
        
        const latitudeGeometry = new THREE.CircleGeometry(radius, 64);
        latitudeGeometry.vertices.shift(); // Remove center vertex
        const latitudeLine = new THREE.LineLoop(latitudeGeometry, lineMaterial);
        latitudeLine.rotation.x = Math.PI / 2;
        latitudeLine.position.y = height;
        graticuleGroup.add(latitudeLine);
    }
    
    // Create longitude lines
    for (let lng = 0; lng < 360; lng += 20) {
        const points = [];
        for (let lat = -90; lat <= 90; lat += 5) {
            const phi = (90 - lat) * Math.PI / 180;
            const theta = lng * Math.PI / 180;
            
            points.push(new THREE.Vector3(
                -100 * Math.sin(phi) * Math.cos(theta),
                100 * Math.cos(phi),
                100 * Math.sin(phi) * Math.sin(theta)
            ));
        }
        
        const longitudeGeometry = new THREE.BufferGeometry().setFromPoints(points);
        const longitudeLine = new THREE.Line(longitudeGeometry, lineMaterial);
        graticuleGroup.add(longitudeLine);
    }
    
    // Add atmosphere glow effect
    const atmosphereGeometry = new THREE.SphereGeometry(100, 64, 64);
    const atmosphereMaterial = new THREE.ShaderMaterial({
        uniforms: {},
        vertexShader: `
            varying vec3 vNormal;
            void main() {
                vNormal = normalize(normalMatrix * normal);
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            varying vec3 vNormal;
            void main() {
                float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
                gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * intensity;
            }
        `,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true
    });
    
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    atmosphere.scale.set(1.1, 1.1, 1.1);
    earthGroup.add(atmosphere);
    
    // Add ambient light for overall illumination
    const ambientLight = new THREE.AmbientLight(0x333333);
    scene.add(ambientLight);
    
    // Add directional light for sun-like lighting
    const sunLight = new THREE.DirectionalLight(0xffffff, 1);
    sunLight.position.set(5, 3, 5);
    scene.add(sunLight);
    
    // Project data points with categorical coloring and size variation
    const projectTypes = {
        "data_science": { color: 0xe63946, size: 1.2 },
        "gis": { color: 0x43aa8b, size: 1.0 },
        "climate": { color: 0xf9c74f, size: 1.4 },
        "research": { color: 0x4361ee, size: 1.1 }
    };
    
    // Sample project data points with type classification
    const projectLocations = [
        { lat: 40.7128, lng: -74.0060, name: "ApplianceSense Development", type: "data_science" },
        { lat: 28.6139, lng: 77.2090, name: "GIS Analysis Project", type: "gis" },
        { lat: -33.8688, lng: 151.2093, name: "Meteorological Influenza Study", type: "climate" },
        { lat: 51.5074, lng: -0.1278, name: "Spatial Data Integration", type: "data_science" },
        { lat: 48.8566, lng: 2.3522, name: "PropIntel Platform Launch", type: "data_science" },
        { lat: -37.8136, lng: 144.9631, name: "Climate Pattern Analysis", type: "climate" },
        { lat: 19.0760, lng: 72.8777, name: "Geospatial Mapping Project", type: "gis" },
        { lat: 35.6762, lng: 139.6503, name: "Urban Growth Study", type: "research" },
        { lat: 22.3964, lng: 114.1095, name: "Transportation Network Analysis", type: "gis" },
        { lat: -22.9068, lng: -43.1729, name: "Ecological Monitoring", type: "climate" },
        { lat: 55.7558, lng: 37.6173, name: "Data Pipeline Architecture", type: "data_science" },
        { lat: 1.3521, lng: 103.8198, name: "Smart City Initiative", type: "research" }
    ];
    
    // Create project points with improved visuals
    projectLocations.forEach(location => {
        const typeInfo = projectTypes[location.type];
        
        // Create point geometry based on project type
        const pointGeometry = new THREE.SphereGeometry(0.8 * typeInfo.size, 16, 16);
        const pointMaterial = new THREE.MeshPhongMaterial({ 
            color: typeInfo.color,
            emissive: typeInfo.color,
            emissiveIntensity: 0.3,
            shininess: 30
        });
        
        const point = new THREE.Mesh(pointGeometry, pointMaterial);
        
        // Convert lat/lng to 3D position
        const phi = (90 - location.lat) * (Math.PI / 180);
        const theta = (location.lng + 180) * (Math.PI / 180);
        
        const x = -(100 * Math.sin(phi) * Math.cos(theta));
        const y = (100 * Math.cos(phi));
        const z = (100 * Math.sin(phi) * Math.sin(theta));
        
        point.position.set(x, y, z);
        
        // Add pulsing animation effect
        const pulseAnimation = (time) => {
            const scale = 1 + 0.1 * Math.sin(time * 2 + location.lat * 0.1);
            point.scale.set(scale, scale, scale);
        };
        
        // Store animation function and project data
        point.userData = {
            animation: pulseAnimation,
            projectInfo: location
        };
        
        // Add glow effect
        const glowGeometry = new THREE.SphereGeometry(1.5 * typeInfo.size, 16, 16);
        const glowMaterial = new THREE.ShaderMaterial({
            uniforms: {
                glowColor: { value: new THREE.Color(typeInfo.color) }
            },
            vertexShader: `
                varying vec3 vPosition;
                void main() {
                    vPosition = normalize(position);
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform vec3 glowColor;
                varying vec3 vPosition;
                void main() {
                    float intensity = pow(0.7 - dot(vPosition, vec3(0.0, 0.0, 1.0)), 2.0);
                    gl_FragColor = vec4(glowColor, 1.0) * intensity;
                }
            `,
            side: THREE.BackSide,
            blending: THREE.AdditiveBlending,
            transparent: true
        });
        
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        point.add(glow);
        
        earthMesh.add(point);
    });
    
    // Create data arcs connecting related points
    const connectionPairs = [
        [0, 3], [1, 6], [2, 9], [4, 7], [5, 8], [10, 11]
    ];
    
    connectionPairs.forEach(pair => {
        const startLocation = projectLocations[pair[0]];
        const endLocation = projectLocations[pair[1]];
        
        // Convert start lat/lng to 3D position
        const startPhi = (90 - startLocation.lat) * (Math.PI / 180);
        const startTheta = (startLocation.lng + 180) * (Math.PI / 180);
        
        const startX = -(100 * Math.sin(startPhi) * Math.cos(startTheta));
        const startY = (100 * Math.cos(startPhi));
        const startZ = (100 * Math.sin(startPhi) * Math.sin(startTheta));
        
        // Convert end lat/lng to 3D position
        const endPhi = (90 - endLocation.lat) * (Math.PI / 180);
        const endTheta = (endLocation.lng + 180) * (Math.PI / 180);
        
        const endX = -(100 * Math.sin(endPhi) * Math.cos(endTheta));
        const endY = (100 * Math.cos(endPhi));
        const endZ = (100 * Math.sin(endPhi) * Math.sin(endTheta));
        
        // Create arc between points
        const start = new THREE.Vector3(startX, startY, startZ);
        const end = new THREE.Vector3(endX, endY, endZ);
        
        // Find midpoint and pull it out to create an arc
        const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
        const midLength = mid.length();
        mid.normalize().multiplyScalar(midLength * 1.3); // Pull outward
        
        // Create a smooth curve through the three points
        const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
        
        // Generate points along the curve
        const points = curve.getPoints(50);
        
        // Create arc geometry
        const arcGeometry = new THREE.BufferGeometry().setFromPoints(points);
        
        // Create gradient material
        const startColor = new THREE.Color(projectTypes[startLocation.type].color);
        const endColor = new THREE.Color(projectTypes[endLocation.type].color);
        
        const arcMaterial = new THREE.LineDashedMaterial({
            color: 0xffffff,
            linewidth: 2,
            scale: 1,
            dashSize: 3,
            gapSize: 1,
            opacity: 0.7,
            transparent: true
        });
        
        const arc = new THREE.Line(arcGeometry, arcMaterial);
        arc.computeLineDistances(); // Required for dashed lines
        
        // Create arc animation
        const arcAnimation = (time) => {
            arcMaterial.dashOffset = time * 0.1;
        };
        
        // Store animation function
        arc.userData = { animation: arcAnimation };
        
        earthGroup.add(arc);
    });
    
    // Controls for interactive viewing
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.5;
    controls.minDistance = 120;
    controls.maxDistance = 400;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    
    // Handle window resize
    window.addEventListener('resize', function() {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
    
    // Raycaster for point interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    
    // Tooltip for displaying project information
    const tooltip = document.createElement('div');
    tooltip.className = 'globe-tooltip';
    tooltip.style.position = 'absolute';
    tooltip.style.display = 'none';
    tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    tooltip.style.color = 'white';
    tooltip.style.padding = '10px';
    tooltip.style.borderRadius = '4px';
    tooltip.style.fontSize = '14px';
    tooltip.style.zIndex = '100';
    tooltip.style.pointerEvents = 'none';
    container.appendChild(tooltip);
    
    // Mouse move event for tooltip
    container.addEventListener('mousemove', function(event) {
        // Calculate mouse position in normalized device coordinates (-1 to +1)
        const rect = container.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / container.clientWidth) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / container.clientHeight) * 2 + 1;
        
        // Update tooltip position
        tooltip.style.left = (event.clientX - rect.left + 10) + 'px';
        tooltip.style.top = (event.clientY - rect.top + 10) + 'px';
    });
    
    // Clock for time-based animations
    const clock = new THREE.Clock();
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        const time = clock.getElapsedTime();
        
        // Update controls
        controls.update();
        
        // Update all animations
        earthMesh.children.forEach(point => {
            if (point.userData && point.userData.animation) {
                point.userData.animation(time);
            }
        });
        
        earthGroup.children.forEach(child => {
            if (child.userData && child.userData.animation) {
                child.userData.animation(time);
            }
        });
        
        // Raycasting for interactivity
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(earthMesh.children, true);
        
        if (intersects.length > 0) {
            // Get the first intersected object
            let point = intersects[0].object;
            
            // Go up the parent hierarchy if needed to find the point with userData
            while (point && (!point.userData || !point.userData.projectInfo)) {
                point = point.parent;
            }
            
            if (point && point.userData && point.userData.projectInfo) {
                // Show tooltip with project info
                const project = point.userData.projectInfo;
                tooltip.innerHTML = `
                    <strong>${project.name}</strong><br>
                    Type: ${project.type.replace('_', ' ')}<br>
                    Location: ${project.lat.toFixed(2)}, ${project.lng.toFixed(2)}
                `;
                tooltip.style.display = 'block';
                
                // Highlight the point
                point.scale.set(1.5, 1.5, 1.5);
            }
        } else {
            // Hide tooltip if no intersection
            tooltip.style.display = 'none';
            
            // Reset all points to normal scale
            earthMesh.children.forEach(point => {
                if (point.userData && point.userData.animation) {
                    // Let the animation handle the scale
                } else {
                    point.scale.set(1, 1, 1);
                }
            });
        }
        
        // Render the scene
        renderer.render(scene, camera);
    }
    
    // Start animation
    animate();
}

// Climate Visualization with D3.js
function initClimateVisualization() {
    const container = document.getElementById('climate-visualization');
    const width = container.clientWidth;
    const height = 400;
    
    // Create SVG element
    const svg = d3.select(container)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .style('background-color', '#f9f9f9')
        .style('border-radius', '8px')
        .style('overflow', 'hidden');
    
    // Generate sample climate data
    const years = Array.from({length: 32}, (_, i) => 1990 + i);
    
    const temperatureData = years.map(year => ({
        year,
        temperature: 14 + Math.sin(year * 0.2) * 0.5 + year * 0.03 - 57,
        anomaly: Math.sin(year * 0.2) * 0.5 + year * 0.03 - 0.6
    }));
    
    const rainfallData = years.map(year => ({
        year,
        rainfall: 800 + Math.sin(year * 0.3) * 100 + Math.random() * 50
    }));
    
    const salmonellaCases = years.map(year => ({
        year,
        cases: 100 + 10 * Math.sin(year * 0.5) + year * 1.5 + Math.random() * 20
    }));
    
    // Merge data
    const data = years.map(year => {
        const temp = temperatureData.find(d => d.year === year);
        const rain = rainfallData.find(d => d.year === year);
        const cases = salmonellaCases.find(d => d.year === year);
        
        return {
            year,
            temperature: temp.temperature,
            anomaly: temp.anomaly,
            rainfall: rain.rainfall,
            cases: cases.cases
        };
    });
    
    // Scales
    const xScale = d3.scaleLinear()
        .domain([d3.min(years), d3.max(years)])
        .range([50, width - 50]);
    
    const yScaleTemp = d3.scaleLinear()
        .domain([d3.min(data, d => d.temperature) - 0.5, d3.max(data, d => d.temperature) + 0.5])
        .range([height - 50, 50]);
    
    const yScaleRain = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.rainfall) * 1.2])
        .range([height - 50, 50]);
    
    const yScaleCases = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.cases) * 1.2])
        .range([height - 50, 50]);
    
    // Define axis
    const xAxis = d3.axisBottom(xScale)
        .tickFormat(d3.format('d'))
        .ticks(10);
    
    const yAxisTemp = d3.axisLeft(yScaleTemp)
        .ticks(5);
    
    const yAxisRain = d3.axisRight(yScaleRain)
        .ticks(5);
    
    // Add axis
    svg.append('g')
        .attr('transform', `translate(0, ${height - 50})`)
        .call(xAxis)
        .selectAll('text')
        .style('font-size', '10px');
    
    svg.append('g')
        .attr('transform', 'translate(50, 0)')
        .call(yAxisTemp)
        .selectAll('text')
        .style('font-size', '10px')
        .style('fill', '#e63946');
    
    svg.append('g')
        .attr('transform', `translate(${width - 50}, 0)`)
        .call(yAxisRain)
        .selectAll('text')
        .style('font-size', '10px')
        .style('fill', '#4361ee');
    
    // Add grid lines
    svg.selectAll('line.grid')
        .data(xScale.ticks(10))
        .enter()
        .append('line')
        .attr('class', 'grid')
        .attr('x1', d => xScale(d))
        .attr('y1', 50)
        .attr('x2', d => xScale(d))
        .attr('y2', height - 50)
        .style('stroke', '#ddd')
        .style('stroke-dasharray', '3,3')
        .style('stroke-width', 1);
    
    // Create line generators
    const lineTemp = d3.line()
        .x(d => xScale(d.year))
        .y(d => yScaleTemp(d.temperature))
        .curve(d3.curveMonotoneX);
    
    const lineRain = d3.line()
        .x(d => xScale(d.year))
        .y(d => yScaleRain(d.rainfall))
        .curve(d3.curveMonotoneX);
    
    const lineCases = d3.line()
        .x(d => xScale(d.year))
        .y(d => yScaleCases(d.cases))
        .curve(d3.curveMonotoneX);
    
    // Add paths with animations
    const tempPath = svg.append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', '#e63946')
        .attr('stroke-width', 2)
        .attr('d', lineTemp);
    
    const rainPath = svg.append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', '#4361ee')
        .attr('stroke-width', 2)
        .attr('d', lineRain);
    
    const casesPath = svg.append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', '#43aa8b')
        .attr('stroke-width', 2)
        .attr('d', lineCases);
    
    // Animate the paths drawing
    const tempLength = tempPath.node().getTotalLength();
    tempPath
        .attr('stroke-dasharray', tempLength)
        .attr('stroke-dashoffset', tempLength)
        .transition()
        .duration(2000)
        .ease(d3.easeLinear)
        .attr('stroke-dashoffset', 0);
    
    const rainLength = rainPath.node().getTotalLength();
    rainPath
        .attr('stroke-dasharray', rainLength)
        .attr('stroke-dashoffset', rainLength)
        .transition()
        .duration(2000)
        .ease(d3.easeLinear)
        .attr('stroke-dashoffset', 0);
    
    const casesLength = casesPath.node().getTotalLength();
    casesPath
        .attr('stroke-dasharray', casesLength)
        .attr('stroke-dashoffset', casesLength)
        .transition()
        .duration(2000)
        .ease(d3.easeLinear)
        .attr('stroke-dashoffset', 0);
    
    // Add legend
    const legend = svg.append('g')
        .attr('transform', `translate(${width - 200}, 20)`);
    
    legend.append('rect')
        .attr('width', 190)
        .attr('height', 80)
        .attr('fill', 'white')
        .attr('stroke', '#ddd')
        .attr('rx', 5);
    
    const legendItems = [
        { color: '#e63946', text: 'Temperature (°C)' },
        { color: '#4361ee', text: 'Rainfall (mm)' },
        { color: '#43aa8b', text: 'Salmonella Cases' }
    ];
    
    legendItems.forEach((item, i) => {
        const g = legend.append('g')
            .attr('transform', `translate(10, ${20 + i * 20})`);
        
        g.append('rect')
            .attr('width', 15)
            .attr('height', 3)
            .attr('fill', item.color);
        
        g.append('text')
            .attr('x', 25)
            .attr('y', 5)
            .text(item.text)
            .style('font-size', '12px');
    });
    
    // Add title and description
    svg.append('text')
        .attr('x', width / 2)
        .attr('y', 20)
        .attr('text-anchor', 'middle')
        .style('font-size', '16px')
        .style('font-weight', 'bold')
        .text('Salmonella Cases vs Climate Factors (1990-2022)');
    
    // Add annotations to highlight extreme events
    const annotations = [
        { year: 1998, text: 'El Niño Event', offset: -30 },
        { year: 2010, text: 'Flood Year', offset: 30 },
        { year: 2019, text: 'Heat Wave', offset: -20 }
    ];
    
    annotations.forEach(annotation => {
        const g = svg.append('g')
            .attr('transform', `translate(${xScale(annotation.year)}, ${height - 70})`);
        
        g.append('line')
            .attr('x1', 0)
            .attr('y1', 0)
            .attr('x2', 0)
            .attr('y2', -height + 120)
            .style('stroke', '#999')
            .style('stroke-dasharray', '2,2');
        
        g.append('text')
            .attr('x', annotation.offset)
            .attr('y', -height + 110)
            .attr('text-anchor', annotation.offset < 0 ? 'end' : 'start')
            .style('font-size', '10px')
            .style('fill', '#666')
            .text(annotation.text);
    });
    
    // Add interactive tooltip
    const tooltip = d3.select(container)
        .append('div')
        .attr('class', 'tooltip')
        .style('position', 'absolute')
        .style('visibility', 'hidden')
        .style('background-color', 'rgba(0, 0, 0, 0.7)')
        .style('color', 'white')
        .style('padding', '10px')
        .style('border-radius', '4px')
        .style('font-size', '12px')
        .style('pointer-events', 'none');
    
    // Add transparent overlay for mouse events
    const overlay = svg.append('rect')
        .attr('width', width - 100)
        .attr('height', height - 100)
        .attr('x', 50)
        .attr('y', 50)
        .style('fill', 'none')
        .style('pointer-events', 'all');
    
    // Add vertical reference line
    const verticalLine = svg.append('line')
        .attr('class', 'vertical-reference-line')
        .style('stroke', '#999')
        .style('stroke-width', 1)
        .style('stroke-dasharray', '3,3')
        .style('visibility', 'hidden');
    
    // Mouse events
    overlay
        .on('mouseover', function() {
            tooltip.style('visibility', 'visible');
            verticalLine.style('visibility', 'visible');
        })
        .on('mouseout', function() {
            tooltip.style('visibility', 'hidden');
            verticalLine.style('visibility', 'hidden');
        })
        .on('mousemove', function(event) {
            const [mouseX] = d3.pointer(event);
            const xValue = xScale.invert(mouseX + 50);
            const year = Math.round(xValue);
            
            if (year >= d3.min(years) && year <= d3.max(years)) {
                const yearData = data.find(d => d.year === year);
                
                if (yearData) {
                    // Update tooltip content
                    tooltip.html(`
                        <strong>Year: ${year}</strong><br>
                        Temperature: ${yearData.temperature.toFixed(1)}°C<br>
                        Rainfall: ${Math.round(yearData.rainfall)} mm<br>
                        Salmonella Cases: ${Math.round(yearData.cases)}
                    `);
                    
                    // Update tooltip position
                    tooltip.style('left', (event.pageX - container.getBoundingClientRect().left + 10) + 'px')
                        .style('top', (event.pageY - container.getBoundingClientRect().top - 40) + 'px');
                    
                    // Update vertical line position
                    verticalLine
                        .attr('x1', xScale(year))
                        .attr('y1', 50)
                        .attr('x2', xScale(year))
                        .attr('y2', height - 50);
                    
                    // Highlight data points
                    svg.selectAll('.highlight-point').remove();
                    
                    svg.append('circle')
                        .attr('class', 'highlight-point')
                        .attr('cx', xScale(year))
                        .attr('cy', yScaleTemp(yearData.temperature))
                        .attr('r', 5)
                        .style('fill', '#e63946');
                    
                    svg.append('circle')
                        .attr('class', 'highlight-point')
                        .attr('cx', xScale(year))
                        .attr('cy', yScaleRain(yearData.rainfall))
                        .attr('r', 5)
                        .style('fill', '#4361ee');
                    
                    svg.append('circle')
                        .attr('class', 'highlight-point')
                        .attr('cx', xScale(year))
                        .attr('cy', yScaleCases(yearData.cases))
                        .attr('r', 5)
                        .style('fill', '#43aa8b');
                }
            }
        });
}

// Geospatial Heatmap Visualization
function initGeoHeatmap() {
    const container = document.getElementById('geo-heatmap');
    const width = container.clientWidth;
    const height = 400;
    
    // Create SVG element
    const svg = d3.select(container)
        .append('svg')
        .attr('width', width)
        .attr('height', height);
    
    // Define projection - using Australia for NSW visualization
    const projection = d3.geoMercator()
        .center([146, -33]) // Center on New South Wales
        .scale(1000)
        .translate([width / 2, height / 2]);
    
    const path = d3.geoPath().projection(projection);
    
    // Define regions with mock data for Local Health Districts of NSW
    const regions = [
        { id: "SYD", name: "Sydney", center: [151.2093, -33.8688], cases: 120 },
        { id: "WSY", name: "Western Sydney", center: [150.9529, -33.8021], cases: 85 },
        { id: "SWS", name: "South Western Sydney", center: [150.8000, -34.0000], cases: 105 },
        { id: "SSY", name: "South Eastern Sydney", center: [151.1000, -34.0500], cases: 90 },
        { id: "NSY", name: "Northern Sydney", center: [151.2000, -33.7500], cases: 70 },
        { id: "HUN", name: "Hunter New England", center: [151.7000, -32.9000], cases: 65 },
        { id: "ILL", name: "Illawarra Shoalhaven", center: [150.8000, -34.4000], cases: 55 },
        { id: "WNS", name: "Western NSW", center: [148.6000, -33.2000], cases: 40 },
        { id: "FWE", name: "Far West", center: [141.5000, -32.0000], cases: 25 },
        { id: "MNC", name: "Mid North Coast", center: [152.8000, -31.5000], cases: 50 },
        { id: "NBM", name: "Nepean Blue Mountains", center: [150.5000, -33.7000], cases: 75 },
        { id: "NOR", name: "Northern NSW", center: [153.0000, -29.5000], cases: 45 },
        { id: "SNE", name: "Southern NSW", center: [149.8000, -35.5000], cases: 30 },
        { id: "MUR", name: "Murrumbidgee", center: [146.5000, -34.8000], cases: 35 },
        { id: "CCQ", name: "Central Coast", center: [151.3000, -33.4000], cases: 60 }
    ];
    
    // Define color scale for heatmap
    const colorScale = d3.scaleSequential(d3.interpolateYlOrRd)
        .domain([0, d3.max(regions, d => d.cases)]);
    
    // Load Australia GeoJSON data
    d3.json('https://raw.githubusercontent.com/rowanhogan/australian-states/master/states.min.geojson')
        .then(function(geojson) {
            // Filter for New South Wales
            const nsw = geojson.features.find(f => f.properties.STATE_NAME === "New South Wales");
            
            // Draw NSW outline
            svg.append('path')
                .datum(nsw)
                .attr('d', path)
                .attr('fill', '#f8f9fa')
                .attr('stroke', '#ccc')
                .attr('stroke-width', 0.5);
            
            // Add circles for each health district
            const healthDistricts = svg.selectAll('.health-district')
                .data(regions)
                .enter()
                .append('g')
                .attr('class', 'health-district');
            
            // Add heatmap circles with animation
            healthDistricts.append('circle')
                .attr('cx', d => projection(d.center)[0])
                .attr('cy', d => projection(d.center)[1])
                .attr('r', 0) // Start with radius 0 for animation
                .attr('fill', d => colorScale(d.cases))
                .attr('opacity', 0.7)
                .attr('stroke', '#fff')
                .attr('stroke-width', 0.5)
                .transition()
                .duration(1000)
                .attr('r', d => Math.sqrt(d.cases) * 1.5); // Scale radius by square root of cases
            
            // Add labels
            healthDistricts.append('text')
                .attr('x', d => projection(d.center)[0])
                .attr('y', d => projection(d.center)[1] + Math.sqrt(d.cases) * 1.5 + 10)
                .attr('text-anchor', 'middle')
                .attr('font-size', '8px')
                .attr('fill', '#333')
                .text(d => d.name)
                .style('opacity', 0)
                .transition()
                .delay(1000)
                .duration(500)
                .style('opacity', 1);
            
            // Add title
            svg.append('text')
                .attr('x', width / 2)
                .attr('y', 25)
                .attr('text-anchor', 'middle')
                .attr('font-size', '16px')
                .attr('font-weight', 'bold')
                .text('Influenza Cases by Local Health District');
            
            // Add legend
            const legendWidth = 200;
            const legendHeight = 15;
            const legendX = width - legendWidth - 20;
            const legendY = height - 40;
            
            const legendScale = d3.scaleLinear()
                .domain([0, d3.max(regions, d => d.cases)])
                .range([0, legendWidth]);
            
            const legendAxis = d3.axisBottom(legendScale)
                .ticks(5);
            
            // Create the color gradient for the legend
            const defs = svg.append('defs');
            
            const gradient = defs.append('linearGradient')
                .attr('id', 'legend-gradient')
                .attr('x1', '0%')
                .attr('y1', '0%')
                .attr('x2', '100%')
                .attr('y2', '0%');
            
            const colorDomain = colorScale.domain();
            
            // Add color stops to the gradient
            gradient.append('stop')
                .attr('offset', '0%')
                .attr('stop-color', colorScale(colorDomain[0]));
            
            gradient.append('stop')
                .attr('offset', '50%')
                .attr('stop-color', colorScale((colorDomain[0] + colorDomain[1]) / 2));
            
            gradient.append('stop')
                .attr('offset', '100%')
                .attr('stop-color', colorScale(colorDomain[1]));
            
            // Draw the legend rectangle with the gradient
            svg.append('rect')
                .attr('x', legendX)
                .attr('y', legendY)
                .attr('width', legendWidth)
                .attr('height', legendHeight)
                .style('fill', 'url(#legend-gradient)');
            
            // Add the legend axis
            svg.append('g')
                .attr('transform', `translate(${legendX}, ${legendY + legendHeight})`)
                .call(legendAxis)
                .selectAll('text')
                .style('font-size', '8px');
            
            svg.append('text')
                .attr('x', legendX)
                .attr('y', legendY - 5)
                .attr('font-size', '10px')
                .text('Number of Cases');
        })
        .catch(function(error) {
            console.log('Error loading GeoJSON:', error);
            
            // Fallback visualization if GeoJSON fails to load
            svg.append('text')
                .attr('x', width / 2)
                .attr('y', height / 2)
                .attr('text-anchor', 'middle')
                .text('Error loading map data. Please check the console for details.');
        });
}

// Spatial Analysis Demo
function initSpatialAnalysisDemo() {
    const container = document.getElementById('spatial-analysis-demo');
    const width = container.clientWidth;
    const height = 400;
    
    // Create canvas for WebGL rendering
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    container.appendChild(canvas);
    
    // Initialize visualization
    const ctx = canvas.getContext('2d');
    
    // Parameters for simulation
    const gridSize = 100;
    const cellSize = Math.min(width, height) / gridSize;
    
    // Create grid
    const grid = Array(gridSize).fill().map(() => Array(gridSize).fill(0));
    
    // Add some initial "seed" data
    for (let i = 0; i < 10; i++) {
        const x = Math.floor(Math.random() * gridSize);
        const y = Math.floor(Math.random() * gridSize);
        grid[x][y] = 100;
    }
    
    // Add geographical features
    // Create a river
    const riverPoints = [];
    let x = 0;
    let y = Math.floor(gridSize / 2) + Math.floor(Math.random() * 20) - 10;
    
    while (x < gridSize) {
        riverPoints.push({x, y});
        x += 1;
        y += Math.floor(Math.random() * 3) - 1;
        if (y < 0) y = 0;
        if (y >= gridSize) y = gridSize - 1;
    }
    
    // Draw river on grid
    riverPoints.forEach(point => {
        grid[point.x][point.y] = -1; // Special value for river
        
        // Make river wider in some areas
        if (Math.random() > 0.7) {
            if (point.y > 0) grid[point.x][point.y-1] = -1;
            if (point.y < gridSize-1) grid[point.x][point.y+1] = -1;
        }
    });
    
    // Create roads
    const roads = [];
    
    // Horizontal road
    const hRoadY = Math.floor(gridSize * 0.3);
    for (let x = 0; x < gridSize; x++) {
        if (grid[x][hRoadY] !== -1) { // Don't put road on river
            roads.push({x, y: hRoadY});
            grid[x][hRoadY] = -2; // Special value for road
        }
    }
    
    // Vertical road
    const vRoadX = Math.floor(gridSize * 0.7);
    for (let y = 0; y < gridSize; y++) {
        if (grid[vRoadX][y] !== -1) { // Don't put road on river
            roads.push({x: vRoadX, y});
            grid[vRoadX][y] = -2; // Special value for road
        }
    }
    
    // Add urban centers
    const urbanCenters = [
        {x: Math.floor(gridSize * 0.2), y: Math.floor(gridSize * 0.2), size: 10},
        {x: Math.floor(gridSize * 0.7), y: Math.floor(gridSize * 0.3), size: 15},
        {x: Math.floor(gridSize * 0.3), y: Math.floor(gridSize * 0.8), size: 8}
    ];
    
    urbanCenters.forEach(center => {
        for (let dx = -center.size; dx <= center.size; dx++) {
            for (let dy = -center.size; dy <= center.size; dy++) {
                const distance = Math.sqrt(dx*dx + dy*dy);
                if (distance <= center.size) {
                    const x = center.x + dx;
                    const y = center.y + dy;
                    if (x >= 0 && x < gridSize && y >= 0 && y < gridSize) {
                        if (grid[x][y] !== -1 && grid[x][y] !== -2) { // Don't override river or road
                            grid[x][y] = Math.max(0, 100 - Math.floor(distance * 8));
                        }
                    }
                }
            }
        }
    });
    
    // Simulation state
    let time = 0;
    let isPaused = false;
    
    // Create controls
    const controls = document.createElement('div');
    controls.className = 'spatial-controls';
    controls.style.marginTop = '10px';
    controls.style.textAlign = 'center';
    container.appendChild(controls);
    
    // Add title
    const title = document.createElement('h3');
    title.textContent = 'Urban Growth Simulation';
    title.style.marginBottom = '10px';
    container.insertBefore(title, canvas);
    
    // Create buttons
    const playPauseBtn = document.createElement('button');
    playPauseBtn.textContent = 'Pause';
    playPauseBtn.style.marginRight = '10px';
    playPauseBtn.style.padding = '5px 10px';
    playPauseBtn.style.backgroundColor = '#2a9d8f';
    playPauseBtn.style.color = 'white';
    playPauseBtn.style.border = 'none';
    playPauseBtn.style.borderRadius = '4px';
    playPauseBtn.style.cursor = 'pointer';
    controls.appendChild(playPauseBtn);
    
    const resetBtn = document.createElement('button');
    resetBtn.textContent = 'Reset';
    resetBtn.style.padding = '5px 10px';
    resetBtn.style.backgroundColor = '#e63946';
    resetBtn.style.color = 'white';
    resetBtn.style.border = 'none';
    resetBtn.style.borderRadius = '4px';
    resetBtn.style.cursor = 'pointer';
    controls.appendChild(resetBtn);
    
    // Event listeners
    playPauseBtn.addEventListener('click', function() {
        isPaused = !isPaused;
        playPauseBtn.textContent = isPaused ? 'Play' : 'Pause';
    });
    
    resetBtn.addEventListener('click', function() {
        time = 0;
        // Reset grid but keep rivers and roads
        for (let x = 0; x < gridSize; x++) {
            for (let y = 0; y < gridSize; y++) {
                if (grid[x][y] !== -1 && grid[x][y] !== -2) {
                    grid[x][y] = 0;
                }
            }
        }
        
        // Re-add urban centers
        urbanCenters.forEach(center => {
            for (let dx = -center.size; dx <= center.size; dx++) {
                for (let dy = -center.size; dy <= center.size; dy++) {
                    const distance = Math.sqrt(dx*dx + dy*dy);
                    if (distance <= center.size) {
                        const x = center.x + dx;
                        const y = center.y + dy;
                        if (x >= 0 && x < gridSize && y >= 0 && y < gridSize) {
                            if (grid[x][y] !== -1 && grid[x][y] !== -2) {
                                grid[x][y] = Math.max(0, 100 - Math.floor(distance * 8));
                            }
                        }
                    }
                }
            }
        });
    });
    
    // Create legend
    const legend = document.createElement('div');
    legend.className = 'spatial-legend';
    legend.style.display = 'flex';
    legend.style.justifyContent = 'center';
    legend.style.marginTop = '10px';
    container.appendChild(legend);
    
    const legendItems = [
        {color: '#2171b5', label: 'Water'},
        {color: '#636363', label: 'Roads'},
        {color: '#ffffcc', label: 'Low Density'},
        {color: '#a1dab4', label: 'Medium Density'},
        {color: '#41b6c4', label: 'High Density'},
        {color: '#225ea8', label: 'Urban Center'}
    ];
    
    legendItems.forEach(item => {
        const legendItem = document.createElement('div');
        legendItem.style.display = 'flex';
        legendItem.style.alignItems = 'center';
        legendItem.style.marginRight = '15px';
        legend.appendChild(legendItem);
        
        const colorBox = document.createElement('div');
        colorBox.style.width = '12px';
        colorBox.style.height = '12px';
        colorBox.style.backgroundColor = item.color;
        colorBox.style.marginRight = '5px';
        legendItem.appendChild(colorBox);
        
        const label = document.createElement('span');
        label.textContent = item.label;
        label.style.fontSize = '12px';
        legendItem.appendChild(label);
    });
    
    // Animation function
    function animate() {
        requestAnimationFrame(animate);
        
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        
        // Draw grid
        for (let x = 0; x < gridSize; x++) {
            for (let y = 0; y < gridSize; y++) {
                const cellValue = grid[x][y];
                
                // Set color based on cell value
                if (cellValue === -1) {
                    // River
                    ctx.fillStyle = '#2171b5';
                } else if (cellValue === -2) {
                    // Road
                    ctx.fillStyle = '#636363';
                } else {
                    // Urban density gradient
                    if (cellValue === 0) {
                        ctx.fillStyle = '#f7fcf0'; // Empty/rural
                    } else if (cellValue < 30) {
                        ctx.fillStyle = '#ffffcc'; // Low density
                    } else if (cellValue < 60) {
                        ctx.fillStyle = '#a1dab4'; // Medium density
                    } else if (cellValue < 90) {
                        ctx.fillStyle = '#41b6c4'; // High density
                    } else {
                        ctx.fillStyle = '#225ea8'; // Urban center
                    }
                }
                
                ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            }
        }
        
        // Update simulation (urban growth)
        if (!isPaused && time % 5 === 0) { // Update every 5 frames
            const newGrid = JSON.parse(JSON.stringify(grid));
            
            for (let x = 1; x < gridSize - 1; x++) {
                for (let y = 1; y < gridSize - 1; y++) {
                    if (grid[x][y] !== -1 && grid[x][y] !== -2) { // Skip river and roads
                        // Count neighbors
                        let neighborSum = 0;
                        let neighborCount = 0;
                        
                        for (let dx = -1; dx <= 1; dx++) {
                            for (let dy = -1; dy <= 1; dy++) {
                                if (dx !== 0 || dy !== 0) {
                                    const nx = x + dx;
                                    const ny = y + dy;
                                    
                                    if (grid[nx][ny] > 0) {
                                        neighborSum += grid[nx][ny];
                                        neighborCount++;
                                    }
                                    
                                    // Bonus for being near roads (infrastructure access)
                                    if (grid[nx][ny] === -2) {
                                        neighborSum += 20;
                                    }
                                    
                                    // Penalty for being near water (flood risk)
                                    if (grid[nx][ny] === -1) {
                                        neighborSum -= 10;
                                    }
                                }
                            }
                        }
                        
                        if (neighborCount > 0) {
                            // Calculate growth based on neighborhood
                            const avgNeighbor = neighborSum / (neighborCount * 2);
                            
                            // Probabilistic growth
                            if (Math.random() < avgNeighbor / 100) {
                                newGrid[x][y] = Math.min(100, grid[x][y] + 1);
                            }
                        }
                    }
                }
            }
            
            // Update grid
            for (let x = 0; x < gridSize; x++) {
                for (let y = 0; y < gridSize; y++) {
                    grid[x][y] = newGrid[x][y];
                }
            }
            
            time++;
        } else if (!isPaused) {
            time++;
        }
    }
    
    // Start animation
    animate();
}