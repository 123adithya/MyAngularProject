
import { createReducer, on } from '@ngrx/store';
import { initialState } from './counter.state';
import { resetLastCounterValue, setLastCounterValue } from './counter.actions';

export const counterReducer = createReducer(
  initialState,
  on(setLastCounterValue, (state, { counter }) => ({ ...state, lastCounterValues: counter })),
  on(resetLastCounterValue, (state) => ({ ...state, lastCounterValues: null }))
);
