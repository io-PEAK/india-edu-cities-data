// ESM wrapper — enables: import { searchColleges } from 'india-institutions'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const lib = require('./index.js')

export const searchColleges    = lib.searchColleges
export const getCollege        = lib.getCollege
export const getCollegesByState = lib.getCollegesByState
export const getCollegesByType  = lib.getCollegesByType
export const getCollegeTypes   = lib.getCollegeTypes
export const getCollegeStates  = lib.getCollegeStates
export const getAllColleges     = lib.getAllColleges

export const getCitiesByState  = lib.getCitiesByState
export const getStates         = lib.getStates
export const searchCities      = lib.searchCities
export const getCitiesMap      = lib.getCitiesMap

export const searchSchools     = lib.searchSchools
export const getAllSchools      = lib.getAllSchools

export default lib
