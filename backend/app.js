require('dotenv').config(); // Load environment variables from .env file
const jwtSecret = process.env.JWT_SECRET;
console.log('JWT_SECRET:', jwtSecret); // Check if the secret is loaded correctly

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const cors = require('cors'); 

const app = express();

// Enable CORS for your frontend URL
app.use(cors({
    origin: 'https://fischer-cutter.onrender.com',  // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],    // Allow the necessary HTTP methods
    allowedHeaders: ['Content-Type'],             // Allow specific headers (you can add more if needed)
}));

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // To parse form data
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files like HTML, CSS, JS from 'public' folder

// Routes to serve HTML pages
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/about', (req, res) => res.sendFile(path.join(__dirname, 'public', 'about.html')));
app.get('/services', (req, res) => res.sendFile(path.join(__dirname, 'public', 'services.html')));
app.get('/portfolio', (req, res) => res.sendFile(path.join(__dirname, 'public', 'portfolio.html')));
app.get('/contactus', (req, res) => res.sendFile(path.join(__dirname, 'public', 'contactus.html')));
app.get('/faq', (req, res) => res.sendFile(path.join(__dirname, 'public', 'footer.html')));
app.get('/terms-of-service', (req, res) => res.sendFile(path.join(__dirname, 'public', 'terms-of-service.html')));
app.get('/signin', (req, res) => res.sendFile(path.join(__dirname, 'public', 'signin.html')));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'public', 'login.html')));
app.get('/placeanorder', (req, res) => res.sendFile(path.join(__dirname, 'public', 'placeanorder.html')));

// MongoDB Connection
mongoose.connect('mongodb+srv://mankar2045:admd204519@let.b3jaf.mongodb.net/test')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

// Contact form schema
const contactFormSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    message: String,
    submittedAt: { type: Date, default: Date.now }
});
const ContactForm = mongoose.model('ContactForm', contactFormSchema);

// POST route to handle contact form submissions
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;
        const contactEntry = new ContactForm({ name, email, phone, message });
        await contactEntry.save();
        res.status(200).send('Thank you for contacting us! We will respond shortly.');
    } catch (error) {
        console.error('Error saving contact form data:', error);
        res.status(500).send('An error occurred while submitting your message. Please try again.');
    }
});

// User schema for sign-up/login 
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    termsAndConditions: { type: Boolean, required: true },
    createdAt: { type: Date, default: Date.now }
});
const User = mongoose.model('User', userSchema);

// Sign-up route
app.post('/api/signup', async (req, res) => {
    const { name, email, phone, password, confirmPassword, termsAndConditions } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).send('Passwords do not match');
    }
    if (!termsAndConditions) {
        return res.status(400).send('You must agree to the Terms and Conditions');
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            phone,
            password: hashedPassword,
            termsAndConditions
        });
        await newUser.save();
        res.status(201).send('User registered successfully!');
    } catch (error) {
        console.error('Error signing up:', error);
        res.status(500).send('Error signing up. Please try again.');
    }
});

// Login route
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    // Check for missing fields
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Compare provided password with stored hash
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token }); // Send token on success

    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'An error occurred during login. Please try again.' });
    }
});






// Middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up multer for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Destination folder for files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Timestamp to avoid filename collision
    }
});

const upload = multer({ storage: storage });

// Serve static files from the 'uploads' directory (optional)
app.use('/uploads', express.static('uploads'));

// Order Schema (MongoDB Schema) - Define files as an array of strings (paths)
const orderSchema = new mongoose.Schema({
    service: String,
    projectSpecifications: String,
    files: [String], // Array to store file paths as strings
    createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);

// API Route to place an order
app.post('/api/place-order', upload.array('files', 10), async (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).send('No files uploaded.');
    }

    // Extract form data from the request body
    const { service, projectSpecifications } = req.body;

    // Get uploaded file paths
    const filePaths = req.files.map(file => file.path);

    // Create new order entry in MongoDB
    const newOrder = new Order({
        service,
        projectSpecifications,
        files: filePaths, // Storing paths as an array of strings
    });

    try {
        const savedOrder = await newOrder.save();
        res.json({
            message: 'Order placed successfully',
            orderId: savedOrder._id,
            files: filePaths,
        });
    } catch (err) {
        console.error('Error saving order:', err);
        res.status(500).json({ message: 'Error placing order', error: err });
    }
});


module.exports = app;
