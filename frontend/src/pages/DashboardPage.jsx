import React from "react";
import Dashboard from "../components/Dashboard";

const DashboardPage = () => {
  return (
    <div className="page">
      <h1 className="title">
        <span className="title-icon">🌦</span>
        <span className="title-text">Weather Analytics Dashboard</span>
      </h1>
      <Dashboard />
    </div>
  );
};

export default DashboardPage;
