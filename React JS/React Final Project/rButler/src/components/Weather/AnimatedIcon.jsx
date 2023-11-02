import React from 'react';
import { ReactSkycon } from 'react-skycons-extended';

export default function AnimatedIcons(props) {
    const codeMapping = {
        '01d': 'CLEAR_DAY',
        '01n': 'CLEAR_NIGHT',
        '02d': 'PARTLY_CLOUDY_DAY',
        '02n': 'PARTLY_CLOUDY_NIGHT',
        '03d': 'PARTLY_CLOUDY_DAY',
        '03n': 'PARTLY_CLOUDY_NIGHT',
        '04d': 'CLOUDY',
        '04n': 'CLOUDY',
        '09d': 'RAIN',
        '09n': 'RAIN',
        '10d': 'RAIN',
        '10n': 'RAIN',
        '11d': 'RAIN',
        '11n': 'RAIN',
        '13d': 'SNOW',
        '13n': 'SNOW',
        '50d': 'FOG',
        '50n': 'FOG',
    };

    return (
        <div className="AnimatedIcons">
            <ReactSkycon icon={codeMapping[props.code]} color="#2d475a" size={props.size} animate={true} resizeClear={true} />
        </div>
    );
}
