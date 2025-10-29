import { useEffect, useState } from 'react'
import './App.css'
import BreweryInfo from './components/BreweryInfo.jsx'

function App() {
  const [list, setList] = useState(null)
  const [filteredResults, setFilteredResults] = useState([])
  const [searchInput, setSearchInput] = useState("")

  useEffect(() => {
    const fetchAllBreweryData = async () => {
      const response = await fetch(
        "https://api.openbrewerydb.org/v1/breweries"
      )
      const json = await response.json()
      setList(json)
    }

    fetchAllBreweryData().catch(console.error)
  }, [])

  const searchItems = searchValue => {
    setSearchInput(searchValue)
    if (searchValue !== "") {
      const filteredData = list.filter((item) =>
        [item.name, item.address, item.city, item.brewery_type]
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      )
      setFilteredResults(filteredData)
      console.log(filteredData)
    } else {
      setFilteredResults(list)
    }
  }


  return (
    <div className='whole-page'>
      <h1>My Brewery Database</h1>
      <input
        type='text'
        placeholder='Search...'
        onChange={(inputString) => searchItems(inputString.target.value)}
      />
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
        {searchInput.length > 0
          ? filteredResults
            .map((breweryData) => {
              if (breweryData.website_url != null) {
                return (
                  <BreweryInfo
                    key={breweryData.id}
                    id={breweryData.id}
                    type={breweryData.brewery_type}
                    name={breweryData.name}
                    address={breweryData.address_1}
                    city={breweryData.city}
                    website={breweryData.website_url}
                  />
                )
              }
              return null
            })
          : list?.filter(breweryData => breweryData.website_url != null)
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