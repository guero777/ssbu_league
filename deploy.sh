#!/bin/bash
set -e  # Exit on any error

# Configuration
BRANCH="master"

# Print status function
status() {
    echo "===> $1"
}

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "Error: .env file not found in current directory"
    echo "Please create a .env file with your environment variables:"
    exit 1
fi

# Start deployment
status "Starting deployment process..."

# Pull latest code
status "Fetching latest code..."
git fetch origin
git checkout $BRANCH
git pull origin $BRANCH

# Build application
status "Building application..."
./mvnw clean package -DskipTests

# Stop current containers
status "Stopping current containers..."
docker-compose -f compose-prod.yaml down

# Start new containers
status "Starting new containers..."
docker-compose -f compose-prod.yaml up -d --build

# Show logs
status "Deployment complete! Showing logs..."
docker-compose -f compose-prod.yaml logs -f webapp
