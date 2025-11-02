import fetchWeather from "../services/fetchWeather.js";

export const getWeather = async (req, res) => {
  try {
    const { city } = req.query;

    if (!city) {
      return res.status(400).json({ message: "City name is required" });
    }

    const data = await fetchWeather(city);
    res.json(data);
  } catch (error) {
    console.error("❌ Weather API error:", error.response?.data || error.message);

    const statusCode = error.response?.status || 500;
    const errorMessage =
      error.response?.data?.error?.message || error.message || "Failed to fetch weather data";

    res.status(statusCode).json({
      message: "Failed to fetch weather data",
      error: errorMessage,
    });
  }
};
