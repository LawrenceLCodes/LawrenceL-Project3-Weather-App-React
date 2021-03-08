// import axios from 'axios';


// const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?';
// const apiKey = 'b4a714fe3bfd1719fc214f0b9702a68c';

// const getWeatherData = async (cityName) => {
    // try{
    //     const {data} = await axios.get(baseUrl + `q=${cityName}&appid=${apiKey}`);
    //     return data;
    // } catch(error) {
    //     return alert('Weather data has not loaded properly');
    // }
    // axios({
    //   method: "GET",
    //   url: `https://api.openweathermap.org/data/2.5/weather/`,
    //   dataResponse: "json",
    //   params: {
    //     appid: apiKey,
    //     lang: "en",
    //     units: "metric",
    //     q: cityName,
    //   }
    // }).then( (response) => {
    //   console.log(response);
    //   getWeatherData(response.data);
    // });
// }

// export default getWeatherData;
