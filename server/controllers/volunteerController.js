/**
 * volunteerController.js - Volunteer Controller (MVC)
 * 
 * Handles all business logic for volunteer-related API endpoints.
 * - registerVolunteer: Creates a new volunteer in the database
 * - getVolunteers:     Retrieves all registered volunteers
 * - getVolunteerById:  Retrieves a single volunteer by ID
 */

const Volunteer = require('../models/Volunteer');

/**
 * @desc    Register a new volunteer
 * @route   POST /api/volunteers
 * @access  Public
 */
const registerVolunteer = async (req, res) => {
  try {
    const { name, email, phone, location, skills, availability } = req.body;

    // Check if volunteer with this email already exists
    const existingVolunteer = await Volunteer.findOne({ email });
    if (existingVolunteer) {
      return res.status(400).json({
        success: false,
        message: 'A volunteer with this email already exists.',
      });
    }

    // Create new volunteer document
    const volunteer = await Volunteer.create({
      name,
      email,
      phone,
      location,
      // Ensure skills is an array (handle comma-separated string input)
      skills: Array.isArray(skills)
        ? skills.map((s) => s.trim())
        : skills.split(',').map((s) => s.trim()),
      availability,
    });

    res.status(201).json({
      success: true,
      message: 'Volunteer registered successfully!',
      data: volunteer,
    });
  } catch (error) {
    console.error('Error registering volunteer:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error while registering volunteer.',
      error: error.message,
    });
  }
};

/**
 * @desc    Get all registered volunteers
 * @route   GET /api/volunteers
 * @access  Public
 */
const getVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: volunteers.length,
      data: volunteers,
    });
  } catch (error) {
    console.error('Error fetching volunteers:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching volunteers.',
      error: error.message,
    });
  }
};

/**
 * @desc    Get a single volunteer by ID
 * @route   GET /api/volunteers/:id
 * @access  Public
 */
const getVolunteerById = async (req, res) => {
  try {
    const volunteer = await Volunteer.findById(req.params.id);
    if (!volunteer) {
      return res.status(404).json({
        success: false,
        message: 'Volunteer not found.',
      });
    }
    res.status(200).json({ success: true, data: volunteer });
  } catch (error) {
    console.error('Error fetching volunteer:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching volunteer.',
      error: error.message,
    });
  }
};

module.exports = { registerVolunteer, getVolunteers, getVolunteerById };
