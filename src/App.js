import React from 'react';
import './App.css';
import { useEffect, useState } from 'react';
import PacmanLoader from 'react-spinners/PacmanLoader';
import axios from 'axios';
import {mySwal} from './SweetAlert.js';
import { getWeatherData } from './GetWeatherApi.js';
import { WiDaySunny, WiCloudy } from 'react-icons/wi';
import { GiModernCity } from 'react-icons/gi';
import { GiAtom, GiSpaceship } from 'react-icons/gi';
import { FaTemperatureHigh, FaTemperatureLow } from 'react-icons/fa';

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
  // Initializae useState for API data.
  const [weatherData, setWeatherData] = useState(null);
  // useState for saving input from the user and returning a value based on the city that the user typed in the search field.
  const [searchCity, setSearchCity] = useState('Toronto');
  const [textInput, setTextInput] = useState('');
  const [loading, setLoading] = useState(false);


  // function handleClick(event) {
  //   event.preventDefault();
  // }

  // const getCityWeather = async () => {
  //   try {
  //     setLoading(true);
  //     const cityData = await weatherData(textInput);
  //     setWeatherData(cityData);
  //   } catch(error) {
  //     console.log(error.message);
  //     setLoading(false);
  //   }
  // }
  // storing styling information inside a variable for loading animation as per react-spinners documentation https://www.npmjs.com/package/react-spinners
  const override = `
    display: block;
    margin: 0 auto;
    border-color: sky-blue;
  `; 

  // const displayWeatherData = async () => {
  //   try{
  //     setLoading(true);
  //     const cityData = await getWeatherData(searchCity);
  //     setGetWeatherData(cityData);
  //     // setLoading(false);
  //   }catch(error) {
  //     console.log(error.message);
  //     setLoading(false);
  //   }
  // }

  

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
    // Store API Key in a variable: 
    const apiKey = 'b4a714fe3bfd1719fc214f0b9702a68c';

    // Use Axios to handle API request from URL endpoint and include search params.
    axios({
      method: "GET",
      url: `https://api.openweathermap.org/data/2.5/weather/`,
      dataResponse: "json",
      params: {
        appid: apiKey,
        lang: "en",
        units: "metric",
        q: searchCity,
      }
    }).then( (response) => {
      console.log(response);
      setWeatherData(response.data);
    }).catch(error => {
      return alert('You have entered in a city name which is incompatible, please try again!');
    })
  
  // Catch is used to generate an alert if an incompatible city name has been entered. 
  // .catch(error => mySwal({
  //     title: "City Name Not Found",
  //     icon: "error",
  //     text: "Please check your entry and try again!",
  //     timer: 4000,
  //   })
  // );
  }, [searchCity]);


  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchCity(textInput);
    setTextInput('');
  }

  return (
    <div className="App wrapper">
      <header>
        <h1 className="mainTitle"> <WiDaySunny /> Today's Weather! <WiCloudy /></h1>
      </header>
      

      <form className="searchForm" onSubmit={handleSubmit}>
        {/* Text field where user will type in the city for their desired weather forecast */}
        <label htmlFor="searchField" className="searchField sr-only">Enter your city in the search field</label>
        <input type="text"
        className="searchField" 
        placeholder="Enter your city"
        onChange={ (event) => setTextInput(event.target.value) }
        value={textInput}
        />

         {/* Once appropriate city name is typed in then user will click button to receive their forecast */}
        <button className="submit" >Get Forecast</button>
      </form>

      {/* Loading container for animation to display until site is fully loaded */}
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
        
      

      <footer className="footer">
        <p><GiAtom /> Created at <a href="https://www.junocollege.com">Juno College</a> 2021 by <a href="https://github.com/LawrenceLCodes">Lawrence Lee</a> <GiSpaceship /></p>
      </footer>
    </div>
    
    );
}


export default App;
