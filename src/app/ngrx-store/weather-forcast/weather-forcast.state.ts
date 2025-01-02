import { WeatherForcast } from "../../reusabel-components/weather-forcast.interface";

export interface WeatherForcastState {
    lastWeatherForcastValues: WeatherForcast  | null;
  }
  
  export const initialState: WeatherForcastState = {
    lastWeatherForcastValues: null,
  };
  