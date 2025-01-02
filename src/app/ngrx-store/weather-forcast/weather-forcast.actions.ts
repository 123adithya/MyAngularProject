import { createAction, props } from '@ngrx/store';
import { WeatherForcast } from '../../reusabel-components/weather-forcast.interface';

export const setLastWeatherForcastValue = createAction(
  '[WeatherForcast Component] Set Last WeatherForcastValues',
  props<{ weatherForcast: WeatherForcast }>()
);

export const resetLastWeatherForcastValue = createAction('[WeatherForcast Component] Reset Last WeatherForcastValues');
