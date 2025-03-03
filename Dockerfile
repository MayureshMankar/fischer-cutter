# Use the official Node.js image as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json (if available) into the container
COPY package*.json ./

# Install dependencies in the container
RUN npm install

# Copy the entire project, including 'backend' and 'public_html' into the container
COPY . .

# Expose the port the app will run on (you can change this port if needed)
EXPOSE 3000

# Specify the command to run the server.js file in the 'backend' folder when the container starts
CMD ["node", "backend/server.js"]
