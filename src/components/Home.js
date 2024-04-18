import React, { useState, useEffect } from "react";
import SearchBar from './search';
import WeatherWidget from './widgets/Weather';
import ForecastWidget from './widgets/forecast';
import CurrencyWidget from "./widgets/CurrencyWidget";
import HotelWidget from "./widgets/HotelWidget";
import { WEATHER_API_URL, WEATHER_API_KEY } from '../weatherapi';
import ReviewsComponent from "./Reviews";
import { HOST_URL } from "../geoapi";

function Home() {
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    const [cityImage, setCityImage] = useState(null);
    const [cityName, setCityName] = useState(null);
    const [showWelcome, setShowWelcome] = useState(true);
    const [backgroundSize, setBackgroundSize] = useState("cover");

    useEffect(() => {
        if (cityImage) {
            const img = new Image();
            img.src = cityImage;
            img.onload = () => {
                const imageSize = `${img.width}px ${img.height}px`;
                setBackgroundSize(imageSize);
            };
        }
    }, [cityImage]);

    const onSearchChange = async (input) => {
        try {
            setShowWelcome(false); // Hide welcome message and image when user starts typing
            const [lat, lon] = input.value.split(" ");
            const cityName = input.label.split(",")[0];
            // const fetchCurrentWeather = fetch(
            //     `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
            // );
            const fetchWeatherForecast = fetch(
                `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
            );
            // const fetchCurrentWeather = fetch(
            //     `http://x22203389scapp-env.eba-z5az2ytx.ap-south-1.elasticbeanstalk.com/weather/today?city=${cityName}`
            // );
            const fetchCurrentWeather = fetch(
                `${HOST_URL}/weather/today?city=${cityName}`
            );
            const [currentWeatherResponse, forecastResponse] = await Promise.all([fetchCurrentWeather, fetchWeatherForecast]);

            const currentWeather = await currentWeatherResponse.json();
            const forecast = await forecastResponse.json();

            setWeatherData({  city_id: input.id, city: input.label, cityName:cityName, ...currentWeather });
            setForecastData({ city: input.label, ...forecast });
            setCityImage(input.image_url);
            setCityName(cityName);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    return (
        <div className="container">
             <div className="jumbotron mt-5" >
                <SearchBar OnInputChange={onSearchChange}  /> {/* Add margin bottom to SearchBar */}
                {showWelcome && (<div style={{ textAlign: "center", padding: "2rem" }}>
                <h1>Welcome to our travel website!</h1>
                        <p>Explore exciting destinations and plan your next adventure.</p>
                    <img src={`${process.env.PUBLIC_URL}/timg.jpg`} alt="Welcome" className="img-fluid mb-4" />

                    </div>)}

                

                {cityName && (
                    <>
                        <h3 className="mt-5">Explore {cityName}</h3>
                        <div className="row align-items-center m-5">
                            <div className="col-md-6">
                                <img src={cityImage} alt={cityName} className="img-fluid" style={{ width: "100%", height: "auto" }} />
                            </div>
                            <div className="col-md-4">
                                {weatherData && <WeatherWidget value={weatherData} />}
                            </div>
                        </div>
                        {forecastData && <ForecastWidget data={forecastData} />}
                        {weatherData && <HotelWidget cityId={weatherData.city_id} />}
                        {weatherData && <ReviewsComponent cityId={weatherData.city_id} cityName={cityName} />}
                    </>
                )}
            </div>
        </div>
    );
}

export default Home;
