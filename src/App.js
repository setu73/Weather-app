import { useState, useEffect} from 'react';
import './App.css';
import {WEATHER_API_URL, WEATHER_API_KEY,Reverse_GE0CODING_API_KEY} from './apikeys';
import CurrentWeather from './components/CurrentWeather';
import Search from './components/Search';
import Forecast from './components/Forecast';
import 'bootstrap/dist/css/bootstrap.min.css';
//const backgroundImage1 = process.env.PUBLIC_URL + '/background1.jpg';
//const backgroundImage2 = process.env.PUBLIC_URL + '/background2.jpg';
function App() {
  
  const[currentWeather,setCurrentWeather]=useState(null);
  const[forecast,setForecast]=useState(null);
  const city1='Delhi IN';
  useEffect(() => {
    const fetchWeatherData = async (lat, lon, city) => {
      try {
        const currentWeatherResponse = await fetch(
          `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
        );
        const forecastResponse = await fetch(
          `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
        );
  
        const currentWeatherData = await currentWeatherResponse.json();
        const forecastData = await forecastResponse.json();
  
        setCurrentWeather({ city, ...currentWeatherData });
        setForecast({ city, ...forecastData });
      } catch (error) {
        console.log(error);
      }
    };
  
    const getCurrentLocation = async () => {
      if (navigator.geolocation) {
        try {
          const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });
    
          const { latitude, longitude } = position.coords;
    
          const locationResponse = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?key=${Reverse_GE0CODING_API_KEY}&q=${latitude},${longitude}`
          );
          const locationData = await locationResponse.json();
    
          if (locationData.results.length > 0) {
            const { city, country_code } = locationData.results[0].components;
            const label = `${city} ${country_code.toUpperCase()}`;
            fetchWeatherData(latitude, longitude, label);
          } else {
            // Location information not available, fetch weather data for Delhi
            
            fetchWeatherData(28.7041, 77.1025, city1);
          }
        } catch (error) {
          console.log(error);
          // Handle error, fetch weather data for Delhi
          fetchWeatherData(28.7041, 77.1025, city1);
        }
      } else {
        // Geolocation is not supported, fetch weather data for Delhi
        fetchWeatherData(28.7041, 77.1025, city1);
      }
    };
  
    getCurrentLocation();
  }, []);
  
  const handleOnSearchChange= async(searchData)=>{
    const[lat, lon]=searchData.value.split(" ");

    const currentWeatherfetch=fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      );

    const forecastFetch=fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      );

    Promise.all([currentWeatherfetch, forecastFetch])
      .then(async(response)=>{
        const weatherResponse=await response[0].json();
        const forecastResponse=await response[1].json();

        setCurrentWeather({city:searchData.label, ...weatherResponse});
        setForecast({city:searchData.label, ...forecastResponse});
      })
      .catch((err)=>{
        console.log(err);
      })

    //console.log(currentWeather);
    //console.log(forecast);  
  }
  
  
  return (
    <div className="container">
      <div className="app-tile">
        <div className="app-content">
          <div className="main-section">
            <div className="search-section">
              <Search onSearchChange={handleOnSearchChange} />
            </div>
            <div className="current-weather-section">
              {currentWeather && <CurrentWeather data={currentWeather} />}
            </div>
          </div>
          <div className="forecast-section">
            {forecast && <Forecast data={forecast} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
