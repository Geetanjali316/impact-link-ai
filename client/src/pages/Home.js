/**
 * Home.js - Landing / Home Page
 * 
 * The main hero page for ImpactLink AI.
 * Features a stunning hero section with animated elements,
 * feature cards, and call-to-action buttons.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaHandsHelping,
  FaBrain,
  FaGlobeAmericas,
  FaUserPlus,
  FaBullhorn,
  FaArrowRight,
  FaHeart,
  FaRocket,
} from 'react-icons/fa';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      {/* ─── Hero Section ─── */}
      <section className="hero">
        {/* Animated background orbs */}
        <div className="hero-bg-orb orb-1"></div>
        <div className="hero-bg-orb orb-2"></div>
        <div className="hero-bg-orb orb-3"></div>

        <div className="hero-content">
          <div className="hero-badge">
            <FaBrain className="badge-icon" />
            <span>Powered by AI Matching</span>
          </div>

          <h1 className="hero-title">
            Connect. Volunteer.
            <br />
            <span className="hero-gradient">Make an Impact.</span>
          </h1>

          <p className="hero-subtitle">
            ImpactLink AI uses smart algorithms to match passionate
            volunteers with NGOs and social causes that need them most.
            Find your perfect opportunity today.
          </p>

          <div className="hero-actions">
            <Link to="/register" className="hero-btn primary">
              <FaUserPlus /> Join as Volunteer
            </Link>
            <Link to="/opportunities" className="hero-btn secondary">
              Explore Opportunities <FaArrowRight />
            </Link>
          </div>

          {/* Stats row */}
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">AI</span>
              <span className="stat-label">Smart Matching</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <span className="stat-number">100%</span>
              <span className="stat-label">Free Platform</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <span className="stat-number">∞</span>
              <span className="stat-label">Opportunities</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Features Section ─── */}
      <section className="features">
        <div className="section-header">
          <h2 className="section-title">
            Why <span className="gradient-text">ImpactLink AI</span>?
          </h2>
          <p className="section-desc">
            Our platform leverages artificial intelligence to create the most
            effective volunteer-NGO connections possible.
          </p>
        </div>

        <div className="features-grid">
          {/* Feature 1 */}
          <div className="feature-card">
            <div className="feature-icon-wrap">
              <FaBrain className="feature-icon" />
            </div>
            <h3>AI-Powered Matching</h3>
            <p>
              Our smart algorithm analyzes skills, location, and availability
              to find the perfect match between volunteers and opportunities.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="feature-card">
            <div className="feature-icon-wrap icon-green">
              <FaHandsHelping className="feature-icon" />
            </div>
            <h3>Easy Registration</h3>
            <p>
              Sign up in seconds as a volunteer. Add your skills and
              preferences, and let our AI do the rest.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="feature-card">
            <div className="feature-icon-wrap icon-orange">
              <FaBullhorn className="feature-icon" />
            </div>
            <h3>Post Opportunities</h3>
            <p>
              NGOs can post opportunities and instantly find the best-matched
              volunteers from our growing community.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="feature-card">
            <div className="feature-icon-wrap icon-pink">
              <FaGlobeAmericas className="feature-icon" />
            </div>
            <h3>Location Aware</h3>
            <p>
              Smart location matching ensures volunteers are connected with
              opportunities in their area for maximum impact.
            </p>
          </div>
        </div>
      </section>

      {/* ─── How It Works Section ─── */}
      <section className="how-it-works">
        <div className="section-header">
          <h2 className="section-title">
            How It <span className="gradient-text">Works</span>
          </h2>
        </div>

        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Register</h3>
            <p>Sign up with your skills, location, and availability.</p>
          </div>
          <div className="step-connector"></div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Discover</h3>
            <p>Browse volunteer opportunities from verified NGOs.</p>
          </div>
          <div className="step-connector"></div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>AI Match</h3>
            <p>Our AI engine finds the best volunteers for each opportunity.</p>
          </div>
          <div className="step-connector"></div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Make Impact</h3>
            <p>Connect, contribute, and make a difference in your community.</p>
          </div>
        </div>
      </section>

      {/* ─── CTA Section ─── */}
      <section className="cta">
        <div className="cta-content">
          <FaHeart className="cta-icon" />
          <h2>Ready to Make a Difference?</h2>
          <p>
            Join our growing community of volunteers and NGOs working together
            for a better world.
          </p>
          <div className="cta-buttons">
            <Link to="/register" className="hero-btn primary">
              <FaRocket /> Get Started
            </Link>
            <Link to="/post-opportunity" className="hero-btn secondary">
              Post Opportunity <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="footer">
        <p>
          © 2026 ImpactLink AI — Built With AI &hearts; Smart Volunteer Matching System
        </p>
      </footer>
    </div>
  );
};

export default Home;
