import { createAction, props } from '@ngrx/store';

export const setLastCounterValue = createAction(
  '[Counter Component] Set Last CounterValues',
  props<{ counter: number[] }>()
);

export const resetLastCounterValue = createAction('[Counter Component] Reset Last CounterValues');
