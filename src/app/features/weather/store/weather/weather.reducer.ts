import { createReducer, on } from '@ngrx/store';
import { setLastWeatherValue, fetchWeatherByCitySuccess, fetchWeatherByCityFailure, fetchWeatherForecastSuccess, fetchWeatherForecastFailure } from './weather.actions';
import { WeatherCity } from '../../../../core/models/weather-city.interface';
import { WeatherForcast } from '../../../../core/models/weather-forcast.interface';

export interface WeatherState {
  lastWeatherValues: WeatherCity[] | null;
  lastSelectedWeather: WeatherCity | null;
  error: string | null;
  forecastData: WeatherForcast | null;
}

export const initialState: WeatherState = {
  lastWeatherValues: null,
  lastSelectedWeather: null,
  error: null,
  forecastData: null
};

export const weatherReducer = createReducer(
  initialState,
  on(setLastWeatherValue, (state, { weather, selectedWeather }) => ({
    ...state,
    lastWeatherValues: weather,
    lastSelectedWeather: selectedWeather
  })),
  on(fetchWeatherByCitySuccess, (state, { weather }) => ({
    ...state,
    lastWeatherValues: [...(state.lastWeatherValues || []), weather]
  })),
  on(fetchWeatherByCityFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(fetchWeatherForecastSuccess, (state, { forecast }) => ({
    ...state,
    forecastData: forecast
  })),
  on(fetchWeatherForecastFailure, (state, { error }) => ({
    ...state,
    error
  }))
);
