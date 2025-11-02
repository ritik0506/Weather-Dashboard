import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import DetailPage from "./pages/DetailPage";

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/city/:cityName" element={<DetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
