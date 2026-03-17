/**
 * api.js - Axios API Service
 * 
 * Centralized API service that handles all HTTP requests to the backend.
 * Uses axios with a base URL configured for the Express server.
 */

import axios from 'axios';

// Base URL for all API requests (proxy in package.json handles dev redirect)
const API = axios.create({
  baseURL: '/api',
});

// ──────────────────────────────────────────────
// Volunteer API Calls
// ──────────────────────────────────────────────

/** Register a new volunteer */
export const registerVolunteer = (volunteerData) =>
  API.post('/volunteers', volunteerData);

/** Get all registered volunteers */
export const getVolunteers = () => API.get('/volunteers');

// ──────────────────────────────────────────────
// Opportunity API Calls
// ──────────────────────────────────────────────

/** Create a new opportunity */
export const createOpportunity = (opportunityData) =>
  API.post('/opportunities', opportunityData);

/** Get all opportunities */
export const getOpportunities = () => API.get('/opportunities');

/** Get a single opportunity by ID */
export const getOpportunityById = (id) => API.get(`/opportunities/${id}`);

// ──────────────────────────────────────────────
// AI Matching API Call
// ──────────────────────────────────────────────

/** Get AI-matched volunteers for a specific opportunity */
export const getMatchesForOpportunity = (opportunityId) =>
  API.get(`/opportunities/${opportunityId}/matches`);
