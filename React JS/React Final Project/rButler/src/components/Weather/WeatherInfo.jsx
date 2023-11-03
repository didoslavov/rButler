import React from 'react';
import AnimatedIcons from './AnimatedIcon.jsx';
import AirSharpIcon from '@mui/icons-material/AirSharp';
import WaterDropSharpIcon from '@mui/icons-material/WaterDropSharp';

export default function WeatherInfo(props) {
    return (
        <div className="weather-info">
            <h2>{props.info.city}</h2>

            <div className="temperatures-display">
                <AnimatedIcons code={props.info.icon} size={55} alt={props.info.description} />

                <div className="temperatures-info">
                    <h1>{props.info.temperature}</h1>
                    <p className="units">°C</p>
                </div>
            </div>
            <h3 className="temperatures-display-weather">{props.info.description}</h3>
            <div className="humidity-wind">
                <div className="temperatures-display-info">
                    <WaterDropSharpIcon fontSize="small" />
                    Humidity: {props.info.humidity}%
                </div>
                <div className="temperatures-display-info">
                    <AirSharpIcon fontSize="small" />
                    Wind: {props.info.wind} km/h
                </div>
            </div>
        </div>
    );
}
