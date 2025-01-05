import { createAction, props } from '@ngrx/store';
import { WeatherCity } from '../../../../core/models/weather-city.interface';
import { WeatherForcast } from '../../../../core/models/weather-forcast.interface';

// Action for setting the last weather value
export const setLastWeatherValue = createAction(
  '[Weather] Set Last Weather Value',
  props<{ weather: WeatherCity[], selectedWeather: WeatherCity | null }>()
);

// Action for fetching weather data by city
export const fetchWeatherByCity = createAction(
  '[Weather] Fetch Weather By City',
  props<{ city: string }>()
);

// Action for successful weather fetch
export const fetchWeatherByCitySuccess = createAction(
  '[Weather] Fetch Weather By City Success',
  props<{ weather: WeatherCity }>()
);

// Action for failed weather fetch
export const fetchWeatherByCityFailure = createAction(
  '[Weather] Fetch Weather By City Failure',
  props<{ error: string }>()
);

// Action for fetching the weather forecast
export const fetchWeatherForecast = createAction(
  '[Weather] Fetch Weather Forecast',
  props<{ weatherCity: WeatherCity }>()
);

// Action for successful weather forecast fetch
export const fetchWeatherForecastSuccess = createAction(
  '[Weather] Fetch Weather Forecast Success',
  props<{ forecast: WeatherForcast }>()
);

// Action for failed weather forecast fetch
export const fetchWeatherForecastFailure = createAction(
  '[Weather] Fetch Weather Forecast Failure',
  props<{ error: string }>()
);
