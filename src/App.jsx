import './App.css';
import axios from 'axios';
import {useState} from "react";
import ColorPicker from "./helpers/fetchCountry/colorPicker.jsx";



function App() {
    const [countries, setCountries] = useState([])
    // const [country, setCountry] = useState("");
    // const [population, setPopulation] = useState("");
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    // const [region, setRegion] = useState('');
    // const [flag, setFlag] = useState('');

    const endPoint = 'https://restcountries.com/v3.1/all?fields=name,flags,population,region'


    async function consoleLogger() {
        const response = await axios.get(endPoint);
        console.log(response.data)
        }

    async function fetchCountry(){
        toggleError(false)
        toggleLoading(true)

        try {
            const response = await axios.get(endPoint);

            setCountries(response.data);

            // setCountry(response.data[0].name.common);
            // setPopulation(response.data[0].population);
            // setRegion(response.data[0].region);
            // setFlag(response.data[0].flags.png);

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
                        <>
                        <article>
{/*nog regelen dat er een speciale key is!!!!*/}
                            <img src={country.flag} alt="Vlag"/>
                            <ColorPicker className={country.region}>{country.name.common}</ColorPicker>
                            <li>has a population of {country.population} people</li>
                    </article>
                        </>
                    )})}
                    {error && <p>er is iets mis gegaan</p>}
            </main>
        </>
    )
}

export default App
