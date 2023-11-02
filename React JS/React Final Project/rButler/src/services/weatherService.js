const apiKey = '65c8bce3c3835f283c727ae2bbd5cf75';
const baseUrl = 'https://api.openweathermap.org/data/2.5';

export async function searchLocation(city) {
    const res = await fetch(`${baseUrl}/weather?q=${city}&appid=${apiKey}&units=metric`);
    const baseForecast = await res.json();

    const lat = baseForecast.coord?.lat;
    const lon = baseForecast.coord?.lon;

    const fiveDaysForecast = await getFiveDaysForecast(lat, lon);

    return { baseForecast, fiveDaysForecast };
}

export async function searchByCoord(lat, lon) {
    const res = await fetch(`${baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
    const baseForecast = await res.json();

    const fiveDaysForecast = await getFiveDaysForecast(lat, lon);

    return { baseForecast, fiveDaysForecast };
}

async function getFiveDaysForecast(lat, lon) {
    const res = await fetch(`${baseUrl}/forecast?lat=${lat}&lon=${lon}&cnt=5&appid=${apiKey}&units=metric`);
    return await res.json();
}
