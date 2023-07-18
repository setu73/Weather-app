import React, { useState } from 'react';
import './Forecast.css';

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const Forecast = ({ data }) => {
  const dayInNumber = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInNumber, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInNumber));

  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleItemClick = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="forecast">
         <h2 className="forecast-title"><span className="number">7</span>Day Weather Forecast</h2>
      {data.list.slice(0, 7).map((item, idx) => (
        <div key={idx} className={`weekly-tile ${expandedIndex === idx ? 'expanded' : ''}`}>
          <div className="weekly-header" onClick={() => handleItemClick(idx)}>
            <img className="icon-small" alt="weather" src={`icons/${item.weather[0].icon}.png`} />
            <label className="day">{forecastDays[idx]}</label>
            <label className="description">{item.weather[0].description}</label>
            <label className="min-max">{Math.round(item.main.temp_min)}°C / {Math.round(item.main.temp_max)}°C</label>
          </div>

          {expandedIndex === idx && (
            <div className="weekly-details">
              <div className="daily-details-grid-item">
                <label>Pressure</label>
                <span>{item.main.pressure} hPa</span>
              </div>
              <div className="daily-details-grid-item">
                <label>Humidity</label>
                <span>{item.main.humidity} %</span>
              </div>
              <div className="daily-details-grid-item">
                <label>Clouds</label>
                <span>{item.clouds.all} %</span>
              </div>
              <div className="daily-details-grid-item">
                <label>Wind</label>
                <span>{item.wind.speed} m/s</span>
              </div>
              <div className="daily-details-grid-item">
                <label>Sea level</label>
                <span>{item.main.sea_level} m</span>
              </div>
              <div className="daily-details-grid-item">
                <label>Feels like</label>
                <span>{Math.round(item.main.feels_like)}°C</span>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Forecast;
