import React from "react";
import { useSelector } from "react-redux";
import ChartComponent from "../components/ChartComponent";

const DetailPage = () => {
  const { data } = useSelector((state) => state.weather);

  if (!data) return <p>No data available.</p>;

  return (
    <div className="detail-page">
      <h2>Details for {data.location.name}</h2>
      <ChartComponent forecast={data.forecast.forecastday} />
    </div>
  );
};

export default DetailPage;
