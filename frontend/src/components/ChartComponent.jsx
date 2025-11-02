import React from "react";
import { useSelector } from "react-redux";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from "recharts";

const ChartComponent = ({ forecast }) => {
  const { unit } = useSelector((state) => state.settings);

  const convertTemp = (tempC) => {
    return unit === "fahrenheit" ? (tempC * 9/5) + 32 : tempC;
  };

  const unitSymbol = unit === "celsius" ? "°C" : "°F";

  const chartData = forecast.map((day) => ({
    date: new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    "Max Temp": Math.round(convertTemp(day.day.maxtemp_c)),
    "Min Temp": Math.round(convertTemp(day.day.mintemp_c)),
    "Avg Temp": Math.round(convertTemp(day.day.avgtemp_c)),
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-date">{payload[0].payload.date}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value}{unitSymbol}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis 
            dataKey="date" 
            stroke="#666"
            style={{ fontSize: '0.85rem' }}
          />
          <YAxis 
            stroke="#666"
            style={{ fontSize: '0.85rem' }}
            label={{ value: `Temperature (${unitSymbol})`, angle: -90, position: 'insideLeft' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ paddingTop: '10px' }} />
          <Line 
            type="monotone" 
            dataKey="Max Temp" 
            stroke="#ff4444" 
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line 
            type="monotone" 
            dataKey="Avg Temp" 
            stroke="#ff7300" 
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line 
            type="monotone" 
            dataKey="Min Temp" 
            stroke="#4444ff" 
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartComponent;
