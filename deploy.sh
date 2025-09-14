#!/bin/bash
# Deployment script for Render
echo "Installing dependencies..."
npm install

echo "Building application..."
npm run build

echo "Build completed successfully!"


