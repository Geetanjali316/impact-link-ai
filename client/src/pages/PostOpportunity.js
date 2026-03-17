/**
 * PostOpportunity.js - Post New Opportunity Page
 * 
 * Allows NGOs to create volunteer opportunities by filling out
 * a form with title, organization, description, location, date,
 * required skills, and number of volunteers needed.
 */

import React, { useState } from 'react';
import { createOpportunity } from '../services/api';
import {
  FaBullhorn,
  FaBuilding,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaTools,
  FaUsers,
  FaAlignLeft,
  FaPaperPlane,
  FaCheckCircle,
  FaTag,
} from 'react-icons/fa';
import './PageStyles.css';

const PostOpportunity = () => {
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    organization: '',
    description: '',
    location: '',
    date: '',
    requiredSkills: '',
    volunteersNeeded: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await createOpportunity({
        ...formData,
        // Convert skills string to array
        requiredSkills: formData.requiredSkills
          .split(',')
          .map((s) => s.trim()),
        volunteersNeeded: parseInt(formData.volunteersNeeded, 10),
      });

      setSuccess(true);
      // Reset form
      setFormData({
        title: '',
        organization: '',
        description: '',
        location: '',
        date: '',
        requiredSkills: '',
        volunteersNeeded: '',
      });
      setTimeout(() => setSuccess(false), 4000);
    } catch (err) {
      console.error('Error posting opportunity:', err);
      setError(
        err.response?.data?.message || 'Failed to post opportunity. Try again.'
      );
    }
    setLoading(false);
  };

  return (
    <div className="page">
      <div className="page-container">
        {/* Page Header */}
        <div className="page-header">
          <div className="page-icon-wrap icon-orange">
            <FaBullhorn className="page-icon" />
          </div>
          <h1 className="page-title">Post an Opportunity</h1>
          <p className="page-desc">
            Create a volunteer opportunity and let our AI find the
            best-matched volunteers for your cause.
          </p>
        </div>

        {/* Success / Error Messages */}
        <div className="form-wrapper">
          {success && (
            <div className="success-banner">
              <FaCheckCircle className="success-icon" />
              <span>Opportunity posted successfully! 🎉</span>
            </div>
          )}
          {error && (
            <div className="error-banner">
              <span>⚠️ {error}</span>
            </div>
          )}

          <form className="volunteer-form" onSubmit={handleSubmit}>
            {/* Title */}
            <div className="form-group">
              <label htmlFor="opp-title">
                <FaTag className="label-icon" /> Opportunity Title
              </label>
              <input
                type="text"
                id="opp-title"
                name="title"
                placeholder="e.g., Beach Cleanup Drive"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            {/* Organization */}
            <div className="form-group">
              <label htmlFor="organization">
                <FaBuilding className="label-icon" /> Organization Name
              </label>
              <input
                type="text"
                id="organization"
                name="organization"
                placeholder="e.g., Green Earth Foundation"
                value={formData.organization}
                onChange={handleChange}
                required
              />
            </div>

            {/* Description */}
            <div className="form-group">
              <label htmlFor="description">
                <FaAlignLeft className="label-icon" /> Description
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="Describe the opportunity in detail..."
                value={formData.description}
                onChange={handleChange}
                rows="4"
                required
              ></textarea>
            </div>

            {/* Location */}
            <div className="form-group">
              <label htmlFor="opp-location">
                <FaMapMarkerAlt className="label-icon" /> Location
              </label>
              <input
                type="text"
                id="opp-location"
                name="location"
                placeholder="City, State"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>

            {/* Date */}
            <div className="form-group">
              <label htmlFor="date">
                <FaCalendarAlt className="label-icon" /> Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            {/* Required Skills */}
            <div className="form-group">
              <label htmlFor="requiredSkills">
                <FaTools className="label-icon" /> Required Skills
              </label>
              <input
                type="text"
                id="requiredSkills"
                name="requiredSkills"
                placeholder="e.g., Teaching, First Aid, Cooking"
                value={formData.requiredSkills}
                onChange={handleChange}
                required
              />
              <span className="form-hint">
                Separate multiple skills with commas
              </span>
            </div>

            {/* Volunteers Needed */}
            <div className="form-group">
              <label htmlFor="volunteersNeeded">
                <FaUsers className="label-icon" /> Volunteers Needed
              </label>
              <input
                type="number"
                id="volunteersNeeded"
                name="volunteersNeeded"
                placeholder="e.g., 10"
                min="1"
                value={formData.volunteersNeeded}
                onChange={handleChange}
                required
              />
            </div>

            {/* Submit */}
            <button type="submit" className="submit-btn" disabled={loading}>
              <FaPaperPlane className="btn-icon" />
              {loading ? 'Posting...' : 'Post Opportunity'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostOpportunity;
