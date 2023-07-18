import React from 'react';
import './CurrentWeather.css';

const CurrentWeather = ({ data }) => {
  return (
    <div className="weather">
      <div className="top-section">
        <div className="temperature">
          <p>{Math.round(data.main.temp)}°C</p>
        </div>
        <div className="city">
          <p>{data.city}</p>
        </div>
        <div className="icon">
          <img src={`icons/${data.weather[0].icon}.png`} alt="weather" />
        </div>
      </div>
      <div className="bottom-section">
        <div className="detail-row">
          <p className="detail-label">Feels like</p>
          <p className="detail-value">{Math.round(data.main.feels_like)}°C</p>
        </div>
        <div className="detail-row">
          <p className="detail-label">Wind</p>
          <p className="detail-value">{data.wind.speed} m/s</p>
        </div>
        <div className="detail-row">
          <p className="detail-label">Humidity</p>
          <p className="detail-value">{data.main.humidity} %</p>
        </div>
        <div className="detail-row">
          <p className="detail-label">Pressure</p>
          <p className="detail-value">{data.main.pressure} hPa</p>
        </div>
        <div className="detail-row">
          <p className="detail-label">Clouds</p>
          <p className="detail-value">{data.clouds.all} %</p>
        </div>
        <div className="detail-row">
          <p className="detail-label">Min/Max</p>
          <p className="detail-value">{Math.round(data.main.temp_min)}°C / {Math.round(data.main.temp_max)}°C</p>
        </div>
      </div>
    </div>
  );
}

export default CurrentWeather;
