import { useEffect, useState } from 'react'
import './App.css'
import BreweryInfo from './components/BreweryInfo.jsx'

function App() {
  const [list, setList] = useState([])
  const [filteredResults, setFilteredResults] = useState([])
  const [searchInput, setSearchInput] = useState("")
  const [breweryType, setBreweryType] = useState("")

  useEffect(() => {
    const fetchAllBreweryData = async () => {
      const response = await fetch("https://api.openbrewerydb.org/v1/breweries")
      const json = await response.json()
      setList(json)
      setFilteredResults(json)
    }

    fetchAllBreweryData().catch(console.error)
  }, [])

  // Combined filter function
  const filterData = (searchValue, typeValue) => {
    let results = list

    if (typeValue) {
      results = results.filter(item => item.brewery_type === typeValue)
    }

    if (searchValue) {
      results = results.filter(item =>
        [item.name, item.street, item.city, item.state, item.brewery_type]
          .join(" ")
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      )
    }

    setFilteredResults(results)
  }

  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchInput(value)
    filterData(value, breweryType)
  }

  const handleTypeChange = (e) => {
    const value = e.target.value
    setBreweryType(value)
    filterData(searchInput, value)
  }

  return (
    <div className='whole-page'>
      <h1>My Brewery Database</h1>
      <div className="summary-container">
        <div className="summary-box">
          <h3>Total Breweries</h3>
          <p>{list.length}</p>
        </div>
        <div className="summary-box">
          <h3>Currently Showing</h3>
          <p>{filteredResults.length}</p>
        </div>
        <div className="summary-box">
          <h3>Country</h3>
          <p>USA</p>
        </div>
      </div>
      <div>
        <input
          type='text'
          placeholder='Search...'
          value={searchInput}
          onChange={handleSearchChange}
        />

        <select
          name="brewery-type"
          id="brewery-type"
          value={breweryType}
          onChange={handleTypeChange}
        >
          <option value="">All types</option>
          <option value="micro">micro</option>
          <option value="large">large</option>
          <option value="brewpub">brewpub</option>
          <option value="closed">closed</option>
        </select>
      </div>

      <ul>
        <li className="main-list">
          <p>Name</p>
          <p>Type</p>
          <p>Street</p>
          <p>City</p>
          <p>Website URL</p>
        </li>
      </ul>

      <ul>
        {filteredResults
          .filter(b => b.website_url)
          .map((breweryData) => (
            <BreweryInfo
              key={breweryData.id}
              id={breweryData.id}
              type={breweryData.brewery_type}
              name={breweryData.name}
              address={breweryData.address_1}
              city={breweryData.city}
              website={breweryData.website_url}
            />
          ))}
      </ul>
    </div>
  )
}

export default App
