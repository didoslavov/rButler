import AnimatedIcons from './AnimatedIcon';

export default function DailyForecastDay({ forecast }) {
    function maxTemp() {
        const temperature = Math.round(forecast.main['temp_max']);
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
            <AnimatedIcons size={30} code={forecast.weather[0].icon} />
            <div className="daily-forecast-temps">
                <span className="daily-forecast-temp-max">{maxTemp()}°</span>
            </div>
        </div>
    );
}
