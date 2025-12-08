/**
 * Matching Algorithm for SilverGuide
 * 
 * Matches seniors with volunteers based on:
 * 1. HARD FILTERS (must match at least one):
 *    - helpNeeded ↔ helpsWith (what help they need vs what volunteer offers)
 *    - availability overlap (when they're free vs when volunteer is available)
 * 
 * 2. SOFT SCORING (for ranking):
 *    - Shared interests (weighted by number of matches)
 *    - Language overlap (bonus if they share languages)
 *    - Help category depth (more matching categories = higher score)
 * 
 * The score is INTERNAL ONLY - not shown to users.
 */

/**
 * Calculate shared interests between user and volunteer
 * @param {string[]} userInterests 
 * @param {string[]} volunteerInterests 
 * @returns {string[]} Array of shared interests
 */
function getSharedInterests(userInterests = [], volunteerInterests = []) {
  const safeUserInterests = Array.isArray(userInterests) ? userInterests : [];
  const safeVolunteerInterests = Array.isArray(volunteerInterests) ? volunteerInterests : [];
  
  const userSet = new Set(safeUserInterests.map(i => i.toLowerCase().trim()));
  return safeVolunteerInterests.filter(vi => userSet.has(vi.toLowerCase().trim()));
}

/**
 * Check if user availability overlaps with volunteer availability
 * @param {object} userAvailability - { text: string, checks: { weekdays, weekends, mornings, afternoons, evenings } }
 * @param {string[]} volunteerAvailability - e.g. ['Weekdays', 'Mornings', 'Afternoons']
 * @returns {boolean}
 */
function hasAvailabilityOverlap(userAvailability = {}, volunteerAvailability = []) {
  const safeUserAvailability = userAvailability || {};
  const safeVolunteerAvailability = Array.isArray(volunteerAvailability) ? volunteerAvailability : [];

  const rawChecks = safeUserAvailability.checks || {};
  // Normalize keys to lowercase to handle potential casing issues
  const checks = {};
  Object.keys(rawChecks).forEach(key => {
    checks[key.toLowerCase()] = rawChecks[key];
  });

  const volAvail = new Set(safeVolunteerAvailability.map(a => a.toLowerCase()));
  
  // Check each user availability preference against volunteer
  if (checks.weekdays && volAvail.has('weekdays')) return true;
  if (checks.weekends && volAvail.has('weekends')) return true;
  if (checks.mornings && volAvail.has('mornings')) return true;
  if (checks.afternoons && volAvail.has('afternoons')) return true;
  if (checks.evenings && volAvail.has('evenings')) return true;
  
  // If user has no specific checks, accept any volunteer
  const hasAnyChecks = Object.values(checks).some(v => v === true);
  if (!hasAnyChecks) return true;
  
  return false;
}

/**
 * Check if volunteer can help with what user needs
 * @param {string[]} userHelpNeeded - e.g. ['Companionship', 'Tech Support']
 * @param {string[]} volunteerHelpsWith - e.g. ['Tech Support', 'Companionship']
 * @returns {string[]} Array of matching help categories
 */
function getHelpOverlap(userHelpNeeded = [], volunteerHelpsWith = []) {
  const safeUserHelpNeeded = Array.isArray(userHelpNeeded) ? userHelpNeeded : [];
  const safeVolunteerHelpsWith = Array.isArray(volunteerHelpsWith) ? volunteerHelpsWith : [];

  const userSet = new Set(safeUserHelpNeeded.map(h => h.toLowerCase().trim()));
  return safeVolunteerHelpsWith.filter(vh => userSet.has(vh.toLowerCase().trim()));
}

/**
 * Check if user and volunteer share any languages
 * @param {string[]} userLanguages 
 * @param {string[]} volunteerLanguages 
 * @returns {string[]} Array of shared languages
 */
function getSharedLanguages(userLanguages = [], volunteerLanguages = []) {
  // Handle string input (e.g. "English, Spanish") or array input
  let safeUserLanguages = [];
  if (Array.isArray(userLanguages)) {
    safeUserLanguages = userLanguages;
  } else if (typeof userLanguages === 'string') {
    safeUserLanguages = userLanguages.split(',').map(l => l.trim()).filter(Boolean);
  }

  const safeVolunteerLanguages = Array.isArray(volunteerLanguages) ? volunteerLanguages : [];

  const userSet = new Set(safeUserLanguages.map(l => l.toLowerCase().trim()));
  return safeVolunteerLanguages.filter(vl => userSet.has(vl.toLowerCase().trim()));
}

/**
 * Calculate internal match score (not shown to user)
 * @param {object} volunteer 
 * @param {object} userProfile 
 * @returns {number} Score from 0-100
 */
function calculateMatchScore(volunteer, userProfile) {
  let score = 0;
  
  // 1. Help category matches (max 35 points)
  const helpMatches = getHelpOverlap(userProfile.helpNeeded, volunteer.helpsWith);
  if (helpMatches.length > 0) {
    // Base points for having at least one match
    score += 20;
    // Bonus for additional matches (up to 15 more points)
    score += Math.min(helpMatches.length - 1, 3) * 5;
  }
  
  // 2. Shared interests (max 35 points)
  const sharedInterests = getSharedInterests(userProfile.interests, volunteer.interests);
  if (sharedInterests.length > 0) {
    // Base points for having at least one shared interest
    score += 15;
    // Bonus for additional shared interests (up to 20 more points)
    score += Math.min(sharedInterests.length - 1, 4) * 5;
  }
  
  // 3. Language match (max 15 points)
  const sharedLanguages = getSharedLanguages(userProfile.languages, volunteer.languages);
  if (sharedLanguages.length > 0) {
    score += 10;
    // Bonus for multiple shared languages
    score += Math.min(sharedLanguages.length - 1, 1) * 5;
  }
  
  // 4. Availability overlap bonus (max 15 points)
  if (hasAvailabilityOverlap(userProfile.availability, volunteer.availability)) {
    score += 15;
  }
  
  return Math.min(score, 100);
}

/**
 * Main matching function
 * 
 * @param {object[]} volunteers - Array of volunteer objects from mockVolunteers
 * @param {object} userProfile - User profile object with:
 *   - helpNeeded: string[] (e.g. ['Companionship', 'Tech Support'])
 *   - interests: string[] (e.g. ['Reading', 'Gardening'])
 *   - availability: { text: string, checks: { weekdays, weekends, mornings, afternoons, evenings } }
 *   - languages: string[] (optional)
 * @param {object} options - Optional settings
 *   - minScore: number (default 0) - Minimum score threshold
 *   - maxResults: number (default all) - Limit number of results
 *   - requireHelpMatch: boolean (default true) - Require at least one help category match
 *   - requireAvailabilityMatch: boolean (default true) - Require availability overlap
 * 
 * @returns {object[]} Matched volunteers with sharedInterests added, sorted by score (score not included)
 */
export function matchVolunteers(volunteers, userProfile, options = {}) {
  const {
    minScore = 0,
    maxResults = undefined,
    requireHelpMatch = true,
    requireAvailabilityMatch = true
  } = options;
  
  // If no user profile provided, return all volunteers
  if (!userProfile) {
    return volunteers;
  }
  
  // Step 1: Apply hard filters
  let filtered = volunteers.filter(volunteer => {
    // Check help category overlap (hard filter if enabled)
    if (requireHelpMatch && userProfile.helpNeeded?.length > 0) {
      const helpMatches = getHelpOverlap(userProfile.helpNeeded, volunteer.helpsWith);
      if (helpMatches.length === 0) return false;
    }
    
    // Check availability overlap (hard filter if enabled)
    if (requireAvailabilityMatch && userProfile.availability?.checks) {
      if (!hasAvailabilityOverlap(userProfile.availability, volunteer.availability)) {
        return false;
      }
    }
    
    return true;
  });
  
  // Step 2: Score and enrich each volunteer
  let scored = filtered.map(volunteer => {
    const score = calculateMatchScore(volunteer, userProfile);
    const sharedInterests = getSharedInterests(userProfile.interests, volunteer.interests);
    
    return {
      ...volunteer,
      sharedInterests, // This is displayed on the card
      _score: score    // Internal only, will be removed before returning
    };
  });
  
  // Step 3: Apply minimum score filter
  scored = scored.filter(v => v._score >= minScore);
  
  // Step 4: Sort by score (highest first)
  scored.sort((a, b) => b._score - a._score);
  
  // Step 5: Limit results if specified
  if (maxResults && maxResults > 0) {
    scored = scored.slice(0, maxResults);
  }
  
  // Step 6: Remove internal score before returning (score is internal only!)
  return scored.map(({ _score, ...volunteer }) => volunteer);
}

/**
 * Fallback matching when hard filters return no results
 * Uses soft scoring only to find best available matches
 */
export function matchVolunteersSoft(volunteers, userProfile, options = {}) {
  return matchVolunteers(volunteers, userProfile, {
    ...options,
    requireHelpMatch: false,
    requireAvailabilityMatch: false
  });
}

/**
 * Get match statistics (for debugging/testing)
 */
export function getMatchStats(volunteers, userProfile) {
  const all = volunteers.map(v => ({
    name: v.name,
    score: calculateMatchScore(v, userProfile),
    helpMatches: getHelpOverlap(userProfile.helpNeeded, v.helpsWith),
    sharedInterests: getSharedInterests(userProfile.interests, v.interests),
    availabilityMatch: hasAvailabilityOverlap(userProfile.availability, v.availability)
  }));
  
  return all.sort((a, b) => b.score - a.score);
}
