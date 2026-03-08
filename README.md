<div align="center">

<h1>India-Edu-Cities Data</h1>

<p><b>Searchable database of Indian colleges, schools & cities.</b><br/>
1,203 colleges · 247 schools · 4,242 cities — all 36 states & UTs.<br/>
Zero dependencies. Works with CommonJS and ESM.</p>

<br/>

[![npm](https://img.shields.io/npm/v/india-edu-cities-data?style=for-the-badge&color=CB3837&logo=npm&logoColor=white)](https://npmjs.com/package/india-edu-cities-data)
[![npm downloads](https://img.shields.io/npm/dm/india-edu-cities-data?style=for-the-badge&color=CB3837&logo=npm&logoColor=white)](https://npmjs.com/package/india-edu-cities-data)
[![License: MIT](https://img.shields.io/badge/License-MIT-f5a623?style=for-the-badge)](LICENSE)
[![Node](https://img.shields.io/badge/Node.js-≥14-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)

</div>

---

## <img src="images/icons/data.svg" width="20" height="20" valign="middle"/> &nbsp; What's Inside

<table>
<tr>
<td width="33%">

**<img src="images/icons/colleges.svg" width="16" height="16" valign="middle"/> &nbsp; 1,203 Colleges**<br/>
IITs · NITs · IIITs · IIMs · BITS<br/>
AIIMS · NLUs · 480+ Engineering<br/>
With fees, placement LPA, NIRF rank

</td>
<td width="33%">

**<img src="images/icons/schools.svg" width="16" height="16" valign="middle"/> &nbsp; 247 Schools**<br/>
CBSE · ICSE · IB<br/>
31 states covered<br/>
Top institutions nationwide

</td>
<td width="33%">

**<img src="images/icons/cities.svg" width="16" height="16" valign="middle"/> &nbsp; 4,242 Cities**<br/>
Every city in India<br/>
All 36 states & UTs<br/>
Grouped by state

</td>
</tr>
</table>

---

## <img src="images/icons/install.svg" width="20" height="20" valign="middle"/> &nbsp; Install

```bash
npm install india-edu-cities-data
```

---

## <img src="images/icons/api.svg" width="20" height="20" valign="middle"/> &nbsp; Usage

### CommonJS
```js
const { searchColleges, searchSchools, getCitiesByState } = require('india-edu-cities-data')
```

### ESM / React / Vite
```js
import { searchColleges, searchSchools, getCitiesByState } from 'india-edu-cities-data'
```

---

## <img src="images/icons/colleges.svg" width="20" height="20" valign="middle"/> &nbsp; Colleges API

### `searchColleges(query, options?)`

```js
searchColleges('IIT')
// → [{ name: 'IIT Delhi', city: 'New Delhi', state: 'Delhi', type: 'IIT', ... }, ...]

searchColleges('', { type: 'NIT' })
searchColleges('', { state: 'Maharashtra', limit: 30 })
searchColleges('bangalore', { type: 'Private', limit: 10 })
```

| Option | Type | Default | Description |
|---|---|---|---|
| `type` | string | — | Filter by college type |
| `state` | string | — | Filter by state name |
| `limit` | number | `20` | Max results |

---

### `getCollege(name)`

```js
getCollege('IIT Bombay')
// → { name: 'IIT Bombay', city: 'Mumbai', state: 'Maharashtra', type: 'IIT', ... }
```

---

### `getCollegesByState(state, options?)`

```js
getCollegesByState('Tamil Nadu')
getCollegesByState('Karnataka', { type: 'Engineering' })
```

---

### `getCollegesByType(type)`

```js
getCollegesByType('IIT')         // all 23 IITs
getCollegesByType('NIT')         // all 31 NITs
getCollegesByType('IIIT')        // all 20 IIITs
getCollegesByType('IIM')         // all 21 IIMs
getCollegesByType('AIIMS')       // all AIIMS campuses
getCollegesByType('NLU')         // all National Law Universities
getCollegesByType('Engineering') // 480+ engineering colleges
```

---

### `getCollegeTypes()` · `getCollegeStates()` · `getAllColleges()`

```js
getCollegeTypes()   // → ['AIIMS', 'BITS', 'Engineering', 'IIM', 'IIT', 'IIIT', ...]
getCollegeStates()  // → ['Andhra Pradesh', 'Assam', 'Bihar', ...]
getAllColleges()     // → full array of 1,203 colleges
```

---

### College Object Shape

```ts
{
  name:               string        // "IIT Bombay"
  city:               string | null // "Mumbai"
  state:              string | null // "Maharashtra"
  type:               string | null // "IIT"
  fees_ug_inr:        number | null // 228000
  placement_avg_lpa:  number | null // 21.82
  rating:             number | null // 8.9
  nirf_rank:          number | null // 3
}
```

---

## <img src="images/icons/schools.svg" width="20" height="20" valign="middle"/> &nbsp; Schools API

### `searchSchools(query, options?)`

```js
searchSchools('Delhi Public')
// → [{ name: 'Delhi Public School R.K. Puram', city: 'New Delhi', state: 'Delhi', board: 'CBSE' }, ...]

searchSchools('', { board: 'ICSE' })
searchSchools('', { state: 'Uttar Pradesh', board: 'ICSE', limit: 10 })
```

| Option | Type | Default | Description |
|---|---|---|---|
| `state` | string | — | Filter by state name |
| `board` | string | — | `'CBSE'` \| `'ICSE'` \| `'IB'` |
| `limit` | number | `20` | Max results |

---

### `getAllSchools()`

```js
getAllSchools() // → full array of 247 schools
```

---

### School Object Shape

```ts
{
  s_no:   number        // 1
  name:   string        // "Delhi Public School R.K. Puram"
  city:   string | null // "New Delhi"
  state:  string | null // "Delhi"
  board:  string        // "CBSE" | "ICSE" | "IB"
}
```

---

## <img src="images/icons/cities.svg" width="20" height="20" valign="middle"/> &nbsp; Cities API

### `getCitiesByState(state)`

```js
getCitiesByState('Maharashtra')
// → ['Ahmednagar', 'Akola', 'Amravati', 'Aurangabad', 'Mumbai', 'Nagpur', 'Pune', ...]
```

---

### `getStates()`

```js
getStates()
// → ['Andaman and Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh', ...]
```

---

### `searchCities(query, options?)`

```js
searchCities('nagar')
// → [{ state: 'Maharashtra', city: 'Ahmednagar' }, ...]

searchCities('nagar', { state: 'Rajasthan', limit: 5 })
```

---

### `getCitiesMap()`

```js
const map = getCitiesMap()
map['Rajasthan'] // → ['Ajmer', 'Alwar', 'Barmer', 'Bikaner', 'Jaipur', ...]
```

---

## <img src="images/icons/search.svg" width="20" height="20" valign="middle"/> &nbsp; Real-world Example

```js
import { searchColleges, searchSchools, getCitiesByState, getStates } from 'india-edu-cities-data'

// Autocomplete: user types "vit"
const colleges = searchColleges('vit', { limit: 5 })
// → VIT Vellore, VIT Chennai, VIT Bhopal, VIT AP Amaravati

// ICSE schools in UP
const schools = searchSchools('', { state: 'Uttar Pradesh', board: 'ICSE' })

// Load cities when user picks a state
const cities = getCitiesByState('Uttar Pradesh')

// All states for a dropdown
const states = getStates()
```

---

## <img src="images/icons/data.svg" width="20" height="20" valign="middle"/> &nbsp; Data Files

| File | Rows | Contents |
|---|---|---|
| `india_colleges.csv` | 1,203 | name, city, state, type, fees (INR), avg placement LPA, rating, NIRF rank |
| `india_schools.csv` | 247 | name, city, state, board (CBSE / ICSE / IB) |
| `india_cities.csv` | 4,242 | state, city |

---

*Built for [Student Shop](https://github.com/io-PEAK/student-shop) — a campus marketplace for Indian students.*
