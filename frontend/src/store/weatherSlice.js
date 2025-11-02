import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchWeather } from "../api/weatherApi";

export const getWeatherData = createAsyncThunk(
  "weather/getWeatherData",
  async (city) => {
    const data = await fetchWeather(city);
    return data;
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    data: null,
    loading: false,
    error: null,
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
      })
      .addCase(getWeatherData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default weatherSlice.reducer;
