import React from 'react';

function WeatherWidget({ value }) {
    const data = value;

    return (
        <div className="weather card text-white bg-dark mx-auto mt-5" style={{ maxWidth: "250px", borderRadius: "6px", boxShadow: "10px -2px 20px 2px rgba(0, 0, 0, 0.3)" }}>
            <div className="card-body p-3">
                <div className="top d-flex justify-content-between align-items-center">
                    <div>
                        <p className="city font-weight-bold mb-0" style={{ fontSize: "16px", letterSpacing: "1px" }}>{data.city}</p>
                        <p className="weather-description mb-0" style={{ fontSize: "12px" }}>{data.weather[0].description}</p>
                    </div>
                    <img alt="weather" className="weather-icon" src={`icons/${data.weather[0].icon}.png`} style={{ width: "80px" }} />
                </div>
                <div className="bottom">
                    <p className="temperature font-weight-bold" style={{ fontSize: "40px", letterSpacing: "-2px", margin: "10px 0" }}>{Math.round(data.main.temp)}°C</p>
                    <div className="details">
                        <div className="parameter-row">
                            <span className="parameter-label font-weight-bold" style={{ fontSize: "10px" }}>Details</span>
                        </div>
                        <div className="parameter-row">
                            <span className="parameter-label" style={{ fontSize: "10px" }}>Feels like :</span>
                            <span className="parameter-value font-weight-bold" style={{ fontSize: "10px" }}>{Math.round(data.main.feels_like)}°C</span>
                        </div>
                        <div className="parameter-row">
                            <span className="parameter-label" style={{ fontSize: "10px" }}>Wind :</span>
                            <span className="parameter-value font-weight-bold" style={{ fontSize: "10px" }}>{data.wind.speed} m/s</span>
                        </div>
                        <div className="parameter-row">
                            <span className="parameter-label" style={{ fontSize: "10px" }}>Humidity :</span>
                            <span className="parameter-value font-weight-bold" style={{ fontSize: "10px" }}>{data.main.humidity}%</span>
                        </div>
                        <div className="parameter-row">
                            <span className="parameter-label" style={{ fontSize: "10px" }}>Pressure :</span>
                            <span className="parameter-value font-weight-bold" style={{ fontSize: "10px" }}>{data.main.pressure} hPa</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WeatherWidget;
