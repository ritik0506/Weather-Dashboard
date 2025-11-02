import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchWeather } from "../api/weatherApi";

// Cache management
const cache = new Map();
const CACHE_DURATION = 60000; // 60 seconds

const getCachedData = (city) => {
  const cached = cache.get(city.toLowerCase());
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  return null;
};

const setCachedData = (city, data) => {
  cache.set(city.toLowerCase(), {
    data,
    timestamp: Date.now(),
  });
};

export const getWeatherData = createAsyncThunk(
  "weather/getWeatherData",
  async (city) => {
    // Check cache first
    const cachedData = getCachedData(city);
    if (cachedData) {
      return { ...cachedData, fromCache: true };
    }

    const data = await fetchWeather(city);
    setCachedData(city, data);
    return { ...data, fromCache: false };
  }
);

export const getMultipleCitiesWeather = createAsyncThunk(
  "weather/getMultipleCitiesWeather",
  async (cities) => {
    const promises = cities.map(async (city) => {
      const cachedData = getCachedData(city);
      if (cachedData) {
        return { city, data: cachedData, fromCache: true };
      }

      const data = await fetchWeather(city);
      setCachedData(city, data);
      return { city, data, fromCache: false };
    });

    return Promise.all(promises);
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    currentCity: null,
    data: null,
    multiCityData: {},
    loading: false,
    error: null,
  },
  reducers: {
    setCurrentCity: (state, action) => {
      state.currentCity = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWeatherData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWeatherData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.currentCity = action.payload.location?.name;
      })
      .addCase(getWeatherData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getMultipleCitiesWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMultipleCitiesWeather.fulfilled, (state, action) => {
        state.loading = false;
        action.payload.forEach(({ city, data }) => {
          state.multiCityData[city] = data;
        });
      })
      .addCase(getMultipleCitiesWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setCurrentCity } = weatherSlice.actions;
export default weatherSlice.reducer;
