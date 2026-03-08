export interface College {
  name: string
  city: string | null
  state: string | null
  type: CollegeType | null
  fees_ug_inr: string | null
  placement_avg_lpa: string | null
  rating: string | null
  nirf_rank: string | null
}

export type CollegeType =
  | 'IIT'
  | 'NIT'
  | 'IIIT'
  | 'IIM'
  | 'BITS'
  | 'AIIMS'
  | 'NLU'
  | 'Engineering'
  | 'Private'
  | 'Government'
  | 'University'
  | 'Central University'
  | 'State University'
  | 'Medical'

export interface CollegeSearchOptions {
  type?: CollegeType | string
  state?: string
  limit?: number
}

export interface City {
  state: string
  city: string
}

export interface CitySearchOptions {
  state?: string
  limit?: number
}

// ── Colleges ──────────────────────────────────────────────────────────────────

/** Search colleges by name, city, or state */
export function searchColleges(query?: string, options?: CollegeSearchOptions): College[]

/** Get a single college by exact name (case-insensitive) */
export function getCollege(name: string): College | null

/** Get all colleges in a state */
export function getCollegesByState(state: string, options?: Pick<CollegeSearchOptions, 'type'>): College[]

/** Get all colleges of a specific type (e.g. 'IIT', 'NIT', 'Engineering') */
export function getCollegesByType(type: CollegeType | string): College[]

/** Get all unique college types */
export function getCollegeTypes(): string[]

/** Get all states that have at least one college */
export function getCollegeStates(): string[]

/** Get every college — raw array */
export function getAllColleges(): College[]

// ── Cities ────────────────────────────────────────────────────────────────────

/** Get all cities in a state, sorted alphabetically */
export function getCitiesByState(state: string): string[]

/** Get all 36 states + UTs */
export function getStates(): string[]

/** Search cities across India (or within a state) */
export function searchCities(query?: string, options?: CitySearchOptions): City[]

/** Get the full map: { state: city[] } */
export function getCitiesMap(): Record<string, string[]>

export interface School {
  s_no: number
  name: string
  city: string | null
  state: string | null
  board: 'CBSE' | 'ICSE' | 'IB' | string
}

export interface SchoolSearchOptions {
  state?: string
  board?: 'CBSE' | 'ICSE' | 'IB' | string
  limit?: number
}

// ── Schools ───────────────────────────────────────────────────────────────────

/** Search schools by name, city, or state */
export function searchSchools(query?: string, options?: SchoolSearchOptions): School[]

/** Get every school — raw array */
export function getAllSchools(): School[]

declare const _default: {
  searchColleges: typeof searchColleges
  getCollege: typeof getCollege
  getCollegesByState: typeof getCollegesByState
  getCollegesByType: typeof getCollegesByType
  getCollegeTypes: typeof getCollegeTypes
  getCollegeStates: typeof getCollegeStates
  getAllColleges: typeof getAllColleges
  getCitiesByState: typeof getCitiesByState
  getStates: typeof getStates
  searchCities: typeof searchCities
  getCitiesMap: typeof getCitiesMap
  searchSchools: typeof searchSchools
  getAllSchools: typeof getAllSchools
}
export default _default
