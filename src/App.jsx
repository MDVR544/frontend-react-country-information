import './App.css';
import axios from 'axios';
import {useState} from "react";
import ColorPicker from "./helpers/fetchCountry/colorPicker.jsx";
import ConvertToMillions from "./helpers/convertToMillions/convertToMillions.jsx";

function App() {
    const [countries, setCountries] = useState([])
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [countryInfo, setCountryInfo] = useState({});
    const [searchCountryInfo, setSearchCountryInfo] = useState("")

    const endPoint = 'https://restcountries.com/v3.1/all?fields=name,flags,population,region,cca3'

    async function consoleLogger() {
        const response = await axios.get('https://restcountries.com/v3.1/all?fields=name,flags,population,region,cca3');
        console.log(response.data)
    }

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
            <nav>
                <button onClick={consoleLogger}>Console Log</button>
                <button disabled={loading} onClick={fetchCountries}>Klik hier om alle landen te zien</button>
            </nav>
            <main>
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
            <div>
                <p><img src={countryInfo.flag} alt="Flag"/> {countryInfo.name.common}</p>
                <p>{countryInfo.name.common} is situated in {countryInfo.subregion} and the capital is {countryInfo.capital}</p>
                <p>It has a population of {ConvertToMillions(countryInfo.population)} million people and it borders with {countryInfo.borders.length} neighboring countries</p>
            </div>
        }
                {error && <p>{searchCountryInfo} bestaat niet. Probeer het opnieuw</p>}

                {countries.map((country) => {
                    return (
                        <article key={country.cca3}>
                            <img src={country.flag} alt="Flag"/>
                            <ColorPicker className={country.region}>{country.name.common}</ColorPicker>
                            <li >has a population of {country.population} people</li>
                        </article>
                            )})}
            </main>
        </>
    )
}

export default App
