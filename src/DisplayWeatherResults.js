// Component with weather results container that is used to hold and display API data after user has typed in their desired city in the search field

import { useState } from 'react';
import PacmanLoader from 'react-spinners/PacmanLoader';
import { GiModernCity } from 'react-icons/gi';
import { FaTemperatureHigh, FaTemperatureLow } from 'react-icons/fa';


const DisplayWeatherResults = (props) => {
  // useState initialization for loading mechanism so that animation will run if API data takes a long time to generate onto page.
  const [loading, setLoading] = useState(false);
  // Storing styling information inside a variable for loading animation as per react-spinners documentation https://www.npmjs.com/package/react-spinners
  const override = `
      display: block;
      margin: 0 auto;
      border-color: sky-blue;
  `;

  const { allWeatherResults } = props;
    
  return (
    // Loading container for animation to display until site is fully loaded  
    <>
      {loading ? (
        <div className="loaderContainer">
          <PacmanLoader css={override} size={50} color={'#e61809'} loading={loading} />
        </div>
      ) :( 
      <>
        {/* Conditional was required over container for API as large data request slowed down data response and led to page errors. This error check uses the initial null state for useState and then checks that it is truthy to access the rest of the object API information when it is updated.  */}
        {/* Forecast information will be passed into the following elements and displayed within the main container */}
        {allWeatherResults !== null ? (
          <main className="weatherResultsContainer">
            <h2>Forecast</h2>
            <div className="iconImage">
              <img src={`https://openweathermap.org/img/w/${allWeatherResults.weather[0].icon}.png`} alt="imageicon"/>
            </div>
            <div className="temperature">
              <p>Temp: {parseFloat(allWeatherResults.main.temp).toFixed(1)} &deg;C</p>
              <p>Feels like: {parseFloat(allWeatherResults.main.feels_like).toFixed(1)} &deg;C</p>
            </div>
            <div className="temperatureRange">
              <p><FaTemperatureHigh /> {parseFloat(allWeatherResults.main.temp_max).toFixed(1)} &deg;C  ||  <FaTemperatureLow /> {parseFloat(allWeatherResults.main.temp_min).toFixed(1)} &deg;C</p>
              <p>Humidity: {allWeatherResults.main.humidity} %</p>
              <p>Wind speed: {allWeatherResults.wind.speed} meters/sec</p>
            </div>
            <div>
              <h3><GiModernCity /> {allWeatherResults.name} | {allWeatherResults.sys.country}</h3>
            </div>
          </main>
        ) : null}
      </>

      )}
    </>
  )
}

export default DisplayWeatherResults;
