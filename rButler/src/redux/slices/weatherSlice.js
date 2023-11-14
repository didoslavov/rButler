import { createSlice } from '@reduxjs/toolkit';

const weatherSlice = createSlice({
    name: 'weather',
    initialState: {
        weatherData: {},
        lastUpdated: {},
        fiveDaysForecast: [],
    },
    reducers: {
        updateWeatherData: (state, action) => {
            const { lat, lon, weatherData, timestamp, fiveDaysForecast } = action.payload;

            if (!state.weatherData[lat]) {
                state.weatherData[lat] = {};
            }

            state.weatherData[lat][lon] = weatherData;
            state.lastUpdated[lat] = timestamp;
            state.fiveDaysForecast = fiveDaysForecast;
        },
    },
});

export const { updateWeatherData } = weatherSlice.actions;

export default weatherSlice.reducer;
