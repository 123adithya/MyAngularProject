import { createAction, props } from '@ngrx/store';
import { WeatherForcast } from '../../../../core/models/weather-forcast.interface';

export const setLastWeatherForcastValue = createAction(
  '[WeatherForcast Component] Set Last WeatherForcastValues',
  props<{ weatherForcast: WeatherForcast }>()
);

export const resetLastWeatherForcastValue = createAction('[WeatherForcast Component] Reset Last WeatherForcastValues');
