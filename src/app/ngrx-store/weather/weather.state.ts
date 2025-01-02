import { WeatherCity } from "../../reusabel-components/weather-city.interface";

export interface WeatherState {
    lastWeatherValues: WeatherCity[]  | null;
  }
  
  export const initialState: WeatherState = {
    lastWeatherValues: [],
  };
  