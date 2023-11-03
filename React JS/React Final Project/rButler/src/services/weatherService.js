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
            fiveDaysForecast: { list: cachedWeatherData.fiveDaysForecast },
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
                    fiveDaysForecast: fiveDaysForecast.list,
                },
            };

            dispatch(
                updateWeatherData({
                    lat,
                    lon,
                    weatherData: baseForecast,
                    timestamp: currentTime,
                    fiveDaysForecast: fiveDaysForecast.list,
                })
            );

            return { baseForecast, fiveDaysForecast };
        } catch (error) {
            console.error(error);
        }
    }
};

async function getFiveDaysForecast(lat, lon) {
    const res = await fetch(`${baseUrl}/forecast?lat=${lat}&lon=${lon}&cnt=5&appid=${apiKey}&units=metric`);
    return await res.json();
}
