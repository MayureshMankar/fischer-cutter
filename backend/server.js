require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const app = express();

// Import app.js and app2.js to use their routes
const appRoutes = require('./app');
//const app2Routes = require('./app2');
app.use(express.json());

// Use app.js routes
app.use('/', appRoutes);  // All routes from app.js (e.g., signup, login, etc.)

// Use app2.js routes (e.g., file upload routes)
//app.use('/', app2Routes);  // All routes from app2.js (e.g., file upload route)

// MongoDB connection string (you can move this to an environment variable)

// Middleware to handle static files (like CSS, images, etc.)
app.use(express.static('public'));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port https://localhost:${PORT}`);
});
