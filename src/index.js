'use strict'

const colleges_raw = require('./colleges.json')
const cities_raw   = require('./cities.json')
const schools_raw  = require('./schools.json')

// ─────────────────────────────────────────────────────────────────────────────
// INTERNAL UTILS
// ─────────────────────────────────────────────────────────────────────────────

function normalize(str) {
  if (!str) return ''
  return str.toLowerCase().trim()
}

function matchesQuery(text, query) {
  if (!query) return true
  const t = normalize(text)
  const q = normalize(query)
  return t.includes(q)
}

// ─────────────────────────────────────────────────────────────────────────────
// COLLEGES API
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Search colleges by name, city, or state.
 *
 * @param {string}  query        - Search term (name, city, or state)
 * @param {Object}  [options]
 * @param {string}  [options.type]  - Filter by type: 'IIT' | 'NIT' | 'IIIT' | 'IIM' |
 *                                    'BITS' | 'AIIMS' | 'NLU' | 'Engineering' |
 *                                    'Private' | 'Government' | 'University' |
 *                                    'Central University' | 'State University' | 'Medical'
 * @param {string}  [options.state] - Filter by state name (exact)
 * @param {number}  [options.limit] - Max results (default: 20)
 * @returns {Array}
 *
 * @example
 * searchColleges('IIT')
 * searchColleges('bangalore', { type: 'Private', limit: 10 })
 * searchColleges('', { state: 'Maharashtra', limit: 50 })
 */
function searchColleges(query = '', options = {}) {
  const { type, state, limit = 20 } = options
  const q = normalize(query)

  let results = colleges_raw.filter(c => {
    if (type  && normalize(c.type)  !== normalize(type))  return false
    if (state && normalize(c.state) !== normalize(state)) return false
    if (!q) return true
    return (
      matchesQuery(c.name,  q) ||
      matchesQuery(c.city,  q) ||
      matchesQuery(c.state, q) ||
      matchesQuery(c.type,  q)
    )
  })

  // rank: name-starts-with first, then name-contains, then rest
  if (q) {
    results = results.sort((a, b) => {
      const as = normalize(a.name).startsWith(q) ? 0 : 1
      const bs = normalize(b.name).startsWith(q) ? 0 : 1
      return as - bs
    })
  }

  return results.slice(0, limit)
}

/**
 * Get a single college by exact name (case-insensitive).
 * @param {string} name
 * @returns {Object|null}
 *
 * @example
 * getCollege('IIT Bombay')
 */
function getCollege(name) {
  const q = normalize(name)
  return colleges_raw.find(c => normalize(c.name) === q) || null
}

/**
 * Get all colleges in a specific state.
 * @param {string} state
 * @param {Object} [options]
 * @param {string} [options.type] - Optional type filter
 * @returns {Array}
 *
 * @example
 * getCollegesByState('Tamil Nadu')
 * getCollegesByState('Karnataka', { type: 'Engineering' })
 */
function getCollegesByState(state, options = {}) {
  return searchColleges('', { state, limit: 9999, ...options })
}

/**
 * Get all colleges of a specific type.
 * @param {string} type  e.g. 'IIT', 'NIT', 'IIM', 'Engineering'
 * @returns {Array}
 *
 * @example
 * getCollegesByType('IIT')
 * getCollegesByType('NIT')
 */
function getCollegesByType(type) {
  return searchColleges('', { type, limit: 9999 })
}

/**
 * Get all unique college types in the dataset.
 * @returns {string[]}
 */
function getCollegeTypes() {
  const types = new Set(colleges_raw.map(c => c.type).filter(Boolean))
  return [...types].sort()
}

/**
 * Get all unique states that have at least one college.
 * @returns {string[]}
 */
function getCollegeStates() {
  const states = new Set(colleges_raw.map(c => c.state).filter(Boolean))
  return [...states].sort()
}

/**
 * Get all colleges — raw array.
 * @returns {Array}
 */
function getAllColleges() {
  return colleges_raw
}

// ─────────────────────────────────────────────────────────────────────────────
// CITIES API
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Get all cities in a state.
 * @param {string} state
 * @returns {string[]}  Array of city names, sorted alphabetically
 *
 * @example
 * getCitiesByState('Maharashtra')  // ['Ahmednagar', 'Akola', 'Amravati', ...]
 */
function getCitiesByState(state) {
  // case-insensitive match
  const key = Object.keys(cities_raw).find(k => normalize(k) === normalize(state))
  return key ? [...cities_raw[key]].sort() : []
}

/**
 * Get all states.
 * @returns {string[]}  All 36 states + UTs, sorted alphabetically
 *
 * @example
 * getStates()  // ['Andaman and Nicobar Islands', 'Andhra Pradesh', ...]
 */
function getStates() {
  return Object.keys(cities_raw).sort()
}

/**
 * Search cities across all states.
 * @param {string}  query
 * @param {Object}  [options]
 * @param {string}  [options.state] - Restrict to one state
 * @param {number}  [options.limit] - Default 20
 * @returns {Array}  Array of { state, city }
 *
 * @example
 * searchCities('Mumbai')
 * searchCities('nagar', { state: 'Maharashtra' })
 */
function searchCities(query = '', options = {}) {
  const { state, limit = 20 } = options
  const q = normalize(query)

  const results = []
  const stateKeys = state
    ? Object.keys(cities_raw).filter(k => normalize(k) === normalize(state))
    : Object.keys(cities_raw).sort()

  for (const s of stateKeys) {
    for (const city of cities_raw[s]) {
      if (!q || normalize(city).includes(q) || normalize(s).includes(q)) {
        results.push({ state: s, city })
        if (results.length >= limit) return results
      }
    }
  }
  return results
}

/**
 * Get the full cities map: { state: [city, city, ...] }
 * @returns {Object}
 */
function getCitiesMap() {
  return cities_raw
}

// ─────────────────────────────────────────────────────────────────────────────
// SCHOOLS API
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Search schools by name, city, or state.
 * @param {string}  query
 * @param {Object}  [options]
 * @param {string}  [options.state] - Filter by state
 * @param {string}  [options.board] - Filter by board: 'CBSE' | 'ICSE' | 'IB'
 * @param {number}  [options.limit] - Default 20
 * @returns {Array}
 *
 * @example
 * searchSchools('Delhi Public')
 * searchSchools('', { state: 'Maharashtra', board: 'ICSE' })
 */
function searchSchools(query = '', options = {}) {
  const { state, board, limit = 20 } = options
  const q = normalize(query)

  let results = schools_raw.filter(s => {
    if (state && normalize(s.state) !== normalize(state)) return false
    if (board && normalize(s.board) !== normalize(board)) return false
    if (!q) return true
    return (
      matchesQuery(s.name,  q) ||
      matchesQuery(s.city,  q) ||
      matchesQuery(s.state, q)
    )
  })

  if (q) {
    results = results.sort((a, b) => {
      const as = normalize(a.name).startsWith(q) ? 0 : 1
      const bs = normalize(b.name).startsWith(q) ? 0 : 1
      return as - bs
    })
  }

  return results.slice(0, limit)
}

/**
 * Get all schools — raw array.
 * @returns {Array}
 */
function getAllSchools() {
  return schools_raw
}

// ─────────────────────────────────────────────────────────────────────────────
// EXPORTS
// ─────────────────────────────────────────────────────────────────────────────

module.exports = {
  // colleges
  searchColleges,
  getCollege,
  getCollegesByState,
  getCollegesByType,
  getCollegeTypes,
  getCollegeStates,
  getAllColleges,

  // cities
  getCitiesByState,
  getStates,
  searchCities,
  getCitiesMap,

  // schools
  searchSchools,
  getAllSchools,
}
