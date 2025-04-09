#!/bin/bash

# Heroku deployment script for Mohammad Afzal Khan's Portfolio
# This script deploys the application to Heroku using Docker

# Set the app name
APP_NAME="mohammadafzal-portfolio"

# Print info
echo "Deploying to Heroku: $APP_NAME"

# Check if Heroku CLI is installed
if ! command -v heroku &> /dev/null; then
    echo "Heroku CLI not found. Please install it first: https://devcenter.heroku.com/articles/heroku-cli"
    exit 1
fi

# Check if logged in to Heroku
heroku whoami &> /dev/null
if [ $? -ne 0 ]; then
    echo "Not logged in to Heroku. Running heroku login..."
    heroku login
fi

# Check if app exists, create if not
heroku apps:info --app $APP_NAME &> /dev/null
if [ $? -ne 0 ]; then
    echo "App $APP_NAME does not exist. Creating..."
    heroku create $APP_NAME
    
    # Set the stack to container
    heroku stack:set container --app $APP_NAME
else
    echo "App $APP_NAME already exists."
fi

# Ensure requirements.txt is in the root directory
if [ -f "portfolio/requirements.txt" ] && [ ! -f "requirements.txt" ]; then
    echo "Copying requirements.txt to root directory..."
    cp portfolio/requirements.txt .
fi

# Ensure Git is initialized
if [ ! -d .git ]; then
    echo "Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit for Heroku deployment"
else
    # Commit any changes
    git add .
    git commit -m "Update for Heroku deployment"
fi

# Add Heroku remote if not already added
if ! git remote | grep -q heroku; then
    echo "Adding Heroku remote..."
    heroku git:remote --app $APP_NAME
fi

# Set Heroku to use container stack
echo "Setting Heroku to container stack..."
heroku stack:set container --app $APP_NAME

# Push to Heroku
echo "Pushing to Heroku..."
git push heroku HEAD:main --force

# Check deployment status
echo "Checking deployment status..."
heroku ps --app $APP_NAME

echo "Deployment complete! Your app should be available at: https://$APP_NAME.herokuapp.com"