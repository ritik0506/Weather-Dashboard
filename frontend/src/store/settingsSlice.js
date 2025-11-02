import { createSlice } from "@reduxjs/toolkit";

const loadSettings = () => {
  try {
    const saved = localStorage.getItem("userSettings");
    return saved ? JSON.parse(saved) : { unit: "celsius" };
  } catch {
    return { unit: "celsius" };
  }
};

const settingsSlice = createSlice({
  name: "settings",
  initialState: loadSettings(),
  reducers: {
    toggleUnit: (state) => {
      state.unit = state.unit === "celsius" ? "fahrenheit" : "celsius";
      localStorage.setItem("userSettings", JSON.stringify(state));
    },
    setUnit: (state, action) => {
      state.unit = action.payload;
      localStorage.setItem("userSettings", JSON.stringify(state));
    },
  },
});

export const { toggleUnit, setUnit } = settingsSlice.actions;
export default settingsSlice.reducer;
