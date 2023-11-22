import { useState, useEffect } from 'react';
import { searchByCoord, searchLocation } from '../services/weatherService.js';
import { useDispatch } from 'react-redux';
import { useLoading } from './useLoading.js';
import { useGeolocation } from './useGeolocation.js';

export const useForecast = () => {
    const dispatch = useDispatch();
    const [weather, setWeather] = useState({ loaded: false });
    const [fiveDays, setFiveDaysForecast] = useState([]);
    const [isLoading, handleLoading] = useLoading(true);
    const { position, error } = useGeolocation();

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

    const handleSearch = async ({ location }, reset) => {
        try {
            if (!location) {
                throw new Error('Location is required!');
            }
            const { baseForecast, fiveDaysForecast } = await searchLocation(location);

            reset();

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
            console.error(error.message);
        }
    };

    useEffect(() => {
        if (position && position.latitude && position.longitude) {
            handleLoading(() => fetchWeatherData(position.latitude, position.longitude));
        } else if (error) {
            console.error(error);
        }
    }, [position, error, dispatch]);

    return { weather, fiveDays, handleSearch, isLoading };
};
