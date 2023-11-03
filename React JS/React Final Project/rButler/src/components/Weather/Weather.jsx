import WeatherInfo from './WeatherInfo';
import DailyForecast from './DailyForecast';
import { useForm } from 'react-hook-form';
import Spinner from '../LoadingSpinner/Spinner.jsx';
import { useForecast } from '../../hooks/useForecast.js';

export default function Weather() {
    const { weather, fiveDays, handleSearch, isLoading } = useForecast();
    const { register, handleSubmit } = useForm();

    return (
        <>
            {isLoading ? (
                <Spinner />
            ) : (
                weather.city && (
                    <div className="Weather">
                        <form className="search-bar" onSubmit={handleSubmit(handleSearch)}>
                            <div className="search-location">
                                <input
                                    type="text"
                                    autoComplete="off"
                                    spellCheck="false"
                                    placeholder="Search a city"
                                    {...register('location')}
                                />
                                <span />
                                <input type="submit" value="Go" id="go" />
                            </div>
                        </form>

                        <WeatherInfo info={weather} />
                        <DailyForecast fiveDaysForecast={fiveDays} />
                    </div>
                )
            )}
        </>
    );
}
