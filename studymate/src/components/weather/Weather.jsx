/*
Illustrations by NetGuru:
https://www.behance.net/gallery/42218275/CoolCal-simple-and-easy-to-use-weather-calendar
*/
import clearDay from "../../assets/weather/clear_d.png"; // 01d
import clearNight from "../../assets/weather/clear_n.png"; // 01n

import fewCloudsDay from "../../assets/weather/few_clouds_d.png"; // 02d
import fewCloudsNight from "../../assets/weather/few_clouds_n.png"; // 02n

import scatteredClouds from "../../assets/weather/scattered_clouds.png"; // 03d, 03n

import brokenCloudsDay from "../../assets/weather/broken_clouds_d.png"; // 04d
import brokenCloudsNight from "../../assets/weather/broken_clouds_n.png"; // 04n

import showerRainDay from "../../assets/weather/shower_rain_d.png"; // 09d
import showerRainNight from "../../assets/weather/shower_rain_n.png"; // 09n

import rainDay from "../../assets/weather/rain_d.png"; // 10d
import rainNight from "../../assets/weather/rain_n.png"; // 10n

import thunderstormDay from "../../assets/weather/thunderstorm_d.png"; // 11d
import thunderstormNight from "../../assets/weather/thunderstorm_n.png"; // 11n

import snowDay from "../../assets/weather/snow_d.png"; // 13d
import snowNight from "../../assets/weather/snow_n.png"; // 13n

import mist from "../../assets/weather/mist.png"; // 50d, 50n

import { useState } from "react";
import { data } from "autoprefixer";

function Weather() {
  const API_KEY = import.meta.env.VITE_APP_OPENWEATHER_API_KEY;
  const [weatherData, setWeather] = useState([{}]);
  const [city, setCity] = useState("");

  const [weatherIcon, setWeatherIcon] = useState(clearDay);

  const getWeather = async (e) => {
    if (e.key === "Enter") {
      const data = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}&units=metric`
      )
        .then((res) => res.json())
        .then((data) => {
          setWeather(data);
          console.log(data);

          if (data.weather[0].icon === "01d") {
            setWeatherIcon(clearDay);
          } else if (data.weather[0].icon === "01n") {
            setWeatherIcon(clearNight);
          } else if (data.weather[0].icon === "02d") {
            setWeatherIcon(fewCloudsDay);
          } else if (data.weather[0].icon === "02n") {
            setWeatherIcon(fewCloudsNight);
          } else if (
            data.weather[0].icon === "03d" ||
            data.weather[0].icon === "03n"
          ) {
            setWeatherIcon(scatteredClouds);
          } else if (data.weather[0].icon === "04d") {
            setWeatherIcon(brokenCloudsDay);
          } else if (data.weather[0].icon === "04n") {
            setWeatherIcon(brokenCloudsNight);
          } else if (data.weather[0].icon === "09d") {
            setWeatherIcon(showerRainDay);
          } else if (data.weather[0].icon === "09n") {
            setWeatherIcon(showerRainNight);
          } else if (data.weather[0].icon === "10d") {
            setWeatherIcon(rainDay);
          } else if (data.weather[0].icon === "10n") {
            setWeatherIcon(rainNight);
          } else if (data.weather[0].icon === "11d") {
            setWeatherIcon(thunderstormDay);
          } else if (data.weather[0].icon === "11n") {
            setWeatherIcon(thunderstormNight);
          } else if (data.weather[0].icon === "13d") {
            setWeatherIcon(snowDay);
          } else if (data.weather[0].icon === "13n") {
            setWeatherIcon(snowNight);
          } else if (
            data.weather[0].icon === "50d" ||
            data.weather[0].icon === "50n"
          ) {
            setWeatherIcon(mist);
          }
        });
    }
  };

  return (
    <div className="flex flex-col p-12 justify-center items-center">
      <div className="pb-12">
        <input
          className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent hover:border-gray-400"
          type="text"
          placeholder="Enter City ..."
          onChange={(e) => setCity(e.target.value)}
          value={city}
          onKeyDown={getWeather}
        />
      </div>
      <div>
        {typeof weatherData.main != "undefined" ? (
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-white">
              {weatherData.name}
            </h1>
            <h2 className="text-3xl text-white">
              {weatherData.weather[0].main}
            </h2>
            <h2 className="text-3xl text-white">
              {Math.round(weatherData.main.temp)}°
            </h2>
            <img
              src={weatherIcon}
              alt={weatherData.weather[0].main}
              className="w-auto h-auto"
            />
          </div>
        ) : (
          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              Enter your City
            </h1>
          </div>
        )}
        {weatherData.cod === "404" ? (
          <div className="text-4xl font-bold text-red-400">
            <h1>City Not Found</h1>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default Weather;
