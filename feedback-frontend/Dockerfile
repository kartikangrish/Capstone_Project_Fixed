# STAGE 1: Build the Angular app
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --configuration=production

# STAGE 2: Serve the app with Nginx
FROM nginx:alpine
# Copy the built files from Stage 1 to Nginx's html folder
COPY --from=build /app/dist/feedback-frontend/browser /usr/share/nginx/html

# Expose port 80 (Standard web port)
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]