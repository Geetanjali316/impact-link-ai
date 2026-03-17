/**
 * RegisterVolunteer.js - Volunteer Registration Page
 * 
 * Page that wraps the VolunteerForm component with a styled
 * header and page layout.
 */

import React from 'react';
import VolunteerForm from '../components/VolunteerForm';
import { FaUserPlus } from 'react-icons/fa';
import './PageStyles.css';

const RegisterVolunteer = () => {
  return (
    <div className="page">
      <div className="page-container">
        {/* Page Header */}
        <div className="page-header">
          <div className="page-icon-wrap">
            <FaUserPlus className="page-icon" />
          </div>
          <h1 className="page-title">Volunteer Registration</h1>
          <p className="page-desc">
            Join our community of changemakers. Register your skills and
            availability, and our AI will match you with the best opportunities.
          </p>
        </div>

        {/* Registration Form */}
        <VolunteerForm />
      </div>
    </div>
  );
};

export default RegisterVolunteer;
