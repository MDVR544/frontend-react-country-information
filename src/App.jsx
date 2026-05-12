import './App.css';
import axios from 'axios';
import {useState} from "react";



function App() {
    const [country, setCountry] = useState("");
    const [population, setPopulation] = useState(0);

    const endPoint = 'https://restcountries.com/v3.1/all?fields=name,flags,population';

async function fetchData(){
    const response = await axios.get(endPoint)

 console.log(response)
        setCountry(response.data[0].name.common);
        setPopulation(response.data[0].population);
}


return (
        <>
            Maak je applicatie hier!
            <button onClick={fetchData}>Klik hier!</button>
            <li>{country}, has a population of {population} people</li>
        </>
    )
}

export default App
