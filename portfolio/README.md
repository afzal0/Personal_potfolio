# Afzal Khan - Geoinformatics & Data Science Portfolio

A modern, dynamic portfolio website built with Flask to showcase my expertise in Geoinformatics and Data Science. This portfolio highlights my skills, projects, and professional experience in the intersection of geospatial analysis and data science.

## Features

- Responsive design that works on all devices
- Interactive visualizations using Chart.js, D3.js, and Three.js
- Animated 3D globe showing project locations with graticules (latitude/longitude grid)
- Climate data visualization with time-series analysis
- Geospatial heatmap for health district analysis
- Urban growth simulation using spatial modeling
- Dynamic skill bars and project filtering
- Dark mode toggle
- Particle.js background animations
- GSAP animations for smooth transitions
- Detailed project case studies

## Technology Stack

- **Backend**: Flask (Python)
- **Frontend**: HTML5, CSS3, JavaScript
- **Visualization**: 
  - D3.js for advanced data visualizations
  - THREE.js for 3D globe visualization
  - Chart.js for responsive charts
- **Animation**: 
  - GSAP (GreenSock Animation Platform) for smooth transitions
  - AOS (Animate on Scroll) for scroll-based animations
  - Particles.js for interactive backgrounds
- **Design**: Modern UI with responsive layout and accessibility features

## Project Structure

```
portfolio/
│
├── app.py                      # Flask application
├── static/                     # Static files
│   ├── css/                    # CSS stylesheets
│   │   └── style.css           # Main stylesheet
│   ├── js/                     # JavaScript files
│   │   ├── main.js             # Main JavaScript functionality
│   │   └── geovisualization.js # Advanced GIS visualizations
│   └── images/                 # Images and media
│
├── templates/                  # HTML templates
│   ├── index.html              # Main portfolio page
│   ├── projects.html           # Detailed project case studies
│   └── contact.html            # Contact page
│
└── data/                       # JSON data files
    ├── skills.json             # Technical and software skills
    ├── projects.json           # GIS and Data Science projects
    ├── awards.json             # Honors and awards
    ├── education.json          # Academic background
    └── experience.json         # Professional experience
```

## Setup & Running Locally

1. Clone the repository
2. Install dependencies:
   ```
   pip install -r portfolio/requirements.txt
   ```
3. Run the application:
   ```
   python -m portfolio.app
   ```
4. Open http://127.0.0.1:5000 in your browser

## Customization

The portfolio is designed to be easily customizable:

- Update JSON files in the `data/` directory to change content
- Modify CSS in `static/css/style.css` to change styling
- Update images in the `static/images/` directory

## Visualizations

The portfolio features several advanced data visualizations focusing on geospatial and data science themes:

1. **Interactive 3D Globe**: A WebGL-powered globe showing project locations with latitude/longitude grid lines (graticules) and animated connections between related projects.

2. **Climate Visualization**: Interactive time-series visualization of climate factors and disease patterns from a 32-year Salmonella study, with annotations for major climate events.

3. **Geospatial Heatmap**: Heat map visualization of health district data across New South Wales, Australia, showing the distribution of influenza cases.

4. **Urban Growth Simulation**: Interactive cellular automaton model demonstrating spatial urban development patterns, with factors like roads, water bodies, and existing settlements.

## Future Enhancements

- Add a blog section for technical articles and research findings
- Implement an admin dashboard for easier content management
- Add more complex data visualizations including satellite imagery analysis
- Integrate a contact form backend with email functionality
- Add project filtering by technology and category
- Implement a portfolio PDF download feature