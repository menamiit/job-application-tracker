const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB error:', err));

// Schema
const applicationSchema = new mongoose.Schema({
    applicationId: { type: String, unique: true, required: true },
    company: { type: String, required: true },
    position: { type: String, required: true },
    jobLink: String,
    notes: String,
    status: { type: String, default: 'Applied' },
    applicationDate: { type: String, default: () => new Date().toISOString() },
    createdAt: { type: Number, default: () => Date.now() },
});

const Application = mongoose.model('Application', applicationSchema);

// CREATE
app.post('/applications', async (req, res) => {
    try {
        const { company, position, jobLink, notes } = req.body;

        if (!company || !position) {
            return res.status(400).json({ error: 'Company and position required' });
        }

        const applicationId = require('crypto').randomUUID();
        const app = await Application.create({
            applicationId,
            company,
            position,
            jobLink: jobLink || '',
            notes: notes || '',
            status: 'Applied',
            applicationDate: new Date().toISOString(),
            createdAt: Date.now(),
        });

        res.status(201).json({ success: true, applicationId: app.applicationId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create application' });
    }
});

// READ
app.get('/applications', async (req, res) => {
    try {
        const applications = await Application.find();
        res.json({ applications });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to load applications' });
    }
});

// UPDATE
app.put('/applications/:id', async (req, res) => {
    try {
        const { status, notes } = req.body;

        await Application.findOneAndUpdate(
            { applicationId: req.params.id },
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
app.delete('/applications/:id', async (req, res) => {
    try {
        await Application.findOneAndDelete({ applicationId: req.params.id });
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete application' });
    }
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
