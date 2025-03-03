# Use the official Node.js image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available) into the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the entire project (including the backend folder) into the container
COPY . .

# Expose the port the app will run on (for example, 3000)
EXPOSE 3000

# Run the server.js file inside the 'backend' folder when the container starts
CMD ["node", "backend/server.js"]
