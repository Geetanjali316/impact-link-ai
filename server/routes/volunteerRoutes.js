/**
 * volunteerRoutes.js - Volunteer API Routes
 * 
 * Defines the Express routes for volunteer-related endpoints.
 * Maps HTTP methods + paths to controller functions.
 */

const express = require('express');
const router = express.Router();

// Import controller functions
const {
  registerVolunteer,
  getVolunteers,
  getVolunteerById,
} = require('../controllers/volunteerController');

// POST /api/volunteers       → Register a new volunteer
router.post('/', registerVolunteer);

// GET  /api/volunteers       → Get all volunteers
router.get('/', getVolunteers);

// GET  /api/volunteers/:id   → Get volunteer by ID
router.get('/:id', getVolunteerById);

module.exports = router;
