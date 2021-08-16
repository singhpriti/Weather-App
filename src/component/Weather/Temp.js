import React, { useState, useEffect } from 'react'
import './style.css'
import WeatherCard from './WeatherCard';
// https://api.openweathermap.org/data/2.5/weather?q=pune&appid=9ef78b78d23f076f2b7de0e1447619ce


const Temp = () => {


    const [searchValue, setSearchValue] = useState("Jaynagar");

    const [weather, setWeather] = useState({});


    const getWeatherInfo = async () => {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=9ef78b78d23f076f2b7de0e1447619ce`;
            const res = await fetch(url)
            const data = await res.json();
            // setWeather(data)
            // console.log(weather.weather)
            console.log(data)
            const { temp, humidity, pressure } = data.main;
            const { name } = data;
            const { country, sunset } = data.sys;
            const { speed } = data.wind;
            const { main: weathermood } = data.weather[0];
            console.log(temp, speed, humidity, name, country, sunset, pressure, weathermood)
            //abhi ye sare data mujhe one bye one chahiye 
            //iske liye ye object create krna hoga
            const myNewWeatherInfo = {
                temp, humidity, pressure, weathermood, name, speed, country, sunset
            };
            setWeather(myNewWeatherInfo);
        }
        catch (error) {
            console.log(error)
        }
    };

    //by default ahme page pe particuae ek chiz show krni hi hai,


    useEffect(() => {
        getWeatherInfo()
    }, [])

    return (
        <>
            <div className="wrap">
                <div className="search">
                    <input type="search"
                        placeholder="Search Your City..."
                        autoFocus
                        id="search"
                        className="searchTerm"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <button className="searchButton" type="button"
                        onClick={getWeatherInfo}>Search</button>
                </div>
            </div>
            <WeatherCard weather={weather} />
        </>
    );
};

export default Temp
