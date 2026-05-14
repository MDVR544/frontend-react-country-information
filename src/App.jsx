import './App.css';
import axios from 'axios';
import {useState} from "react";
import ColorPicker from "./helpers/fetchCountry/colorPicker.jsx";

function App() {
    const [countries, setCountries] = useState([])
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [countryInfo, setCountryInfo] = useState({});

    const endPoint = 'https://restcountries.com/v3.1/all?fields=name,flags,population,region,cca3'

    async function consoleLogger() {
        const response = await axios.get('https://restcountries.com/v3.1/name/netherlands');
        console.log(response.data)
        console.log(response.data[1].capital)

    }


    async function fetchCountry(){
        toggleError(false)
        toggleLoading(true)
        try {
            const response = await axios.get('https://restcountries.com/v3.1/name/netherlands');
            setCountryInfo(response.data[1])
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

            <main>
                <button onClick={consoleLogger}>Console Log</button>

                <button disabled={loading} onClick={fetchCountry}>klik hier om info van één land op te halen</button>
                {countryInfo.name && <p><img src={countryInfo.flag} alt="Flag"/> {countryInfo.name.common}</p>}
                {countryInfo.name && <p>{countryInfo.name.common} is situated in {countryInfo.subregion} and the capital is {countryInfo.capital}</p>}

                <button disabled={loading} onClick={fetchCountries}>Klik hier! om je land op te halen</button>
                {countries.map((country) => {
                    return (
                        <article key={country.cca3}>
                            <img src={country.flag} alt="Flag"/>
                            <ColorPicker className={country.region}>{country.name.common}</ColorPicker>
                            <li >has a population of {country.population} people</li>
                        </article>
                            )})}
                {error && <p>er is iets mis gegaan</p>}
            </main>
        </>
    )
}

export default App
