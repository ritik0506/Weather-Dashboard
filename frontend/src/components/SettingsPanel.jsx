import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleUnit } from "../store/settingsSlice";

const SettingsPanel = () => {
  const dispatch = useDispatch();
  const { unit } = useSelector((state) => state.settings);

  return (
    <div className="settings-panel">
      <button
        className="unit-toggle"
        onClick={() => dispatch(toggleUnit())}
        title={`Switch to ${unit === "celsius" ? "Fahrenheit" : "Celsius"}`}
      >
        <span className={unit === "celsius" ? "active" : ""}>°C</span>
        <span className="separator">|</span>
        <span className={unit === "fahrenheit" ? "active" : ""}>°F</span>
      </button>
    </div>
  );
};

export default SettingsPanel;
