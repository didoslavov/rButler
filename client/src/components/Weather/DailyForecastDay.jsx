import AnimatedIcons from './AnimatedIcon';

export default function DailyForecastDay({ forecast }) {
    function maxTemp() {
        const temperature = Math.round(forecast.maxTemp);
        return `${temperature}`;
    }

    function minTemp() {
        const temperature = Math.round(forecast.minTemp);
        return `${temperature}`;
    }

    function day() {
        const date = new Date(forecast.dt * 1000);
        const day = date.getDay();
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        return days[day];
    }

    return (
        <div>
            <div className="daily-forecast-day">{day()}</div>
            <p className="dayli-forecast-date">{forecast.date.split('-').join(' ')}</p>
            <AnimatedIcons size={30} code={forecast.icon} />
            <div className="daily-forecast-temps">
                <span className="daily-forecast-temp-min">{minTemp()}°</span>
                <span className="daily-forecast-temp-max">{maxTemp()}°</span>
            </div>
        </div>
    );
}
