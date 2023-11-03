import WeatherInfo from './WeatherInfo';
import DailyForecast from './DailyForecast';
import { useEffect, useState } from 'react';
import { searchByCoord, searchLocation } from '../../services/weatherService.js';
import { useForm } from 'react-hook-form';
import { useLoading } from '../../hooks/useLoading.js';
import Spinner from '../LoadingSpinner/Spinner.jsx';
import { useDispatch } from 'react-redux';

export default function Weather() {
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [weather, setWeather] = useState({ loaded: false });
    const [fiveDays, setFiveDaysForecast] = useState([]);
    const [position, setPosition] = useState({});
    const [isLoading, handleLoading] = useLoading(true);

    const search = async ({ location }) => {
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
            setFiveDaysForecast(fiveDaysForecast.list);
        } catch (error) {
            console.log(error);
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
            handleLoading(() => {
                searchByCoord(position.latitude, position.longitude, dispatch)
                    .then(({ baseForecast, fiveDaysForecast }) => {
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
                        setFiveDaysForecast(fiveDaysForecast.list);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            });
        }
    }, [position, dispatch]);

    return (
        <>
            {isLoading ? (
                <Spinner />
            ) : (
                weather.city && (
                    <div className="Weather">
                        <form className="search-bar" onSubmit={handleSubmit(search)}>
                            <div className="search-location">
                                <input
                                    type="text"
                                    autoComplete="off"
                                    spellCheck="false"
                                    placeholder="Search a city"
                                    {...register('location')}
                                />
                                <span />
                                <input type="submit" value="Go" id="go" />
                            </div>
                        </form>

                        <WeatherInfo info={weather} />
                        <DailyForecast fiveDaysForecast={fiveDays} />
                    </div>
                )
            )}
        </>
    );
}
