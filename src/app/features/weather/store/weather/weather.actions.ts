import { createAction, props } from '@ngrx/store';
import { WeatherCity } from '../../../../core/models/weather-city.interface';

export const setLastWeatherValue = createAction(
  '[Weather Component] Set Last WeatherValues',
  props<{ weather: WeatherCity[], selectedWeather: WeatherCity}>()
);

export const resetLastWeatherValue = createAction('[Weather Component] Reset Last WeatherValues');
