
import { createReducer, on } from '@ngrx/store';
import { initialState } from './weather-forcast.state';
import { resetLastWeatherForcastValue, setLastWeatherForcastValue } from './weather-forcast.actions';

export const weatherForcastReducer = createReducer(
  initialState,
  on(setLastWeatherForcastValue, (state, { weatherForcast }) => ({ ...state, lastWeatherForcastValues: weatherForcast })),
  on(resetLastWeatherForcastValue, (state) => ({ ...state, lastWeatherForcastValues: null }))
);
