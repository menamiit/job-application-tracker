const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Secrets (generic for demo)
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const BCRYPT_ROUNDS = 10;

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB error:', err));

// User Schema
const userSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

// Application Schema
const applicationSchema = new mongoose.Schema({
    applicationId: { type: String, unique: true, required: true },
    userId: { type: String, required: true },
    company: { type: String, required: true },
    position: { type: String, required: true },
    jobLink: String,
    notes: String,
    status: { type: String, default: 'Applied' },
    applicationDate: { type: String, default: () => new Date().toISOString() },
    createdAt: { type: Number, default: () => Date.now() },
});

const Application = mongoose.model('Application', applicationSchema);

// JWT Middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'No token provided' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });
        req.user = user;
        next();
    });
};

// AUTH ENDPOINTS
// Register
app.post('/auth/register', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password required' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, BCRYPT_ROUNDS);
        const user = await User.create({ email, password: hashedPassword });

        res.status(201).json({ success: true, message: 'User registered' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Registration failed' });
    }
});

// Login
app.post('/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
        res.json({ success: true, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Login failed' });
    }
});

// APPLICATION ENDPOINTS (Protected)
// CREATE
app.post('/applications', authenticateToken, async (req, res) => {
    try {
        const { company, position, jobLink, notes } = req.body;

        if (!company || !position) {
            return res.status(400).json({ error: 'Company and position required' });
        }

        const applicationId = require('crypto').randomUUID();
        const application = await Application.create({
            applicationId,
            userId: req.user.userId,
            company,
            position,
            jobLink: jobLink || '',
            notes: notes || '',
            status: 'Applied',
            applicationDate: new Date().toISOString(),
            createdAt: Date.now(),
        });

        res.status(201).json({ success: true, applicationId: application.applicationId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create application' });
    }
});

// READ
app.get('/applications', authenticateToken, async (req, res) => {
    try {
        const applications = await Application.find({ userId: req.user.userId });
        res.json({ applications });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to load applications' });
    }
});

// UPDATE
app.put('/applications/:id', authenticateToken, async (req, res) => {
    try {
        const { status, notes } = req.body;

        await Application.findOneAndUpdate(
            { applicationId: req.params.id, userId: req.user.userId },
            { status, notes },
            { new: true }
        );

        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update application' });
    }
});

// DELETE
app.delete('/applications/:id', authenticateToken, async (req, res) => {
    try {
        await Application.findOneAndDelete({ applicationId: req.params.id, userId: req.user.userId });
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete application' });
    }
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
