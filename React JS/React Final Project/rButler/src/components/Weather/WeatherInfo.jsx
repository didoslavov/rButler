import React from 'react';
import AnimatedIcons from './AnimatedIcon.jsx';

export default function WeatherInfo(props) {
    return (
        <div className="WeatherInfo">
            <h2>{props.info.city}</h2>

            <div className="temperatures-display">
                <AnimatedIcons code={props.info.icon} size={55} alt={props.info.description} />

                <div className="temperatures-info">
                    <h1>{props.info.temperature}</h1>
                    <p className="units">°C</p>
                </div>
            </div>
            <h3>{props.info.description}</h3>
            <div className="humidityWind">
                <div>
                    <i></i> Humidity: {props.info.humidity}%
                </div>
                <div>
                    <i></i> Wind: {props.info.wind}km/h
                </div>
            </div>
        </div>
    );
}
