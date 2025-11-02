import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addFavorite, removeFavorite } from "../store/favoritesSlice";
import { getWeatherData } from "../store/weatherSlice";

const CityCard = ({ cityName, weatherData }) => {
  const dispatch = useDispatch();
  const { unit } = useSelector((state) => state.settings);
  const favorites = useSelector((state) => state.favorites.cities);
  const isFavorite = favorites.includes(cityName);

  const convertTemp = (tempC) => {
    return unit === "fahrenheit" ? (tempC * 9/5) + 32 : tempC;
  };

  const handleFavoriteToggle = (e) => {
    e.stopPropagation();
    if (isFavorite) {
      dispatch(removeFavorite(cityName));
    } else {
      dispatch(addFavorite(cityName));
    }
  };

  const handleCardClick = () => {
    dispatch(getWeatherData(cityName));
  };

  if (!weatherData) {
    return (
      <div className="city-card loading-card">
        <div className="spinner-small"></div>
        <p>Loading {cityName}...</p>
      </div>
    );
  }

  return (
    <div className="city-card" onClick={handleCardClick}>
      <button
        className={`favorite-btn ${isFavorite ? "favorited" : ""}`}
        onClick={handleFavoriteToggle}
        title={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        {isFavorite ? "★" : "☆"}
      </button>

      <div className="city-card-header">
        <h3>{weatherData.location.name}</h3>
        <p className="city-region">{weatherData.location.country}</p>
      </div>

      <div className="city-card-body">
        <img
          src={`https:${weatherData.current.condition.icon}`}
          alt={weatherData.current.condition.text}
          className="city-weather-icon"
        />
        <div className="city-temp">
          {Math.round(convertTemp(weatherData.current.temp_c))}°{unit === "celsius" ? "C" : "F"}
        </div>
        <p className="city-condition">{weatherData.current.condition.text}</p>
      </div>

      <div className="city-card-footer">
        <div className="city-stat">
          <span className="stat-icon">💧</span>
          <span>{weatherData.current.humidity}%</span>
        </div>
        <div className="city-stat">
          <span className="stat-icon">💨</span>
          <span>{weatherData.current.wind_kph} km/h</span>
        </div>
      </div>

      {weatherData.fromCache && (
        <div className="cache-indicator" title="Data from cache">
          📦 Cached
        </div>
      )}
    </div>
  );
};

export default CityCard;
