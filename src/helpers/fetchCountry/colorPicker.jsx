import './colorPicker.css'

function ColorPicker({ className, children }) {
    let region;
    if (className === 'Africa'){
        region = 'Africa';
    } else if (className === 'Americas'){
        region = 'Americas'
    } else if (className === 'Asia'){
        region = 'Asia'
    } else if (className === 'Europe'){
        region = 'Europe'
    } else if (className === 'Oceania'){
        region = 'Oceania'
    } else {
        region = 'Other'
    }

    return (
       <li className={region}>{children}</li>
    );
}

export default ColorPicker



// <article>
// {flag && <img src={flag} alt="Vlag"/>}
// {country && <ColorPicker className={region}>{country}</ColorPicker>}
// {population && <li>has a population of {population} people</li>}
// {error && <p>er is iets mis gegaan</p>}
// </article>
