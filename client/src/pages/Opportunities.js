/**
 * Opportunities.js - Opportunities Listing Page
 * 
 * Fetches and displays all volunteer opportunities from the backend.
 * Each opportunity is rendered using the OpportunityCard component,
 * which includes the AI Smart Match button.
 */

import React, { useState, useEffect } from 'react';
import { getOpportunities } from '../services/api';
import OpportunityCard from '../components/OpportunityCard';
import { FaSearch, FaGlobeAmericas, FaSpinner } from 'react-icons/fa';
import './PageStyles.css';
import './Opportunities.css';

const Opportunities = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch opportunities on component mount
  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const res = await getOpportunities();
        setOpportunities(res.data.data);
        setFiltered(res.data.data);
      } catch (err) {
        console.error('Error fetching opportunities:', err);
        setError('Failed to load opportunities. Is the server running?');
      }
      setLoading(false);
    };

    fetchOpportunities();
  }, []);

  // Filter opportunities by search term (title, org, skills, location)
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFiltered(opportunities);
      return;
    }

    const term = searchTerm.toLowerCase();
    const results = opportunities.filter(
      (opp) =>
        opp.title.toLowerCase().includes(term) ||
        opp.organization.toLowerCase().includes(term) ||
        opp.location.toLowerCase().includes(term) ||
        opp.requiredSkills.some((s) => s.toLowerCase().includes(term))
    );
    setFiltered(results);
  }, [searchTerm, opportunities]);

  return (
    <div className="page">
      <div className="page-container wide">
        {/* Page Header */}
        <div className="page-header">
          <div className="page-icon-wrap icon-green">
            <FaGlobeAmericas className="page-icon" />
          </div>
          <h1 className="page-title">Volunteer Opportunities</h1>
          <p className="page-desc">
            Browse available opportunities and use AI Smart Match to find the
            best volunteers for each cause.
          </p>
        </div>

        {/* Search Bar */}
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by title, organization, location, or skill..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="loading-state">
            <FaSpinner className="spinner" />
            <p>Loading opportunities...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="error-state">
            <p>😕 {error}</p>
          </div>
        )}

        {/* No Results */}
        {!loading && !error && filtered.length === 0 && (
          <div className="empty-state">
            <p className="empty-title">No opportunities found</p>
            <p className="empty-desc">
              {searchTerm
                ? 'Try a different search term.'
                : 'Be the first to post an opportunity!'}
            </p>
          </div>
        )}

        {/* Opportunities Grid */}
        {!loading && !error && filtered.length > 0 && (
          <div className="opp-grid">
            {filtered.map((opp) => (
              <OpportunityCard key={opp._id} opportunity={opp} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Opportunities;
