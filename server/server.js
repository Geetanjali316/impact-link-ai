/**
 * server.js - Main Application Entry Point
 * 
 * Sets up the Express server, connects to MongoDB,
 * registers all API routes, and starts listening.
 */

// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Import route modules
const volunteerRoutes = require('./routes/volunteerRoutes');
const opportunityRoutes = require('./routes/opportunityRoutes');

// Initialize Express app
const app = express();

// ──────────────────────────────────────────────
// Middleware
// ──────────────────────────────────────────────

// Enable CORS so the React frontend can communicate with this API
app.use(cors());

// Parse incoming JSON request bodies
app.use(express.json());

// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// ──────────────────────────────────────────────
// API Routes
// ──────────────────────────────────────────────

// Volunteer endpoints:  /api/volunteers
app.use('/api/volunteers', volunteerRoutes);

// Opportunity endpoints: /api/opportunities
app.use('/api/opportunities', opportunityRoutes);

// Root health-check endpoint
app.get('/', (req, res) => {
  res.json({
    message: '🚀 ImpactLink AI – API is running!',
    endpoints: {
      volunteers: '/api/volunteers',
      opportunities: '/api/opportunities',
      aiMatching: '/api/opportunities/:id/matches',
    },
  });
});

// ──────────────────────────────────────────────
// Start Server
// ──────────────────────────────────────────────

const PORT = process.env.PORT || 5000;

// Connect to MongoDB first, then start the server
connectDB().then(() => {
  // Only listen locally, Vercel handles the server
  if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📡 API Base URL: http://localhost:${PORT}/api`);
    });
  }
});

// Export the express app for Vercel
module.exports = app;
