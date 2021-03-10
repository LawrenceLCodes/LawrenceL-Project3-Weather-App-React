// Pseudo Code:
// MVP:
// Create a React weather application where the user can type in their desired city and be provided with results.
// base url: 'https://api.openweathermap.org/data/2.5/weather/',

// Results will include: 
// Temperature, conditions such as rain, snow, clouds etc.
// API Key has been obtained and will be used for API calls.
// Form Field will include error handling to notify the user if they did not enter in a viable city. This will be accomplished through an alert that is modified using the Sweet Alert JS which can be accessed here if approved: 
// https://sweetalert2.github.io/#download

// Stretch Goals:
// Icons and/or animations for weather conditions (i.e. animated rain cloud for a rainy day) might be implemented in the future.
// Multi-day forecasts.
// Autocomplete for location including suggestions for city through the use of a second API.
// Additional backgrounds, animated backgrounds, additional graphical icons for styling are being considered to improve aesthetics.
// Toggle for light and dark mode. 
// A selector to toggle between Celsius and Farenheit.
// One js file used for sweet alert error handling - this will run when the user does not enter any city name or one that does not match the information in the API data. This will be exported to main app.js.

import React from 'react';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { WiDaySunny, WiCloudy } from 'react-icons/wi';
import { GiAtom, GiSpaceship } from 'react-icons/gi';
import UserSelectCity from './UserSelectCity.js';
import DisplayWeatherResults from './DisplayWeatherResults.js';


function App() {
  // useStates were created here for the weather data from component as well as the search city query.
  // Initializae useState for API data.
  // useState for saving input from the user and returning a value based on the city that the user typed in the search field.
  const [weatherData, setWeatherData] = useState(null);
  const [searchCity, setSearchCity] = useState('Toronto');


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
      setWeatherData(response.data);
    }).catch(error => {
      return alert('You have entered in a city name which is incompatible, please try again!');
    })
  // Catch is used to generate an alert if an incompatible city name has been entered.
  }, [searchCity]);


  // cityResults variable is defined here.
  const cityResults = (userCity) => {
    setSearchCity(userCity);
  }


  return (
    <>
      <div className="App wrapper">
        <header>
          <h1 className="mainTitle"> <WiDaySunny /> Today's Weather! <WiCloudy /></h1>
        </header>
      
        {/* This is used so that UserSelectCity.js can pass through the event from the form in that component to here as events flow up from the child on that form: */}
        <UserSelectCity cityResults={cityResults} />

        <DisplayWeatherResults allWeatherResults={weatherData}/>
      </div>
      <>
        <footer className="footer">
          <p><GiAtom /> Created at <a href="https://www.junocollege.com">Juno College</a> 2021 by <a href="https://github.com/LawrenceLCodes">Lawrence Lee</a> <GiSpaceship /></p>
        </footer>
      </>
    </>
  );
}

export default App;
