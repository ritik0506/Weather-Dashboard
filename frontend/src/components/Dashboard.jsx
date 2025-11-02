import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWeatherData } from "../store/weatherSlice";
import WeatherCard from "./WeatherCard";
import SearchBar from "./SearchBar";
import ChartComponent from "./ChartComponent";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [city, setCity] = useState("London");
  const { data, loading, error } = useSelector((state) => state.weather);

  useEffect(() => {
    dispatch(getWeatherData(city));
  }, [dispatch, city]);

  const handleCitySearch = (searchedCity) => {
    setCity(searchedCity);
  };

  return (
    <div className="dashboard">
      <SearchBar onSearch={handleCitySearch} />
      
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

      {data && !loading && (
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
                      <span className="temp-high">{Math.round(day.day.maxtemp_c)}°</span>
                      <span className="temp-low">{Math.round(day.day.mintemp_c)}°</span>
                    </p>
                    <p className="forecast-rain">💧 {day.day.daily_chance_of_rain}%</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
