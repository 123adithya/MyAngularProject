export interface CounterState {
    lastCounterValues: number[] | null;
  }
  
  export const initialState: CounterState = {
    lastCounterValues: [],
  };
  