# ----------- Stage 1: Build the Angular app -----------
# Use an official Node.js image to build the app
FROM node:20-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install dependencies (including devDependencies needed for Angular build tools)
RUN npm install --production=false

# Copy the rest of the application code
COPY . .

# Build the Angular app for production and show output
RUN npm run build -- --configuration production \
  && echo "=== Angular build output ===" \
  && ls -l dist/coursa-fe/browser

# ----------- Stage 2: Serve the app with NGINX -----------
# Use an official NGINX image to serve the built files
FROM nginx:alpine

# Copy the built Angular app from the builder stage to the NGINX html directory (SSR/prerendered output)
COPY --from=builder /app/dist/coursa-fe/browser /usr/share/nginx/html

# Debug: List files in the NGINX html directory
RUN echo "=== NGINX html directory ===" && ls -l /usr/share/nginx/html

# Copy a custom NGINX config (optional, for SPA routing)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 (default for NGINX)
EXPOSE 80

# Start NGINX when the container launches
CMD ["nginx", "-g", "daemon off;"]

# -----------
# Notes:
# - This Dockerfile uses multi-stage builds for a small, secure final image.
# - The Angular app is built in a Node.js container, then served by NGINX.
# - For SSR/prerender, static files are in dist/coursa-fe/browser. 