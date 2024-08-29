const CountryDisplay = ({ name, capital, area, languages, flags, temperature, wind, imageIcon}) => {   
    const imgURL = "https://openweathermap.org/img/wn/"+imageIcon+"@2x.png"   
    const flagStyle = {
        border: 'solid black',
        borderWidth: 'thin',
        width: 300
    }
    return (
        <>
            <h2>{name.common}</h2>
            <div>The capital is {capital}</div>
            <div>The area is {area} square meters</div>
            <h3>Languages</h3>
            {languages.map(language =>
                <div key={language}>
                    {language}
                </div>
            )}
            <br></br>
            <img
                src={flags[0]}
                srcSet={flags[1]}
                alt="The country's flag"
                style={flagStyle}

            />
            <div>Temperature is {temperature.toFixed(2)}° Celsius</div>
            <img
                src={imgURL}
                alt="the weather icon"
            />
            <div>Wind speed is currently {wind.toFixed(2)}m/s</div>
        </>
    )
}




export default CountryDisplay