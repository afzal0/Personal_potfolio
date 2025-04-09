from flask import Flask, render_template, url_for
import json
import os

app = Flask(__name__)
app.secret_key = 'geoinformatics_data_science_portfolio'

# Load data from JSON files
def load_data():
    try:
        # Load skills
        with open('portfolio/data/skills.json', 'r') as f:
            skills = json.load(f)
        
        # Load projects
        with open('portfolio/data/projects.json', 'r') as f:
            projects = json.load(f)
            
        # Load awards
        with open('portfolio/data/awards.json', 'r') as f:
            awards = json.load(f)
            
        # Load education
        with open('portfolio/data/education.json', 'r') as f:
            education = json.load(f)
            
        # Load experience
        with open('portfolio/data/experience.json', 'r') as f:
            experience = json.load(f)
            
        return skills, projects, awards, education, experience
    except FileNotFoundError:
        # Return default data if files not found
        return default_data()

# Default data for portfolio
def default_data():
    skills = {
        "technical": [
            {"name": "Python", "level": 95},
            {"name": "R", "level": 90},
            {"name": "SQL", "level": 92},
            {"name": "ETL Pipelines", "level": 88},
            {"name": "Data Engineering", "level": 85},
            {"name": "Spatial Analysis", "level": 94},
            {"name": "Bayesian Statistics", "level": 82},
            {"name": "Machine Learning", "level": 85},
            {"name": "Cloud Computing (AWS/Azure)", "level": 87},
            {"name": "RESTful APIs", "level": 84}
        ],
        "software": [
            {"name": "ArcGIS", "level": 92},
            {"name": "QGIS", "level": 90},
            {"name": "Power BI", "level": 88},
            {"name": "Tableau", "level": 85},
            {"name": "Flask", "level": 89},
            {"name": "PostgreSQL", "level": 87},
            {"name": "Chart.js", "level": 90},
            {"name": "Tesseract OCR", "level": 85},
            {"name": "FAISS", "level": 82},
            {"name": "Jenkins", "level": 80}
        ]
    }
    
    projects = [
        {
            "title": "ApplianceSense",
            "description": "AI-powered chatbot for conversational access to appliance manuals, using lightweight language models, FAISS for semantic search, and Tesseract OCR.",
            "technologies": ["FAISS", "Tesseract OCR", "Python", "Flask", "LLM Integration"],
            "image": "appliance_sense.jpg",
            "github": "https://github.com/afzal0",
            "demo": "#"
        },
        {
            "title": "PropIntel",
            "description": "Property management platform automating data ingestion with interactive dashboards for real-time insights into expenses and maintenance tasks.",
            "technologies": ["Python", "Flask", "PostgreSQL", "Chart.js", "ETL"],
            "image": "prop_intel.jpg",
            "github": "https://github.com/afzal0",
            "demo": "#"
        },
        {
            "title": "Meteorological Drivers of Influenza",
            "description": "Analysis of influenza cases alongside climate data using Spatial Bayesian Distributed Lag Non-Linear Models to quantify climate-influenza relationships.",
            "technologies": ["R", "Bayesian Statistics", "Spatial Analysis", "R Shiny"],
            "image": "influenza_study.jpg",
            "github": "https://github.com/afzal0",
            "demo": "#"
        },
        {
            "title": "Salmonella & Climate Patterns",
            "description": "32-year study investigating correlations between temperature, rainfall, floods, and Salmonella outbreaks using Bayesian spatiotemporal methods.",
            "technologies": ["R", "Bayesian Models", "GIS", "Climate Data Analysis"],
            "image": "salmonella_study.jpg",
            "github": "https://github.com/afzal0",
            "demo": "#"
        }
    ]
    
    awards = [
        {
            "title": "Sir John Monash Scholarship for Excellence",
            "organization": "Monash University",
            "year": "2023",
            "description": "Awarded for outstanding academic achievement and potential for future contributions to data science."
        },
        {
            "title": "Gold Medal for Academic Distinction",
            "organization": "TERI School of Advanced Studies",
            "year": "2022",
            "description": "Awarded for finishing at the top of the MSc Geoinformatics program with a CGPA of 9.32/10."
        },
        {
            "title": "Stellar Performer Award",
            "organization": "Precisely",
            "year": "2023",
            "description": "Recognized for exceptional contributions to data integration projects and innovative solutions."
        }
    ]
    
    education = [
        {
            "degree": "Master of Data Science",
            "institution": "Monash University",
            "location": "Sir John Monash Scholarship for Excellence",
            "years": "2023-2025",
            "description": "GPA: 3.4/4.0 - Advanced coursework in machine learning, data visualization, and statistical modeling."
        },
        {
            "degree": "Master of Science in Geoinformatics",
            "institution": "TERI School of Advanced Studies",
            "location": "Gold Medal for Academic Distinction",
            "years": "2020-2022",
            "description": "CGPA: 9.32/10 - Specialized in remote sensing, spatial analysis, and geospatial modeling."
        },
        {
            "degree": "Bachelor of Arts (Hons) in Geography",
            "institution": "Delhi University",
            "location": "Departmental Honors",
            "years": "2015-2018",
            "description": "CGPA: 8.1/10 - Multiple 3rd-place finishes in departmental rankings."
        }
    ]
    
    experience = [
        {
            "title": "Project Lead Developer (Data & Analytics)",
            "company": "A8 Consulting Pty Ltd",
            "location": "Melbourne, Australia",
            "years": "Feb 2025-Present",
            "description": "Leading the development of data analytics solutions, ETL pipelines, and integration of geospatial technologies for diverse clients.",
            "achievements": [
                "Architected Python-based applications on Azure and Heroku with microservices architecture",
                "Engineered dynamic Power BI dashboards using advanced DAX calculations and spatial visualizations",
                "Implemented data governance best practices and optimized database schema updates"
            ]
        },
        {
            "title": "Customer Service Representative (Data-Focused)",
            "company": "Arisit",
            "location": "Melbourne, Australia",
            "years": "May 2024-Mar 2025",
            "description": "Processed and analyzed warranty claims, created Power BI dashboards, and optimized operational workflows through data analysis.",
            "achievements": [
                "Refined standard operating procedures, reducing claim resolution time",
                "Created Power BI dashboards for real-time insights into product performance",
                "Provided detailed performance reports enabling data-driven managerial decisions"
            ]
        },
        {
            "title": "Associate Software Engineer",
            "company": "Precisely",
            "location": "Delhi, India",
            "years": "Jul 2022-Jul 2023",
            "description": "Built scalable data integration solutions with Python, Jenkins, and AWS while integrating GIS capabilities with advanced analytics.",
            "achievements": [
                "Optimized large-scale ETL pipelines reducing processing times by ~30%",
                "Integrated GIS capabilities with advanced analytics for spatial data products",
                "Received Stellar Performer and multiple Lifeforce Round of Applause Awards"
            ]
        }
    ]
    
    return skills, projects, awards, education, experience

@app.route('/')
def index():
    skills, projects, awards, education, experience = load_data()
    return render_template('index.html', 
                          skills=skills,
                          projects=projects,
                          awards=awards,
                          education=education,
                          experience=experience)

@app.route('/projects')
def project_details():
    _, projects, _, _, _ = load_data()
    return render_template('projects.html', projects=projects)

@app.route('/contact')
def contact():
    return render_template('contact.html')

if __name__ == '__main__':
    # Make sure data directory exists
    data_dir = os.path.join(os.path.dirname(__file__), "data")
    if not os.path.exists(data_dir):
        os.makedirs(data_dir)
    
    # Get port from environment variable or use 5000 as default
    port = int(os.environ.get('PORT', 5000))
    
    # Run the app
    app.run(host='0.0.0.0', port=port, debug=False)