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
const { GridFSBucket } = require('mongodb'); // Import GridFSBucket for file storage

const app = express();

app.use(cors({
    origin: 'https://fischer-cutter-backend.onrender.com', // Replace with your frontend's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow headers
}));

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // To parse form data
app.use(express.static(path.join(__dirname, '..', 'public_html'))); // Serve static files like HTML, CSS, JS from 'public' folder

// Routes to serve HTML pages
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '..', 'public_html', 'index.html')));
app.get('/about', (req, res) => res.sendFile(path.join(__dirname, '..', 'public_html', 'about.html')));
app.get('/services', (req, res) => res.sendFile(path.join(__dirname, '..', 'public_html', 'services.html')));
app.get('/portfolio', (req, res) => res.sendFile(path.join(__dirname, '..', 'public_html', 'portfolio.html')));
app.get('/contactus', (req, res) => res.sendFile(path.join(__dirname, '..', 'public_html', 'contactus.html')));
app.get('/faq', (req, res) => res.sendFile(path.join(__dirname, '..', 'public_html', 'footer.html')));
app.get('/terms-of-service', (req, res) => res.sendFile(path.join(__dirname, '..', 'public_html', 'terms-of-service.html')));
app.get('/signin', (req, res) => res.sendFile(path.join(__dirname, '..', 'public_html', 'signin.html')));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, '..', 'public_html', 'login.html')));
app.get('/placeanorder', (req, res) => res.sendFile(path.join(__dirname, '..', 'public_html', 'placeanorder.html')));

// MongoDB Connection
mongoose.connect('mongodb+srv://mankar2045:admd204519@let.b3jaf.mongodb.net/test')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

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

// MongoDB GridFS Setup for file upload
const connection = mongoose.connection;
let gfs;


connection.once('open', () => {
    gfs = new GridFSBucket(connection.db, { bucketName: 'uploads' });
    console.log('Connected to GridFS');
});

// Set up multer to use memory storage (files will be saved to MongoDB instead of local storage)
const upload = multer({
    storage: multer.memoryStorage(), // Store files in memory
    limits: { fileSize: 50 * 1024 * 1024 }, // Example: limit to 50MB per file (adjust as needed)
    // No file type restriction, allowing any type of file
});

// Order Schema (MongoDB Schema)
const orderSchema = new mongoose.Schema({
    service: String,
    projectSpecifications: String,
    files: [mongoose.Schema.Types.ObjectId], // Array to store file ObjectIds
    createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);



// API Route to place an order
app.post('/api/place-order', upload.array('files', 10), async (req, res) => {
    const { service, projectSpecifications } = req.body;
    const fileIds = [];

    try {
        // Check if files are uploaded
        if (req.files && req.files.length > 0) {
            // If files are uploaded, process them
            for (const file of req.files) {
                const uploadStream = gfs.openUploadStream(file.originalname, { contentType: file.mimetype });
                uploadStream.end(file.buffer);

                // Wait for the file to finish uploading
                await new Promise((resolve, reject) => {
                    uploadStream.on('finish', () => {
                        fileIds.push(uploadStream.id); // Store file ID in fileIds array
                        resolve();
                    });
                    uploadStream.on('error', reject);
                });
            }
        }

        // Create the order with or without files
        const newOrder = new Order({
            service,
            projectSpecifications,
            files: fileIds, // This will be an empty array if no files were uploaded
        });

        const savedOrder = await newOrder.save();
        res.json({
            message: 'Order placed successfully',
            orderId: savedOrder._id,
            files: fileIds, // Return the uploaded files' IDs (or empty array if no files)
        });
    } catch (error) {
        console.error('Error saving order:', error);
        res.status(500).json({ message: 'Error placing order', error });
    }
});





// Route to download the file from MongoDB GridFS
app.get('/api/file/:id', (req, res) => {
    const fileId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(fileId)) return res.status(400).json({ message: 'Invalid file ID' });

    try {
        const downloadStream = gfs.openDownloadStream(new mongoose.Types.ObjectId(fileId));
        res.set('Content-Type', 'application/octet-stream');
        downloadStream.pipe(res);

        downloadStream.on('error', (err) => {
            console.error('Download error:', err);
            res.status(404).json({ message: 'File not found' });
        });
    } catch (error) {
        console.error('Error fetching file:', error);
        res.status(500).json({ message: 'An error occurred while fetching the file' });
    }
});

module.exports = app;

