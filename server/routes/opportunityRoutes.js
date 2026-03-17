/**
 * opportunityRoutes.js - Opportunity API Routes
 * 
 * Defines the Express routes for opportunity-related endpoints.
 * Includes the AI matching route for smart volunteer recommendations.
 */

const express = require('express');
const router = express.Router();

// Import controller functions
const {
  createOpportunity,
  getOpportunities,
  getOpportunityById,
  getMatchesForOpportunity,
} = require('../controllers/opportunityController');

// POST /api/opportunities              → Create a new opportunity
router.post('/', createOpportunity);

// GET  /api/opportunities              → Get all opportunities
router.get('/', getOpportunities);

// GET  /api/opportunities/:id          → Get opportunity by ID
router.get('/:id', getOpportunityById);

// GET  /api/opportunities/:id/matches  → AI Smart Matching
router.get('/:id/matches', getMatchesForOpportunity);

module.exports = router;
