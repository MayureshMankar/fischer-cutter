import 'dotenv/config'; // Load environment variables from .env file
import express from 'express';
import mongoose from 'mongoose';  // Assuming you are using mongoose for MongoDB connection
import appRoutes from './app.js'; // Import app.js for routes (use .js or .mjs based on setup)
// import app2Routes from './app2.js';  // Uncomment if you are using app2.js for additional routes

const app = express();

// Middleware to handle JSON data and static files
app.use(express.json());
app.use(express.static('public'));  // This serves static files (like CSS, images, etc.)

// Use app.js routes
app.use('/', appRoutes);  // All routes from app.js (e.g., signup, login, etc.)

// Use app2.js routes (uncomment if needed)
// app.use('/', app2Routes);  // You can enable this if app2.js routes are needed

// MongoDB connection string (from environment variables or directly)
const dbConnection = process.env.MONGODB_URI || 'mongodb+srv://mankar2045:admd204519@let.b3jaf.mongodb.net/test';
mongoose.connect(dbConnection)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on https://localhost:${PORT}`);
});
