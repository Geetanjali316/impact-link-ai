/**
 * App.js - Main Application Component
 * 
 * Sets up client-side routing using React Router.
 * Renders the Navbar and all page components.
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';

// Pages
import Home from './pages/Home';
import RegisterVolunteer from './pages/RegisterVolunteer';
import PostOpportunity from './pages/PostOpportunity';
import Opportunities from './pages/Opportunities';

function App() {
  return (
    <Router>
      {/* Navigation bar is displayed on all pages */}
      <Navbar />

      {/* Page Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterVolunteer />} />
        <Route path="/post-opportunity" element={<PostOpportunity />} />
        <Route path="/opportunities" element={<Opportunities />} />
      </Routes>
    </Router>
  );
}

export default App;
