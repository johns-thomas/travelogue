import React, { useState } from "react";



import SearchBar from './search';
import WeatherWidget from './widgets/Weather';
import ForecastWidget from './widgets/forecast';
import CurrencyWidget from "./widgets/CurrencyWidget";
import { WEATHER_API_URL, WEATHER_API_KEY } from '../weatherapi';

function Home() {
    const [weatherData, setweatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    const [countryCode, seCountryCode]= useState(null);
    const onSearchChange = async (input) => {
        try {
            const [lat, lon] = input.value.split(" ");
            const city = input.label;
            seCountryCode(input.countryID)
            const fetchCurrentWeather = fetch(
                `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
            );
            const fetchWeatherForecast = fetch(
                `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
            );

            const [currentWeatherResponse, forecastResponse] = await Promise.all([fetchCurrentWeather, fetchWeatherForecast]);
                
            const currentWeather = await currentWeatherResponse.json();
            const forecast = await forecastResponse.json();
            console.log(forecast)
            setweatherData({ city: input.label, ...currentWeather });
            setForecastData({ city: input.label, ...forecast });
            console.log(forecastData);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };


    return (
        <div className="container">
            <div className="jumbotron mt-5">
                <SearchBar OnInputChange={onSearchChange} />
                {weatherData && <WeatherWidget value={weatherData} />}
                {countryCode &&<CurrencyWidget countryCode={countryCode}/>}
                {forecastData && <ForecastWidget data={forecastData} />}
            </div>

        </div>
    );
}

export default Home;
