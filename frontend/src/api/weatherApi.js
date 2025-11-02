import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/weather";

export const fetchWeather = async (city) => {
  try {
    const response = await axios.get(`${API_BASE_URL}?city=${city}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error.response?.data || error.message);
    throw error;
  }
};
