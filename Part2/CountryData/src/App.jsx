import { useState, useEffect } from 'react'
import countryService from './services/country'
import weatherService from './services/weather'
import ListLengthCheck from "./components/ListLengthCheck"
import CountryDisplay from "./components/CountryDisplay"
import CountryListDisplay from "./components/CountryListDisplay"
import SearchForm from './components/SearchForm'


function App() {
  const [countries, setCountries] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [specificCountry, setSpecificCountry] = useState([])
  const [weatherCountry, setWeatherCountry] = useState([])

  useEffect(() => {
    countryService
      .getAll()
      .then(response => {
        setCountries(response)
      })
  }, [])

  const { isListOversized, onlyOneCountry, isListEmpty } = ListLengthCheck(countries.filter(country => country.name.common.toLowerCase().includes(searchInput.toLowerCase())).length)

  const handleSearchChange = (event) => {
    event.preventDefault()
    const countryList = countries.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase()))
    if (countryList.length === 1) {
      setSearchInput(event.target.value)
      countryService
        .getDetails(countryList[0].name.common.toLowerCase())
        .then(response => {
          setSpecificCountry(response)
        })
      weatherService
        .getWeather(countryList[0].latlng[0].toFixed(2), countryList[0].latlng[1].toFixed(2))
        .then(response => {
          setWeatherCountry(response)
        })

    } else {
      setSearchInput(event.target.value)
      setSpecificCountry([])
    }
  }

  const showButton = (country) => {
    countryService
      .getDetails(country.name.common.toLowerCase())
      .then(response => {
        setSpecificCountry(response)
        setSearchInput(country.name.common)
      })
    weatherService
      .getWeather(country.latlng[0].toFixed(2), country.latlng[1].toFixed(2))
      .then(response => {
        setWeatherCountry(response)
      })
  }

  if (!isListOversized && !onlyOneCountry && !isListEmpty) {
    return (
      <div>
        <SearchForm
          value={searchInput}
          onChange={handleSearchChange}
        />
        <h2>Results</h2>
        {countries.filter(country => country.name.common.toLowerCase().includes(searchInput.toLowerCase())).map(country =>
          <CountryListDisplay
            key={country.cca2}
            name={country.name.common}
            showButton={() => showButton(country)}
          />
        )}
      </div>
    )
  } else if (onlyOneCountry) {
    if (specificCountry.length != 0 && weatherCountry.length != 0) {
      return (
        <div>
        <SearchForm
          value={searchInput}
          onChange={handleSearchChange}
        />
          <CountryDisplay
            name={specificCountry.name}
            capital={specificCountry.capital}
            area={specificCountry.area}
            languages={Object.values(specificCountry.languages)}
            flags={Object.values(specificCountry.flags)}
            temperature={weatherCountry.current.temp}
            wind={weatherCountry.current.wind_speed}
            imageIcon={weatherCountry.current.weather[0].icon}
          />
        </div>
      )
    }
  } else if (isListOversized) {
    return (
      <div>
        <SearchForm
          value={searchInput}
          onChange={handleSearchChange}
        />
        <h2>Results</h2>
        Too many results, please be more specific
      </div>
    )
  } else {
    return (
      <div>
        <SearchForm
          value={searchInput}
          onChange={handleSearchChange}
        />
        <h2>Results</h2>
        No country name contains these letters in this order
      </div>
    )
  }
}

export default App
