import './DailyForecast.css';
import DailyForecastDay from './DailyForecastDay';

export default function DailyForecast({ fiveDaysForecast }) {
    if (!fiveDaysForecast) {
        return;
    }

    return (
        <div className="DailyForecast">
            <div className="row">
                {fiveDaysForecast.map((forecast, index) => {
                    return (
                        <div className="col" key={index}>
                            <DailyForecastDay forecast={forecast} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
