import React, { useState } from "react";



import SearchBar from './search';
import WeatherWidget from './widgets/Weather';
import ForecastWidget from './widgets/forecast';
import CurrencyWidget from "./widgets/CurrencyWidget";
import HotelWidget from "./widgets/HotelWidget";
import { WEATHER_API_URL, WEATHER_API_KEY } from '../weatherapi';
import ReviewsComponent from "./Reviews";

function Home() {
    const [weatherData, setweatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    const [countryCode, seCountryCode] = useState(null);
    const [cityImage, setCityImage] = useState(null);
    const [city, setCity] = useState(null);    

    const onSearchChange = async (input) => {
        try {
            const [lat, lon] = input.value.split(" ");
            setCity (input.label);
            seCountryCode(input.country)
            setCityImage(input.image_url)
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
            setweatherData({ city_id: input.id, city: input.label, ...currentWeather });
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

                <h3 className="mt-5">Explore {city}</h3>
                <div className="row align-items-center m-5">
                    <div className="col-md-6">
                        
                        <img src={cityImage} alt="City" className="img-fluid" style={{ width: "50%", height: "50%" }} />
                    </div>
                    <div className="col-md-4">
                        {weatherData && <WeatherWidget value={weatherData} />}
                    </div>
                    </div>
                {forecastData && <ForecastWidget data={forecastData} />}
                {weatherData && <HotelWidget cityId={weatherData.city_id} />}
                {weatherData && <ReviewsComponent cityId={weatherData.city_id} />}
            </div>

        </div>
    );
}

export default Home;
