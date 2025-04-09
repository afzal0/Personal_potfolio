FROM python:3.9-slim

WORKDIR /app

COPY . .

RUN pip install --no-cache-dir -r portfolio/requirements.txt

# Make port 8080 available for the app
EXPOSE 8080

# Set environment variables
ENV PORT=8080
ENV PYTHONUNBUFFERED=1

# Run the application
CMD gunicorn --bind 0.0.0.0:$PORT portfolio.app:app