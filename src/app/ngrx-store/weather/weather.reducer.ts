
import { createReducer, on } from '@ngrx/store';
import { initialState } from './weather.state';
import { resetLastWeatherValue, setLastWeatherValue } from './weather.actions';

export const weatherReducer = createReducer(
  initialState,
  on(setLastWeatherValue, (state, { weather }) => ({ ...state, lastWeatherValues: weather })),
  on(resetLastWeatherValue, (state) => ({ ...state, lastWeatherValues: null }))
);
