/**
 * OpportunityCard.js - Opportunity Card Component
 * 
 * Displays a single volunteer opportunity in a visually appealing card.
 * Includes organization info, skills tags, date, location, and
 * an "AI Match" button to find best-matched volunteers.
 */

import React, { useState } from 'react';
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUsers,
  FaBrain,
  FaBuilding,
  FaTimes,
} from 'react-icons/fa';
import { getMatchesForOpportunity } from '../services/api';
import './OpportunityCard.css';

const OpportunityCard = ({ opportunity }) => {
  const [matches, setMatches] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Format the date nicely
  const formattedDate = new Date(opportunity.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  /**
   * Handle "Find Matches" button click.
   * Calls the AI matching API endpoint and displays results in a modal.
   */
  const handleFindMatches = async () => {
    setLoading(true);
    try {
      const res = await getMatchesForOpportunity(opportunity._id);
      setMatches(res.data);
      setShowModal(true);
    } catch (error) {
      console.error('Error fetching matches:', error);
      alert('Error fetching AI matches. Please try again.');
    }
    setLoading(false);
  };

  /**
   * Returns a CSS class based on the match score for color coding.
   */
  const getScoreClass = (score) => {
    if (score >= 70) return 'score-high';
    if (score >= 40) return 'score-medium';
    return 'score-low';
  };

  return (
    <>
      <div className="opp-card">
        {/* Card header with gradient accent */}
        <div className="opp-card-header">
          <h3 className="opp-title">{opportunity.title}</h3>
          <div className="opp-org">
            <FaBuilding /> {opportunity.organization}
          </div>
        </div>

        {/* Card body */}
        <div className="opp-card-body">
          <p className="opp-desc">{opportunity.description}</p>

          {/* Metadata row */}
          <div className="opp-meta">
            <span className="opp-meta-item">
              <FaMapMarkerAlt className="meta-icon" />
              {opportunity.location}
            </span>
            <span className="opp-meta-item">
              <FaCalendarAlt className="meta-icon" />
              {formattedDate}
            </span>
            <span className="opp-meta-item">
              <FaUsers className="meta-icon" />
              {opportunity.volunteersNeeded} needed
            </span>
          </div>

          {/* Skills tags */}
          <div className="opp-skills">
            {opportunity.requiredSkills.map((skill, idx) => (
              <span key={idx} className="skill-tag">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Card footer with AI Match button */}
        <div className="opp-card-footer">
          <button
            className="match-btn"
            onClick={handleFindMatches}
            disabled={loading}
          >
            <FaBrain className="btn-icon" />
            {loading ? 'Analyzing...' : 'AI Smart Match'}
          </button>
        </div>
      </div>

      {/* AI Matches Modal */}
      {showModal && matches && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="modal-header">
              <div>
                <h2 className="modal-title">
                  <FaBrain className="modal-title-icon" />
                  AI Match Results
                </h2>
                <p className="modal-subtitle">
                  for <strong>{matches.opportunity?.title}</strong>
                </p>
              </div>
              <button
                className="modal-close"
                onClick={() => setShowModal(false)}
              >
                <FaTimes />
              </button>
            </div>

            {/* Match Results */}
            <div className="modal-body">
              {matches.data && matches.data.length > 0 ? (
                matches.data.map((match, idx) => (
                  <div key={idx} className="match-card">
                    <div className="match-rank">#{idx + 1}</div>
                    <div className="match-info">
                      <h4 className="match-name">{match.volunteer.name}</h4>
                      <p className="match-detail">
                        📧 {match.volunteer.email} &nbsp;|&nbsp; 📍{' '}
                        {match.volunteer.location}
                      </p>
                      <div className="match-skills">
                        {match.volunteer.skills.map((s, i) => (
                          <span key={i} className="match-skill-tag">
                            {s}
                          </span>
                        ))}
                      </div>
                      {/* Score breakdown */}
                      <div className="score-breakdown">
                        <span>
                          Skills: {Math.round(match.breakdown.skillScore * 100)}%
                        </span>
                        <span>
                          Location:{' '}
                          {Math.round(match.breakdown.locationScore * 100)}%
                        </span>
                        <span>
                          Availability:{' '}
                          {Math.round(match.breakdown.availabilityScore * 100)}%
                        </span>
                      </div>
                    </div>
                    <div
                      className={`match-score ${getScoreClass(
                        match.matchScore
                      )}`}
                    >
                      {match.matchScore}%
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-matches">
                  <p>😕 No matching volunteers found yet.</p>
                  <p>Encourage volunteers to register!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OpportunityCard;
