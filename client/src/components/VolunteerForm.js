/**
 * VolunteerForm.js - Reusable Volunteer Registration Form
 * 
 * A styled form component used in the RegisterVolunteer page.
 * Handles input validation and submission to the backend API.
 */

import React, { useState } from 'react';
import { registerVolunteer } from '../services/api';
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaTools,
  FaCalendarCheck,
  FaPaperPlane,
  FaCheckCircle,
} from 'react-icons/fa';
import './VolunteerForm.css';

const VolunteerForm = () => {
  // Form state - each field maps to the Volunteer model
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    skills: '',
    availability: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Handle input field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (error) setError('');
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await registerVolunteer({
        ...formData,
        // Convert comma-separated skills string to array
        skills: formData.skills.split(',').map((s) => s.trim()),
      });

      setSuccess(true);
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        location: '',
        skills: '',
        availability: '',
      });

      // Hide success message after 4 seconds
      setTimeout(() => setSuccess(false), 4000);
    } catch (err) {
      console.error('Registration error:', err);
      setError(
        err.response?.data?.message || 'Registration failed. Please try again.'
      );
    }

    setLoading(false);
  };

  return (
    <div className="form-wrapper">
      {/* Success Message */}
      {success && (
        <div className="success-banner">
          <FaCheckCircle className="success-icon" />
          <span>Registration successful! Welcome aboard! 🎉</span>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="error-banner">
          <span>⚠️ {error}</span>
        </div>
      )}

      <form className="volunteer-form" onSubmit={handleSubmit}>
        {/* Name */}
        <div className="form-group">
          <label htmlFor="name">
            <FaUser className="label-icon" /> Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <div className="form-group">
          <label htmlFor="email">
            <FaEnvelope className="label-icon" /> Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="your.email@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Phone */}
        <div className="form-group">
          <label htmlFor="phone">
            <FaPhone className="label-icon" /> Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="+91 98765 43210"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        {/* Location */}
        <div className="form-group">
          <label htmlFor="location">
            <FaMapMarkerAlt className="label-icon" /> Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="City, State"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        {/* Skills (comma-separated) */}
        <div className="form-group">
          <label htmlFor="skills">
            <FaTools className="label-icon" /> Skills
          </label>
          <input
            type="text"
            id="skills"
            name="skills"
            placeholder="e.g., Teaching, First Aid, Cooking, Coding"
            value={formData.skills}
            onChange={handleChange}
            required
          />
          <span className="form-hint">Separate multiple skills with commas</span>
        </div>

        {/* Availability */}
        <div className="form-group">
          <label htmlFor="availability">
            <FaCalendarCheck className="label-icon" /> Availability
          </label>
          <select
            id="availability"
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            required
          >
            <option value="">Select your availability</option>
            <option value="Weekdays">Weekdays</option>
            <option value="Weekends">Weekends</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Evenings">Evenings</option>
            <option value="Flexible">Flexible</option>
          </select>
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-btn" disabled={loading}>
          <FaPaperPlane className="btn-icon" />
          {loading ? 'Registering...' : 'Register as Volunteer'}
        </button>
      </form>
    </div>
  );
};

export default VolunteerForm;
