import { useState, useEffect } from 'react';
import { searchByCoord, searchLocation } from '../services/weatherService.js';
import { useDispatch } from 'react-redux';
import { useLoading } from './useLoading.js';

export const useForecast = () => {
    const dispatch = useDispatch();
    const [weather, setWeather] = useState({ loaded: false });
    const [fiveDays, setFiveDaysForecast] = useState([]);
    const [position, setPosition] = useState({});
    const [isLoading, handleLoading] = useLoading(true);

    const fetchWeatherData = async (latitude, longitude) => {
        try {
            const { baseForecast, fiveDaysForecast } = await searchByCoord(latitude, longitude, dispatch);

            if (baseForecast.cod !== 429 && fiveDaysForecast.cod !== 429) {
                setWeather({
                    city: baseForecast.name,
                    coordinates: baseForecast.coord,
                    date: new Date(baseForecast.dt * 1000),
                    temperature: Math.round(baseForecast.main.temp),
                    wind: Math.round(baseForecast.wind.speed),
                    humidity: baseForecast.main.humidity,
                    description: baseForecast.weather[0].description,
                    icon: baseForecast.weather[0].icon,
                });
            }
            setFiveDaysForecast(fiveDaysForecast);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSearch = async ({ location }) => {
        try {
            if (!location) {
                throw ['Location is required!'];
            }
            const { baseForecast, fiveDaysForecast } = await searchLocation(location);

            setWeather({
                city: baseForecast.name,
                coordinates: baseForecast.coord,
                date: new Date(baseForecast.dt * 1000),
                temperature: Math.round(baseForecast.main.temp),
                wind: Math.round(baseForecast.wind.speed),
                humidity: baseForecast.main.humidity,
                description: baseForecast.weather[0].description,
                icon: baseForecast.weather[0].icon,
            });
            setFiveDaysForecast(fiveDaysForecast);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setPosition({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                },
                (error) => {
                    console.error(error);
                }
            );
        }
    }, []);

    useEffect(() => {
        if (position.latitude && position.longitude) {
            handleLoading(() => fetchWeatherData(position.latitude, position.longitude));
        }
    }, [position, dispatch]);

    return { weather, fiveDays, handleSearch, isLoading };
};
