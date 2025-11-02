import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWeatherData, getMultipleCitiesWeather } from "../store/weatherSlice";
import WeatherCard from "./WeatherCard";
import SearchBar from "./SearchBar";
import ChartComponent from "./ChartComponent";
import CityCard from "./CityCard";
import SettingsPanel from "./SettingsPanel";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [showDetail, setShowDetail] = useState(false);
  const { data, multiCityData, loading, error } = useSelector((state) => state.weather);
  const favorites = useSelector((state) => state.favorites.cities);
  const { unit } = useSelector((state) => state.settings);

  const convertTemp = (tempC) => {
    return unit === "fahrenheit" ? (tempC * 9/5) + 32 : tempC;
  };

  // Load all favorite cities on mount
  useEffect(() => {
    if (favorites.length > 0) {
      dispatch(getMultipleCitiesWeather(favorites));
    }
  }, [dispatch]);

  // Refresh data every 60 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (favorites.length > 0) {
        dispatch(getMultipleCitiesWeather(favorites));
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [dispatch, favorites]);

  const handleCitySearch = (searchedCity) => {
    dispatch(getWeatherData(searchedCity));
    setShowDetail(true);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <SearchBar onSearch={handleCitySearch} />
        <SettingsPanel />
      </div>

      {!showDetail && (
        <>
          <div className="cities-grid">
            {favorites.map((city) => (
              <CityCard
                key={city}
                cityName={city}
                weatherData={multiCityData[city]}
              />
            ))}
          </div>

          {favorites.length === 0 && (
            <div className="empty-state">
              <p>🌍 No favorite cities yet!</p>
              <p className="empty-hint">Search for a city and add it to favorites</p>
            </div>
          )}
        </>
      )}

      {showDetail && data && (
        <>
          <button className="back-button" onClick={() => setShowDetail(false)}>
            ← Back to Dashboard
          </button>

          {loading && (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Fetching weather data...</p>
            </div>
          )}

          {error && (
            <div className="error-message">
              <p>⚠️ {error}</p>
              <p className="error-hint">Please check the city name and try again.</p>
            </div>
          )}

          {!loading && (
            <>
              <WeatherCard
                city={data.location.name}
                country={data.location.country}
                region={data.location.region}
                temp={data.current.temp_c}
                feelsLike={data.current.feelslike_c}
                condition={data.current.condition.text}
                icon={data.current.condition.icon}
                humidity={data.current.humidity}
                wind={data.current.wind_kph}
                pressure={data.current.pressure_mb}
                visibility={data.current.vis_km}
                uv={data.current.uv}
                lastUpdated={data.current.last_updated}
              />

              {data.forecast?.forecastday && data.forecast.forecastday.length > 0 && (
                <div className="forecast-section">
                  <h3>📊 {data.forecast.forecastday.length}-Day Forecast</h3>
                  <ChartComponent forecast={data.forecast.forecastday} />
                  
                  <div className="forecast-cards">
                    {data.forecast.forecastday.map((day, index) => (
                      <div key={index} className="forecast-card">
                        <p className="forecast-date">{new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</p>
                        <img src={`https:${day.day.condition.icon}`} alt={day.day.condition.text} width={48} height={48} />
                        <p className="forecast-condition">{day.day.condition.text}</p>
                        <p className="forecast-temp">
                          <span className="temp-high">{Math.round(convertTemp(day.day.maxtemp_c))}°</span>
                          <span className="temp-low">{Math.round(convertTemp(day.day.mintemp_c))}°</span>
                        </p>
                        <p className="forecast-rain">💧 {day.day.daily_chance_of_rain}%</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
