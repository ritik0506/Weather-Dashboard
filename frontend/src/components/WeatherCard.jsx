import React from "react";

const WeatherCard = ({ 
  city, 
  country, 
  region, 
  temp, 
  feelsLike, 
  condition, 
  icon, 
  humidity, 
  wind, 
  pressure, 
  visibility, 
  uv,
  lastUpdated 
}) => {
  const normalizedIcon = icon?.startsWith("http") ? icon : icon ? `https:${icon}` : null;

  return (
    <div className="weather-card-main">
      <div className="weather-header">
        <div>
          <h2 className="city-name">{city}</h2>
          <p className="location-details">{region}, {country}</p>
          <p className="last-updated">Last updated: {new Date(lastUpdated).toLocaleTimeString()}</p>
        </div>
        {normalizedIcon && (
          <img className="weather-icon-large" src={normalizedIcon} alt={condition} width={100} height={100} />
        )}
      </div>

      <div className="weather-main-info">
        <div className="temp-display">
          <span className="temp-value">{Math.round(temp)}</span>
          <span className="temp-unit">°C</span>
        </div>
        <p className="weather-condition">{condition}</p>
        <p className="feels-like">Feels like {Math.round(feelsLike)}°C</p>
      </div>

      <div className="weather-details-grid">
        <div className="detail-item">
          <span className="detail-icon">💧</span>
          <div>
            <p className="detail-label">Humidity</p>
            <p className="detail-value">{humidity}%</p>
          </div>
        </div>
        <div className="detail-item">
          <span className="detail-icon">💨</span>
          <div>
            <p className="detail-label">Wind Speed</p>
            <p className="detail-value">{wind} km/h</p>
          </div>
        </div>
        <div className="detail-item">
          <span className="detail-icon">🔽</span>
          <div>
            <p className="detail-label">Pressure</p>
            <p className="detail-value">{pressure} mb</p>
          </div>
        </div>
        <div className="detail-item">
          <span className="detail-icon">👁️</span>
          <div>
            <p className="detail-label">Visibility</p>
            <p className="detail-value">{visibility} km</p>
          </div>
        </div>
        <div className="detail-item">
          <span className="detail-icon">☀️</span>
          <div>
            <p className="detail-label">UV Index</p>
            <p className="detail-value">{uv}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
