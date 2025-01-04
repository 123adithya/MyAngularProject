import { WeatherForcast } from "../../../../core/models/weather-forcast.interface";


export interface WeatherForcastState {
    lastWeatherForcastValues: WeatherForcast  | null;
  }
  
  export const initialState: WeatherForcastState = {
    lastWeatherForcastValues: null,
  };
  