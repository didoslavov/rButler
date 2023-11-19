import WeatherInfo from './WeatherInfo';
import DailyForecast from './DailyForecast';
import { useForm } from 'react-hook-form';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner.jsx';
import { useForecast } from '../../hooks/useForecast.js';

export default function Weather() {
    const { weather, fiveDays, handleSearch, isLoading } = useForecast();
    const { register, handleSubmit, reset } = useForm();

    return (
        <>
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                weather.city && (
                    <div className="weather">
                        <WeatherInfo info={weather} />
                        <form className="weather-search-form" onSubmit={handleSubmit((search) => handleSearch(search, reset))}>
                            <div className="search-location">
                                <input
                                    className="search-form"
                                    type="text"
                                    autoComplete="off"
                                    spellCheck="false"
                                    placeholder="Search a city"
                                    {...register('location')}
                                />
                                <span />
                                <input type="submit" value="Search" className="search-button" />
                            </div>
                        </form>

                        <DailyForecast fiveDaysForecast={fiveDays} />
                    </div>
                )
            )}
        </>
    );
}
