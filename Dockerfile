# Use the official Nginx image as the base image
FROM nginx:latest

# Set the working directory to /usr/share/nginx/html
WORKDIR /usr/share/nginx/html

# Copy the contents of the www directory at the same level as the Dockerfile to the container's /usr/share/nginx/html directory
COPY www/ .

# Expose port 80 to the outside world
EXPOSE 80

# Command to start Nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]