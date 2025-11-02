import { createSlice } from "@reduxjs/toolkit";

const loadFavorites = () => {
  try {
    const saved = localStorage.getItem("favoriteCities");
    return saved ? JSON.parse(saved) : ["Bangalore"];
  } catch {
    return ["Bangalore"];
  }
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    cities: loadFavorites(),
  },
  reducers: {
    addFavorite: (state, action) => {
      const city = action.payload;
      if (!state.cities.includes(city)) {
        state.cities.push(city);
        localStorage.setItem("favoriteCities", JSON.stringify(state.cities));
      }
    },
    removeFavorite: (state, action) => {
      state.cities = state.cities.filter((city) => city !== action.payload);
      localStorage.setItem("favoriteCities", JSON.stringify(state.cities));
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
