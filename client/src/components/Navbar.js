/**
 * Navbar.js - Navigation Bar Component
 * 
 * A modern, glassmorphic navigation bar with animated links
 * and a gradient logo. Provides routing to all main pages.
 */

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaHandsHelping } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  // Track mobile menu open/close state
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Toggle mobile hamburger menu
  const toggleMenu = () => setIsOpen(!isOpen);

  // Close menu when a link is clicked (mobile)
  const closeMenu = () => setIsOpen(false);

  // Check if current path matches the link for active styling
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo / Brand */}
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <FaHandsHelping className="logo-icon" />
          <span className="logo-text">
            Impact<span className="logo-highlight">Link</span>
            <span className="logo-ai">AI</span>
          </span>
        </Link>

        {/* Mobile hamburger toggle */}
        <div className="menu-icon" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Navigation Links */}
        <ul className={isOpen ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <Link
              to="/"
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/register"
              className={`nav-link ${isActive('/register') ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Volunteer
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/post-opportunity"
              className={`nav-link ${isActive('/post-opportunity') ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Post Opportunity
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/opportunities"
              className={`nav-link ${isActive('/opportunities') ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Opportunities
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
