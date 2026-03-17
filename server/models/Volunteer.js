/**
 * Volunteer.js - Volunteer Data Model
 * 
 * Defines the MongoDB schema for volunteers who register on the platform.
 * Fields: name, email, phone, location, skills (array), availability.
 */

const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema(
  {
    // Full name of the volunteer
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },

    // Email address (unique identifier for each volunteer)
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
    },

    // Contact phone number
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },

    // City or region where the volunteer is based
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },

    // Array of skills the volunteer possesses (used for AI matching)
    skills: {
      type: [String],
      required: [true, 'At least one skill is required'],
    },

    // When the volunteer is available (e.g., "Weekends", "Full-time")
    availability: {
      type: String,
      required: [true, 'Availability is required'],
      trim: true,
    },
  },
  {
    // Automatically add createdAt and updatedAt timestamps
    timestamps: true,
  }
);

module.exports = mongoose.model('Volunteer', volunteerSchema);
