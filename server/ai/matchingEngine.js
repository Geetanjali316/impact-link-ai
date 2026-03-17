/**
 * matchingEngine.js - AI Smart Matching Engine
 * 
 * ============================================================
 *  BUILT WITH AI – Smart Volunteer Matching System
 * ============================================================
 * 
 * This module implements an intelligent volunteer-to-opportunity
 * matching algorithm that uses multiple factors to produce a
 * composite match score (0–100%).
 * 
 * ──────────────────────────────────────────────────────
 *  HOW THE AI MATCHING LOGIC WORKS
 * ──────────────────────────────────────────────────────
 * 
 * 1. SKILL MATCHING (Weight: 60%)
 *    ─ Compares each volunteer's skills with the opportunity's
 *      required skills using case-insensitive fuzzy matching.
 *    ─ Exact matches score full points.
 *    ─ Partial / substring matches score partial points (0.5).
 *    ─ Formula:  skillScore = matchedSkills / totalRequiredSkills
 * 
 * 2. LOCATION MATCHING (Weight: 25%)
 *    ─ Compares volunteer location with opportunity location.
 *    ─ Case-insensitive comparison.
 *    ─ Exact match  → 1.0
 *    ─ Partial match (one contains the other) → 0.5
 *    ─ No match     → 0.0
 * 
 * 3. AVAILABILITY BONUS (Weight: 15%)
 *    ─ If the volunteer's stated availability includes keywords
 *      that indicate broad availability ("full-time", "anytime",
 *      "flexible", "weekdays", "weekends"), they receive bonus points.
 *    ─ This rewards volunteers who are more likely to be available.
 * 
 * 4. COMPOSITE SCORE
 *    ─ finalScore = (skillScore × 0.60)
 *                 + (locationScore × 0.25)
 *                 + (availabilityScore × 0.15)
 *    ─ The score is returned as a percentage (0–100).
 * 
 * 5. RANKING
 *    ─ All volunteers are scored against the given opportunity.
 *    ─ Results are sorted in descending order of match score.
 *    ─ Only volunteers with score > 0 are returned.
 * ──────────────────────────────────────────────────────
 */

/**
 * Calculate how well a volunteer's skills match the required skills.
 * Uses fuzzy substring matching for flexibility.
 *
 * @param {string[]} volunteerSkills  - Array of volunteer's skills
 * @param {string[]} requiredSkills   - Array of opportunity's required skills
 * @returns {number} Score between 0 and 1
 */
function calculateSkillScore(volunteerSkills, requiredSkills) {
  if (!requiredSkills || requiredSkills.length === 0) return 0;

  // Normalize all skills to lowercase for case-insensitive comparison
  const volSkills = volunteerSkills.map((s) => s.toLowerCase().trim());

  let totalPoints = 0;

  for (const reqSkill of requiredSkills) {
    const req = reqSkill.toLowerCase().trim();

    // Check for exact match first
    if (volSkills.includes(req)) {
      totalPoints += 1.0; // Full point for exact match
    } else {
      // Check for partial / substring match (fuzzy matching)
      const partialMatch = volSkills.some(
        (vs) => vs.includes(req) || req.includes(vs)
      );
      if (partialMatch) {
        totalPoints += 0.5; // Half point for partial match
      }
    }
  }

  // Return ratio of matched points to total required skills
  return totalPoints / requiredSkills.length;
}

/**
 * Calculate how well the volunteer's location matches the opportunity.
 *
 * @param {string} volunteerLocation   - Volunteer's location
 * @param {string} opportunityLocation - Opportunity's location
 * @returns {number} Score: 1.0 (exact), 0.5 (partial), or 0.0 (no match)
 */
function calculateLocationScore(volunteerLocation, opportunityLocation) {
  const volLoc = volunteerLocation.toLowerCase().trim();
  const oppLoc = opportunityLocation.toLowerCase().trim();

  if (volLoc === oppLoc) return 1.0;               // Exact match
  if (volLoc.includes(oppLoc) || oppLoc.includes(volLoc)) return 0.5; // Partial
  return 0.0;                                       // No match
}

/**
 * Calculate an availability bonus score based on keyword matching.
 *
 * @param {string} availability - Volunteer's availability string
 * @returns {number} Score between 0 and 1
 */
function calculateAvailabilityScore(availability) {
  const avail = availability.toLowerCase().trim();

  // Keywords that indicate high availability
  const highAvailKeywords = ['full-time', 'fulltime', 'anytime', 'flexible', 'always'];
  const mediumAvailKeywords = ['weekdays', 'weekends', 'part-time', 'parttime', 'evenings'];

  if (highAvailKeywords.some((kw) => avail.includes(kw))) return 1.0;
  if (mediumAvailKeywords.some((kw) => avail.includes(kw))) return 0.6;
  return 0.3; // Default: some availability assumed
}

/**
 * Main AI Matching Function
 * 
 * Matches all volunteers against a specific opportunity and returns
 * ranked results sorted by composite match score (descending).
 *
 * @param {Array}  volunteers   - Array of volunteer documents from MongoDB
 * @param {Object} opportunity  - Single opportunity document from MongoDB
 * @returns {Array} Sorted array of { volunteer, matchScore, breakdown }
 */
function findBestMatches(volunteers, opportunity) {
  const results = [];

  for (const volunteer of volunteers) {
    // --- Calculate individual component scores ---
    const skillScore = calculateSkillScore(
      volunteer.skills,
      opportunity.requiredSkills
    );

    const locationScore = calculateLocationScore(
      volunteer.location,
      opportunity.location
    );

    const availabilityScore = calculateAvailabilityScore(
      volunteer.availability
    );

    // --- Compute weighted composite score ---
    // Weights: Skills 60%, Location 25%, Availability 15%
    const compositeScore =
      skillScore * 0.60 +
      locationScore * 0.25 +
      availabilityScore * 0.15;

    // Convert to percentage (0–100) and round to 1 decimal place
    const matchPercentage = Math.round(compositeScore * 1000) / 10;

    // Only include volunteers with a non-zero match score
    if (matchPercentage > 0) {
      results.push({
        volunteer: {
          _id: volunteer._id,
          name: volunteer.name,
          email: volunteer.email,
          phone: volunteer.phone,
          location: volunteer.location,
          skills: volunteer.skills,
          availability: volunteer.availability,
        },
        matchScore: matchPercentage,
        // Breakdown helps explain WHY a volunteer was matched
        breakdown: {
          skillScore: Math.round(skillScore * 100) / 100,
          locationScore: Math.round(locationScore * 100) / 100,
          availabilityScore: Math.round(availabilityScore * 100) / 100,
        },
      });
    }
  }

  // Sort by match score in descending order (best matches first)
  results.sort((a, b) => b.matchScore - a.matchScore);

  return results;
}

module.exports = { findBestMatches };
