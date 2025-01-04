import { WeatherCity } from "../../../../core/models/weather-city.interface";


export interface WeatherState {
    lastWeatherValues: WeatherCity[]  | null;
    lastSelectedWeather: WeatherCity | null;
  }
  
  export const initialState: WeatherState = {
    lastWeatherValues: [],
    lastSelectedWeather: null
  };
  