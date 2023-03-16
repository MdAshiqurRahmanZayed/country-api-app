import "./App.css"
import React ,{useState,useEffect} from "react";
import Countries from "./components/Countries";
import Search from "./components/Search";
const url = "https://restcountries.com/v3.1/all";


function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState(countries);

  const fetchData = async (url) => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      setCountries(data);
      setFilteredCountries(data);
      setIsLoading(false);
      setError(null);
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  };
const handleSearch=(searchValue)=>{
    let value = searchValue.toLowerCase();
    const newCountries = countries.filter((country)=>{
     const countryName = country.name.common.toLowerCase()
     return countryName.startsWith(value)
    }) 
    setFilteredCountries(newCountries)
    
}
  useEffect(() => {
    fetchData(url);
  }, []);

  const handleRemoveCountry =(name) =>{
      const filter = filteredCountries.filter((country) => country.name.common !== name)
      setFilteredCountries(filter)
  }
  return (
    <div>

      <h1>Country App</h1>
      <Search onSearch = {handleSearch} />
      {isLoading && <h2>is loading</h2> }

      {error && <h2>{error.message}</h2> }
    {Countries && <Countries countries={filteredCountries} onRemoveCountry = { handleRemoveCountry} />}
    </div>
  );
}

export default App;
