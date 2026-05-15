import './App.css';
import axios from 'axios';
import {useState} from "react";
import ColorPicker from "./helpers/fetchCountry/colorPicker.jsx";
import ConvertToMillions from "./helpers/convertToMillions/convertToMillions.jsx";
import WorldMap from "./assets/world_map.png"

function App() {
    const [countries, setCountries] = useState([])
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [countryInfo, setCountryInfo] = useState({});
    const [searchCountryInfo, setSearchCountryInfo] = useState("")

    const endPoint = 'https://restcountries.com/v3.1/all?fields=name,flags,population,region,cca3'

    function handleSubmit(e){
        e.preventDefault();
        fetchCountry();
    }

    async function fetchCountry(){
        toggleError(false)
        toggleLoading(true)

        try {
            const response = await axios.get(`https://restcountries.com/v3.1/name/${searchCountryInfo}`);
            setCountryInfo(response.data[0])
            setSearchCountryInfo("");
        } catch (e) {
            toggleError(true);
            console.error(e);
        } finally {
            toggleLoading(false);

        }
    }

    async function fetchCountries(){
        toggleError(false)
        toggleLoading(true)
        try {
            const response = await axios.get(endPoint);
            const sortedCountries = response.data.sort((a, b) => {
                if (a.population > b.population){
                    return 1;
                } else if (a.population < b.population){
                    return -1;
                }else
                    return 0;
                });
            setCountries(sortedCountries);
        } catch (e) {
            toggleError(true);
            console.error(e);
        } finally {
            toggleLoading(false);
        }
    }

    return (
        <>
            <header>
                <img src={WorldMap} alt="World map"/>
                <h1>World regions</h1>
            </header>
            <main>
                <button disabled={loading} onClick={fetchCountries}>Klik hier om alle landen te zien</button>

                {countries.map((country) => {
                    return (
                        <article key={country.cca3}>
                            <img src={country.flags} alt="Flag"/>
                            <ColorPicker className={country.region}>{country.name.common}</ColorPicker>
                            <li >has a population of {country.population} people</li>
                        </article>
                    )})}
            </main>
            <footer>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="form-searchCountyInfo">
                        Search Country Info
                        <input type="text"
                               name="searchCountryInfo"
                               id="form-countryInfo"
                               value={searchCountryInfo}
                               onChange={(e)=> setSearchCountryInfo(e.target.value)} />
                    </label>
                    <button type="submit" disabled={loading}>klik hier om info van één land op te halen</button>
                </form>

            {countryInfo.name &&
                <div className="search-section">
                    <p><img src={countryInfo.flags} alt="Flag"/> {countryInfo.name.common}</p>
                    <p>{countryInfo.name.common} is situated in {countryInfo.subregion} and the capital is {countryInfo.capital}</p>
                    <p>It has a population of {ConvertToMillions(countryInfo.population)} million people and it borders with {countryInfo.borders.length} neighboring countries</p>
                </div>
        }
            {error && <p>{searchCountryInfo} bestaat niet. Probeer het opnieuw</p>}
            </footer>
        </>
    )
}

export default App
