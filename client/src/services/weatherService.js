import { updateWeatherData } from '../redux/slices/weatherSlice.js';

const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
const baseUrl = import.meta.env.VITE_OPENWEATHER_BASE_URL;

const refreshCacheTimeStamp = 900000; // 15min. refresh interval
let weatherDataCache = {};

export async function searchLocation(city) {
    const res = await fetch(`${baseUrl}/weather?q=${city}&appid=${apiKey}&units=metric`);
    const baseForecast = await res.json();

    const lat = baseForecast.coord?.lat;
    const lon = baseForecast.coord?.lon;

    const fiveDaysForecast = await getFiveDaysForecast(lat, lon);

    return { baseForecast, fiveDaysForecast };
}

export const searchByCoord = async (lat, lon, dispatch) => {
    const cachedWeatherData = weatherDataCache[lat]?.[lon];
    const currentTime = new Date().getTime();

    if (cachedWeatherData && currentTime - cachedWeatherData.timestamp < refreshCacheTimeStamp) {
        dispatch(
            updateWeatherData({
                lat,
                lon,
                weatherData: cachedWeatherData.data,
                timestamp: cachedWeatherData.timestamp,
                fiveDaysForecast: cachedWeatherData.fiveDaysForecast,
            })
        );

        return {
            baseForecast: cachedWeatherData.data,
            fiveDaysForecast: cachedWeatherData.fiveDaysForecast,
        };
    } else {
        try {
            const res = await fetch(`${baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
            const baseForecast = await res.json();

            const fiveDaysForecast = await getFiveDaysForecast(lat, lon);

            weatherDataCache[lat] = {
                [lon]: {
                    data: baseForecast,
                    timestamp: currentTime,
                    fiveDaysForecast: fiveDaysForecast,
                },
            };

            dispatch(
                updateWeatherData({
                    lat,
                    lon,
                    weatherData: baseForecast,
                    timestamp: currentTime,
                    fiveDaysForecast: fiveDaysForecast,
                })
            );

            return { baseForecast, fiveDaysForecast };
        } catch (error) {
            console.error(error);
        }
    }
};

async function getFiveDaysForecast(lat, lon) {
    const res = await fetch(`${baseUrl}/forecast?lat=${lat}&lon=${lon}&cnt=40&appid=${apiKey}&units=metric`);
    const data = await res.json();

    const dailyData = [];

    for (let i = 0; i < 5; i++) {
        const dayForecasts = data.list.slice(i * 8, (i + 1) * 8);

        const allMinTempValues = dayForecasts.map((forecast) => forecast.main.temp_min);
        const allMaxTempValues = dayForecasts.map((forecast) => forecast.main.temp_max);

        const minTemp = Math.min(...allMinTempValues);
        const maxTemp = Math.max(...allMaxTempValues);

        const icon = dayForecasts[0].weather[0].icon;

        const date = new Date(dayForecasts[0].dt * 1000);
        const dayKey = date.toLocaleString('en-US', { weekday: 'short' });

        dailyData.push({
            date: dayKey,
            minTemp: minTemp,
            maxTemp: maxTemp,
            icon: icon,
        });
    }

    return dailyData;
}
