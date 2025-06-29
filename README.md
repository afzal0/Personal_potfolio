# Mohammad Afzal Khan Portfolio

A personal portfolio website showcasing my skills in Geoinformatics and Data Science.

## Features

- Interactive portfolio with SVG animations
- Responsive design for all screen sizes
- Dynamic visualizations
- Dark mode support
- Showcases projects, skills, education, and experience

## Deployment to Heroku with Docker

### Prerequisites

- Heroku CLI installed
- Docker installed
- Git installed

### Steps to Deploy

1. Log in to Heroku CLI:
   ```
   heroku login
   ```

2. Log in to Heroku Container Registry:
   ```
   heroku container:login
   ```

3. Create a new Heroku app (if it doesn't exist):
   ```
   heroku create mohammadafzal-portfolio
   ```

4. Create a Heroku Git remote:
   ```
   heroku git:remote -a mohammadafzal-portfolio
   ```

5. Set the stack to container:
   ```
   heroku stack:set container -a mohammadafzal-portfolio
   ```

6. Push to Heroku:
   ```
   git push heroku main
   ```

7. Open the app:
   ```
   heroku open
   ```

### Local Development

To run the application locally:

```
python portfolio/app.py
```

To build and run using Docker:

```
docker build -t portfolio-app .
docker run -p 8080:8080 portfolio-app
```

Then access the application at http://localhost:8080

## Technologies Used

- Flask
- Python
- HTML/CSS/JavaScript
- SVG Animations
- D3.js for data visualizations
- Three.js for 3D globe
- Docker for containerization