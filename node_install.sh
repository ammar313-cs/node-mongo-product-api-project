#!/bin/bash

# Set your project name
PROJECT_NAME=""

# Create project directory
mkdir $PROJECT_NAME
cd $PROJECT_NAME

# Initialize Node.js project
npm init -y

# Install dependencies in the proj
npm install express mongoose body-parser dotenv
npm install --save-dev nodemon

# Create directory structure of the proj
mkdir -p src/{controllers,models,routes,config,middlewares,utils}

# Create main entry point file for the proj
touch src/index.js

# Create environment configuration file for the project 
touch .env
