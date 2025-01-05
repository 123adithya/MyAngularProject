import { WeatherCity } from "../../../../core/models/weather-city.interface";
import { WeatherForcast } from "../../../../core/models/weather-forcast.interface";

export interface WeatherState {
  lastWeatherValues: WeatherCity[] | null;
  lastSelectedWeather: WeatherCity | null;
  error: string | null;
  forecastData: WeatherForcast | null;
}

export const initialState: WeatherState = {
  lastWeatherValues: null,
  lastSelectedWeather: null,
  error: null,
  forecastData: null
};