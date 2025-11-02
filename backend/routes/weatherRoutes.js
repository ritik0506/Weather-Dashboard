import express from "express";
import fetchWeather from "../services/fetchWeather.js";

const router = express.Router();

// GET /api/weather?city=London
router.get("/", async (req, res) => {
  const city = req.query.city;

  if (!city) {
    return res.status(400).json({ message: "City parameter is required" });
  }

  try {
    const weatherData = await fetchWeather(city);
    res.json(weatherData);
  } catch (error) {
    console.error("❌ Weather API error:", error.response?.data || error.message);
    res.status(500).json({
      message: "Failed to fetch weather data",
      error: error.response?.data?.error || error.message,
    });
  }
});

export default router;
