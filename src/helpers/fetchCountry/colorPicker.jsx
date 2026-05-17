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




