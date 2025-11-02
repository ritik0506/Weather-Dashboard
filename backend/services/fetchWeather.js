import axios from "axios";

/**
 * Fetch weather data for a given city from WeatherAPI.com
 * Supports current weather + 7-day forecast
 *
 * @param {string} city - City name to fetch weather for
 * @returns {object} - Weather data (JSON from WeatherAPI)
 */
const fetchWeather = async (city) => {
  try {
    const apiKey = process.env.WEATHER_API_KEY;

    if (!apiKey) {
      throw new Error("Missing WEATHER_API_KEY in .env");
    }

    const url = "https://api.weatherapi.com/v1/forecast.json";
    const forecastDays = Number(process.env.WEATHER_FORECAST_DAYS) || 3;

    const { data } = await axios.get(url, {
      params: {
        key: apiKey,
        q: city,
        days: Math.min(forecastDays, 10),
        aqi: "no",
        alerts: "no",
      },
    });

    return data;
  } catch (error) {
    console.error(`❌ Error fetching weather for ${city}:`, error.response?.data || error.message);
    throw error;
  }
};

export default fetchWeather;
