import { createAction, props } from '@ngrx/store';
import { WeatherCity } from '../../reusabel-components/weather-city.interface';

export const setLastWeatherValue = createAction(
  '[Weather Component] Set Last WeatherValues',
  props<{ weather: WeatherCity[] }>()
);

export const resetLastWeatherValue = createAction('[Weather Component] Reset Last WeatherValues');
