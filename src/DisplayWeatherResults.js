

import { useState } from 'react';
import PacmanLoader from 'react-spinners/PacmanLoader';
import { GiModernCity } from 'react-icons/gi';
import { FaTemperatureHigh, FaTemperatureLow } from 'react-icons/fa';


const [weatherData, setWeatherData] = useState(null);
const [loading, setLoading] = useState(false);

// Storing styling information inside a variable for loading animation as per react-spinners documentation https://www.npmjs.com/package/react-spinners
const override = `
    display: block;
    margin: 0 auto;
    border-color: sky-blue;
`;

const DisplayWeatherResults = (props) => {
    const { allWeatherResults } = props;
    // Loading container for animation to display until site is fully loaded
    <>
      {loading ? (
        <div className="loaderContainer">
          <PacmanLoader css={override} size={50} color={'#e61809'} loading={loading} />
        </div>
      ) :( 
      <>
      {/* Conditional was required over container for API as large data request slowed down data response and led to page errors. This error checks uses the initial null state for useState and then checks that it is truthy to access the rest of the object API information when it is updated.  */}
      {/* Forecast information will be passed into the following elements and displayed within the main container */}
      {weatherData !== null ? (
        <main className="weatherResultsContainer">
          <h2>Forecast</h2>
          <div className="iconImage">
            <img src={`https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} alt="imageicon"/>
          </div>
          <div className="temperature">
            <p>Temp: {parseFloat(weatherData.main.temp).toFixed(1)} &deg;C</p>
            <p>Feels like: {parseFloat(weatherData.main.feels_like).toFixed(1)} &deg;C</p>
          </div>
          <div className="temperatureRange">
            <p><FaTemperatureHigh /> {parseFloat(weatherData.main.temp_max).toFixed(1)} &deg;C  ||  <FaTemperatureLow /> {parseFloat(weatherData.main.temp_min).toFixed(1)} &deg;C</p>
            <p>Humidity: {weatherData.main.humidity} %</p>
            <p>Wind speed: {weatherData.wind.speed} meters/sec</p>
          </div>
          <div>
            <h3><GiModernCity /> {weatherData.name} | {weatherData.sys.country}</h3>
          </div>
        </main>
      ) : null}
      </>
      )}
    </>
}

export default DisplayWeatherResults;
