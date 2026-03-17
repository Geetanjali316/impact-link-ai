/**
 * opportunityController.js - Opportunity Controller (MVC)
 * 
 * Handles all business logic for opportunity-related API endpoints.
 * - createOpportunity: Creates a new volunteer opportunity
 * - getOpportunities:  Retrieves all opportunities
 * - getOpportunityById: Retrieves a single opportunity by ID
 * - getMatchesForOpportunity: AI-powered volunteer matching
 */

const Opportunity = require('../models/Opportunity');
const Volunteer = require('../models/Volunteer');
const { findBestMatches } = require('../ai/matchingEngine');

/**
 * @desc    Create a new volunteer opportunity
 * @route   POST /api/opportunities
 * @access  Public
 */
const createOpportunity = async (req, res) => {
  try {
    const {
      title,
      organization,
      description,
      location,
      date,
      requiredSkills,
      volunteersNeeded,
    } = req.body;

    // Create the opportunity document
    const opportunity = await Opportunity.create({
      title,
      organization,
      description,
      location,
      date,
      // Ensure requiredSkills is an array
      requiredSkills: Array.isArray(requiredSkills)
        ? requiredSkills.map((s) => s.trim())
        : requiredSkills.split(',').map((s) => s.trim()),
      volunteersNeeded,
    });

    res.status(201).json({
      success: true,
      message: 'Opportunity created successfully!',
      data: opportunity,
    });
  } catch (error) {
    console.error('Error creating opportunity:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error while creating opportunity.',
      error: error.message,
    });
  }
};

/**
 * @desc    Get all volunteer opportunities
 * @route   GET /api/opportunities
 * @access  Public
 */
const getOpportunities = async (req, res) => {
  try {
    const opportunities = await Opportunity.find().sort({ date: 1 });
    res.status(200).json({
      success: true,
      count: opportunities.length,
      data: opportunities,
    });
  } catch (error) {
    console.error('Error fetching opportunities:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching opportunities.',
      error: error.message,
    });
  }
};

/**
 * @desc    Get a single opportunity by ID
 * @route   GET /api/opportunities/:id
 * @access  Public
 */
const getOpportunityById = async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);
    if (!opportunity) {
      return res.status(404).json({
        success: false,
        message: 'Opportunity not found.',
      });
    }
    res.status(200).json({ success: true, data: opportunity });
  } catch (error) {
    console.error('Error fetching opportunity:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching opportunity.',
      error: error.message,
    });
  }
};

/**
 * @desc    AI Smart Matching – Find best volunteers for an opportunity
 * @route   GET /api/opportunities/:id/matches
 * @access  Public
 * 
 * This endpoint uses the AI Matching Engine to analyze all registered
 * volunteers and rank them based on skill compatibility, location
 * proximity, and availability.
 */
const getMatchesForOpportunity = async (req, res) => {
  try {
    // Fetch the target opportunity
    const opportunity = await Opportunity.findById(req.params.id);
    if (!opportunity) {
      return res.status(404).json({
        success: false,
        message: 'Opportunity not found.',
      });
    }

    // Fetch all registered volunteers
    const volunteers = await Volunteer.find();

    if (volunteers.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'No volunteers registered yet.',
        data: [],
      });
    }

    // Run the AI matching engine
    const matches = findBestMatches(volunteers, opportunity);

    res.status(200).json({
      success: true,
      opportunity: {
        title: opportunity.title,
        organization: opportunity.organization,
        requiredSkills: opportunity.requiredSkills,
        location: opportunity.location,
      },
      totalMatches: matches.length,
      data: matches,
    });
  } catch (error) {
    console.error('Error in AI matching:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error during AI matching.',
      error: error.message,
    });
  }
};

module.exports = {
  createOpportunity,
  getOpportunities,
  getOpportunityById,
  getMatchesForOpportunity,
};
