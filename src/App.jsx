import './App.css';
import axios from 'axios';
import {useState} from "react";
import ColorPicker from "./helpers/fetchCountry/colorPicker.jsx";

function App() {
    const [countries, setCountries] = useState([])
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    const endPoint = 'https://restcountries.com/v3.1/all?fields=name,flags,population,region,cca3'

    async function consoleLogger() {
        const response = await axios.get(endPoint);
        console.log(response.data)
    }

    async function fetchCountry(){
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
                <button disabled={loading} onClick={fetchCountry}>Klik hier! om je land op te halen</button>
                {countries.map((country) => {
                    return (
                        <article key={country.cca3}>
                            <img src={country.flag} alt="Vlag"/>
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
