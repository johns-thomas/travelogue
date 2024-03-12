import React from 'react';
//import './Weather.css';

function WeatherWidget({ value }) {
    const data = value;
    console.log(data)
    return (
        <div className="weather card text-white bg-dark mx-auto mt-5" style={{ maxWidth: "300px", borderRadius: "6px", boxShadow: "10px -2px 20px 2px rgba(0, 0, 0, 0.3)" }}>
        <div className="card-body p-3">
          <div className="top d-flex justify-content-between align-items-center">
            <div>
              <p className="city font-weight-bold mb-0" style={{ fontSize: "18px", letterSpacing: "1px" }}>{data.city}</p>
              <p className="weather-description mb-0" style={{ fontSize: "14px" }}>{data.weather[0].description}</p>
            </div>
            <img alt="weather" className="weather-icon" src={`icons/${data.weather[0].icon}.png`} style={{ width: "100px" }} />
          </div>
          <div className="bottom">
            <p className="temperature font-weight-bold" style={{ fontSize: "70px", letterSpacing: "-5px", margin: "10px 0" }}>{Math.round(data.main.temp)}°C</p>
            <div className="details">
              <div className="parameter-row">
                <span className="parameter-label font-weight-bold" style={{ fontSize: "12px" }}>Details</span>
              </div>
              <div className="parameter-row">
                <span className="parameter-label" style={{ fontSize: "12px" }}>Feels like</span>
                <span className="parameter-value font-weight-bold" style={{ fontSize: "12px" }}>{Math.round(data.main.feels_like)}°C</span>
              </div>
              <div className="parameter-row">
                <span className="parameter-label" style={{ fontSize: "12px" }}>Wind</span>
                <span className="parameter-value font-weight-bold" style={{ fontSize: "12px" }}>{data.wind.speed} m/s</span>
              </div>
              <div className="parameter-row">
                <span className="parameter-label" style={{ fontSize: "12px" }}>Humidity</span>
                <span className="parameter-value font-weight-bold" style={{ fontSize: "12px" }}>{data.main.humidity}%</span>
              </div>
              <div className="parameter-row">
                <span className="parameter-label" style={{ fontSize: "12px" }}>Pressure</span>
                <span className="parameter-value font-weight-bold" style={{ fontSize: "12px" }}>{data.main.pressure} hPa</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default WeatherWidget;
