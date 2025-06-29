# Deployment Instructions

Follow these steps to deploy your portfolio to Heroku using Docker:

## 1. Initial Setup

Make sure you have the following installed:
- Heroku CLI
- Docker
- Git

## 2. Login to Heroku

```bash
heroku login
```

## 3. Initialize Git

```bash
# Add all files to Git
git add .

# Commit the changes
git commit -m "Initial commit for Heroku deployment"
```

## 4. Create Heroku App

```bash
# Create a new Heroku app
heroku create mohammadafzal-portfolio

# Or if you want to add it to an existing app
heroku git:remote -a mohammadafzal-portfolio
```

## 5. Set Up for Container Deployment

```bash
# Set the stack to container
heroku stack:set container

# Login to Heroku Container Registry
heroku container:login
```

## 6. Deploy

```bash
# Deploy using Git
git push heroku main

# Alternatively, you can build and push the Docker container directly
# heroku container:push web
# heroku container:release web
```

## 7. Open the App

```bash
heroku open
```

## Monitoring and Troubleshooting

```bash
# View logs
heroku logs --tail

# Check app status
heroku ps

# Run commands in the container
heroku run bash
```

## Update the Application

To update your application after making changes:

```bash
git add .
git commit -m "Update application"
git push heroku main
```

## Local Testing

Test your Docker container locally before deploying:

```bash
docker build -t portfolio-app .
docker run -p 8080:8080 portfolio-app
```

Then access at http://localhost:8080