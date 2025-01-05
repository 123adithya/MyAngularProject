import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NavigationStart, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ButtonTypeEnum } from '../../../core/models/enum';
import { WeatherCity } from '../../../core/models/weather-city.interface';
import { WeatherForcast } from '../../../core/models/weather-forcast.interface';
import { WeatherState } from '../store/weather/weather.state';
import { setLastWeatherValue, fetchWeatherByCity, fetchWeatherForecast } from '../store/weather/weather.actions';
import { SharedModule } from '../../../shared/shared.module';
import { WeatherForcastComponent } from '../weather-forcast/weather-forcast.component';

@Component({
  selector: 'app-weather',
  imports: [SharedModule, WeatherForcastComponent],
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  ButtonTypeEnum = ButtonTypeEnum;

  citysWeatherReport: WeatherCity[] = [];
  selectedWeatherCity!: WeatherCity | null;
  weatherData!: WeatherForcast | null;
  lastWeatherValues$!: Observable<{ cities: WeatherCity[] | null, selectedCity: WeatherCity | null } | null>;

  constructor(
    private store: Store<{ weather: WeatherState }>,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // Listen for navigation events to dispatch the last weather value action
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.store.dispatch(setLastWeatherValue({
          weather: this.citysWeatherReport,
          selectedWeather: this.selectedWeatherCity!
        }));
      }
    });

    // Select the last weather values and selected city from the store
    this.lastWeatherValues$ = this.store.select((state) => {
      return {
        cities: state.weather?.lastWeatherValues,
        selectedCity: state.weather?.lastSelectedWeather
      };
    });

    // Subscribe to the store's weather state
    this.lastWeatherValues$.subscribe(values => {
      this.citysWeatherReport = [...(values?.cities || [])];
      this.selectedWeatherCity = values?.selectedCity || null;
    });
  }

  getWeatherReport(value: string, refresh: boolean = false): void {
    if (this.citysWeatherReport.findIndex((report) => report.name === value) > -1) {
      refresh = true;
    }
    this.store.dispatch(fetchWeatherByCity({ city: value }));

    // Handle the state update in the reducer after fetching weather
    this.store.select(state => state.weather.lastWeatherValues).subscribe(weatherData => {
      if (weatherData) {
        const weather = weatherData.find((report) => report.name === value);
        if (weather) {
          if (refresh) {
            const index = this.citysWeatherReport.findIndex((report) => report.name === value);
            if (index > -1) {
              this.citysWeatherReport[index] = weather;
            }
          } else {
            this.citysWeatherReport.unshift(weather);
            if (this.citysWeatherReport.length > 8) {
              this.citysWeatherReport.pop();
            }
          }
        }
      }
    });
  }

  getWeatherForcast(weather: WeatherCity): void {
    this.selectedWeatherCity = weather;
    this.store.dispatch(fetchWeatherForecast({ weatherCity: weather }));

    // Handle the state update for the weather forecast
    this.store.select(state => state.weather.forecastData).subscribe(forecast => {
      if (forecast) {
        this.weatherData = forecast;
        this.store.dispatch(setLastWeatherValue({
          weather: this.citysWeatherReport,
          selectedWeather: this.selectedWeatherCity!
        }));
      }
    });
  }

  convertToCelsius(kelvin: number): string {
    return (kelvin - 273.15).toFixed(2);
  }

  formatWeatherString(weather: WeatherCity): string {
    const cityName = weather.name;
    const temperature = this.convertToCelsius(weather.main.temp);
    const weatherCondition = weather.weather[0].main;
    return `${cityName} - ${temperature}°C ${weatherCondition}`;
  }

  removeWeatherReport(cityName: string): void {
    const index = this.citysWeatherReport.findIndex((report) => report.name === cityName);
    if (index > -1) {
      this.weatherData = null;
      this.citysWeatherReport.splice(index, 1);
      console.log(`${cityName} weather report removed successfully.`);
    } else {
      console.warn(`${cityName} weather report not found.`);
    }
  }

  removeCityReports(): void {
    if (this.citysWeatherReport.length <= 0) {
      alert("No data to remove");
    } else {
      this.citysWeatherReport = [];
      this.weatherData = null;
      this.store.dispatch(setLastWeatherValue({
        weather: this.citysWeatherReport,
        selectedWeather: this.selectedWeatherCity!
      }));
      alert("Weather Reports cleared");
    }
  }

  refreashWeatherForcast(): void {
    if (this.selectedWeatherCity) {
      this.getWeatherForcast(this.selectedWeatherCity);
    }
  }
}
