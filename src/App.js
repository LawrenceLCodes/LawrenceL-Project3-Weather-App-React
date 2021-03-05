import './App.css';
import { useEffect } from 'react';
import mySwal from './SweetAlert.js';
import axios from 'axios';

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

function App() {
// The following useEffect Hook is required to obtain the API data from Open Weather map.
useEffect( () => {
  const apiKey = 'b4a714fe3bfd1719fc214f0b9702a68c';
  axios({
    method: "GET",
    url: `https://api.openweathermap.org/data/2.5/weather/`,
    dataResponse: "json",
    params: {
      appid: apiKey,
      lang: "en",
      q: "Toronto",
    }
  }).then( (response => {
    console.log(response);
  }))
  // Catch is used to generate an alert if an incompatible city name has been entered. 
  .catch(error => mySwal({
      title: "City Name Not Found",
      icon: "error",
      text: "Please check your entry and try again!",
      timer: 4000,
    })
  );
})


  return (
    <div className="App wrapper">
      <h1>Today's Weather!</h1>

      <fieldset>
        <legend></legend>

        <label htmlFor=""></label>
        <input type="text"/>

        <label htmlFor=""></label>
        <button>Get Forecast</button>
      </fieldset>

      <footer>
        <p> Created at <a href="https://www.junocollege.com">Juno College</a> 2021 by <a href="https://github.com/LawrenceLCodes">Lawrence Lee</a></p>
      </footer>
    </div>
  );
}

export default App;
