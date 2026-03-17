/**
 * Opportunity.js - Opportunity Data Model
 * 
 * Defines the MongoDB schema for volunteer opportunities posted by NGOs.
 * Fields: title, organization, description, location, date, requiredSkills, volunteersNeeded.
 */

const mongoose = require('mongoose');

const opportunitySchema = new mongoose.Schema(
  {
    // Title of the volunteer opportunity
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },

    // Name of the NGO / organization posting the opportunity
    organization: {
      type: String,
      required: [true, 'Organization name is required'],
      trim: true,
    },

    // Detailed description of the opportunity
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },

    // Location where the volunteering will take place
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },

    // Date of the event / opportunity
    date: {
      type: Date,
      required: [true, 'Date is required'],
    },

    // Array of skills required for this opportunity (used for AI matching)
    requiredSkills: {
      type: [String],
      required: [true, 'At least one required skill must be specified'],
    },

    // Number of volunteers needed for this opportunity
    volunteersNeeded: {
      type: Number,
      required: [true, 'Number of volunteers needed is required'],
      min: [1, 'At least 1 volunteer is needed'],
    },
  },
  {
    // Automatically add createdAt and updatedAt timestamps
    timestamps: true,
  }
);

module.exports = mongoose.model('Opportunity', opportunitySchema);
