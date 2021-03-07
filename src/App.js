import React from 'react';
import './App.css';
import { useEffect, useState } from 'react';
import {mySwal} from './SweetAlert.js';
import { getWeatherData } from './GetWeatherApi.js';
import { WiDaySunny, WiCloudy, WiDayRainWind } from 'react-icons/wi';
import { GiModernCity } from 'react-icons/gi';

// Pseudo Code:
// MVP:
// Create a React weather application where the user can type in their desired city and be provided with results.

// Results will include: 
// Temperature, 
// Conditions such as rain, snow etc.
// Open Weather API will be used for obtaining weather data due to reliability and 			recommendations from fellow Juno Cohort. https://openweathermap.org/api
// API Key has been obtained and will be used for API calls.
// Form Field will include error handling to notify the user if they did not enter in a viable city. This will be accomplished through an alert that is modified using the Sweet Alert JS which can be accessed here if approved: 
// https://sweetalert2.github.io/#download


// Stretch Goals:
// Icons and/or animations for weather conditions (i.e. animated rain cloud for a rainy day) might be implemented in the future.
// Additional data including multi-day forecasts.
// Autocomplete for location including suggestions for city through the use of a second API.
// Additional backgrounds, animated backgrounds, additional graphical icons for styling are being considered to improve aesthetics.
// Toggle for light and dark mode. 


// Main App will house primary JSX

// One js file used for sweet alert error handling - this will run when the user does not enter any city name or one that does not match the information in the API data. This will be exported to main app.js

// Styling will be handled either regular CSS or SCSS (If I can get it running for react).

// handleClick will be the primary and most important event as it will signal to React to call the API and return the relevant weather information from the API.

// Considering a selector for celsius and Farenheit.


// const api = {
//   apiKey: 'b4a714fe3bfd1719fc214f0b9702a68c',
//   url: 'https://api.openweathermap.org/data/2.5/weather/',
// }


function App() {
  // useStates were created here for the weather data from component as well as the search city query.
  // useState was set to null to prevent unnecessary updates.
  const [getWeatherData, setGetWeatherData] = useState(null);
  const [searchCity, setSearchCity] = useState('Toronto');
  const [loading, setLoading] = useState(false);

  const displayWeatherData = async () => {
    try{
      setLoading(true);
      const cityData = await getWeatherData(searchCity);
      setGetWeatherData(cityData);
      // setLoading(false);
    }catch(error) {
      console.log(error.message);
      setLoading(false);
    }
  }

  

  // const savePositionToState = (position) => {
  //   setLatitude(position.coords.latitude);
  //   setLongitude(position.coords.latitude);
  // };

  

  // const searchCity = (event) => {
  //   if (event.apiKey === "Enter") {
  //     fetch(`${api.url}weather?q=${queryCity}&units=metric&APPID=${api.apiKey}`)
  //       .then(response => response.json())
  //       .then(result => {
  //         setWeatherData(result);
  //         setQueryCity('');
  //         console.log(result);
  //       });
  //   }
  // }


// The following useEffect Hook is required to obtain the API data from Open Weather map.
  useEffect( () => {
    displayWeatherData();
    // const apiKey = 'b4a714fe3bfd1719fc214f0b9702a68c';

    // axios({
    //   method: "GET",
    //   url: `https://api.openweathermap.org/data/2.5/weather/`,
    //   dataResponse: "json",
    //   params: {
    //     appid: apiKey,
    //     lang: "en",
    //     units: "metric",
    //     q: 'Toronto',
    //   }
    // }).then( (response) => {
    //   console.log(response);
      
    //   setWeatherData(response.data);
    // });
  // Catch is used to generate an alert if an incompatible city name has been entered. 
  // .catch(error => mySwal({
  //     title: "City Name Not Found",
  //     icon: "error",
  //     text: "Please check your entry and try again!",
  //     timer: 4000,
  //   })
  // );
  },);

  

  return (
    <div className="App wrapper">
      <header>
        <h1 className="mainTitle"> <WiDaySunny /> Today's Weather! <WiCloudy /></h1>
      </header>
      

      <fieldset className="searchForm">
        {/* Text field where user will type in the city for their desired weather forecast */}
        <label htmlFor="searchField" className="searchField sr-only">Enter your city in the search field</label>
        <input type="text"
        className="searchField" 
        placeholder="Enter your city"
        onChange={event => setSearchCity(event.target.value)}
        value={searchCity}
        />

         {/* Once appropriate city name is typed in then user will click button to receive their forecast */}
        <button className="submit" onClick={ () => displayWeatherData()}>Get Forecast</button>
      </fieldset>

      {/* Forecast information will be passed into the following elements and displayed here: */}
      {/* {weatherData( (data) => { */}
      
        <main className="weatherResultsContainer">
          <h2>Forecast</h2>
          <div className="iconImage">
            <WiDayRainWind />
          </div>
          <h3>Cloudy with a chance of rain</h3>
          <div className="temperature">
            <p>22&deg;C</p>
            <p>Feels like: 26&deg;</p>
          </div>
          <div>
            <h4><GiModernCity /> Toronto | Canada</h4>
          </div>
          <div className="temperatureRange">
            <p>High: 20&deg;C || Low: 10&deg;C</p>
            <p>Humidity: 15%</p>
            <p>Wind speed: 5kph</p>
          </div>
        </main>
        
      
      
      {/* <section className="temperature">
        <> 
            <h2>Temperature & Humidity:</h2>    
            <p>Temperature: {weatherData.main.temp}</p>
            <p>Feels like: {weatherData.main.feels_like}</p>
            <p>High: {weatherData.main.temp_max}</p>
            <p>Low: {weatherData.main.temp_min}</p>
            <p>Humidity: {weatherData.main.humidity}</p>
            <p>Atmospheric Pressure: {weatherData.main.pressure}</p>
        </>
      </section> */}
        
      {/* <section className="conditions">
        <h3>Weather Conditions:</h3>
        <div>
          {weatherData.weather[0].main}
          <p>{weatherData.wind.speed} meters/sec</p>
        </div>
      </section> */}
        
      

      <footer>
        <p> Created at <a href="https://www.junocollege.com">Juno College</a> 2021 by <a href="https://github.com/LawrenceLCodes">Lawrence Lee</a></p>
      </footer>
    </div>
    
    );
}


export default App;
