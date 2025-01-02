import { Component, OnInit } from '@angular/core';
import { ButtonTypeEnum } from '../reusabel-components/enum';
import { ButtonComponent } from '../reusabel-components/button/button.component';
import { CommonModule } from '@angular/common';
import { WeatherUpdateService } from '../services/weather-update.service';
import { HttpClientModule } from '@angular/common/http';
import { WeatherCity } from '../reusabel-components/weather-city.interface';
import { WeatherForcastComponent } from './weather-forcast/weather-forcast.component';
import { WeatherForcast } from '../reusabel-components/weather-forcast.interface';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { WeatherState } from '../ngrx-store/weather/weather.state';
import { NavigationStart, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { setLastWeatherValue } from '../ngrx-store/weather/weather.actions';

@Component({
  selector: 'app-weather',
  imports: [ButtonComponent, WeatherForcastComponent, CommonModule, HttpClientModule, FormsModule],
  providers: [WeatherUpdateService],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss'
})
export class WeatherComponent implements OnInit{

  ButtonTypeEnum = ButtonTypeEnum;

  citysWeatherReport: WeatherCity[] = [];
  selectedWeatherCity!: WeatherCity;

  weatherData!: WeatherForcast | null;
  lastWeatherValues$!: Observable<WeatherCity[] | null>;


  constructor(private weatherUpdateService: WeatherUpdateService, private store: Store<{ weather: WeatherState }>, private router: Router,){}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.store.dispatch(setLastWeatherValue({ weather: this.citysWeatherReport }));
      }
    });
    this.lastWeatherValues$ = this.store.select((state) => state.weather?.lastWeatherValues);
    this.lastWeatherValues$?.subscribe(values => this.citysWeatherReport = [...values || []]);
  }

  getWeatherReport(value: string, refresh: boolean = false): void {
    if(this.citysWeatherReport.findIndex((report) => report.name === value) > -1){
      refresh = true;
    }
    this.weatherUpdateService.getWeatherByCity(value).subscribe(
      (data: WeatherCity) => {
        if (refresh) {
          const index = this.citysWeatherReport.findIndex((report) => report.name === value);
          if (index > -1) {
            this.citysWeatherReport[index] = data;
          }
        } else {
          this.citysWeatherReport.unshift(data);
          if (this.citysWeatherReport.length > 8) {
            this.citysWeatherReport.pop();
        }
        this.store.dispatch(setLastWeatherValue({ weather: this.citysWeatherReport }));
        }
      },
      (error) => {
        console.error('Error fetching weather:', error);
        alert('Error fetching weather: City/ Country not found');
      }
    );
  }


  getWeatherForcast(weather: WeatherCity){
    this.selectedWeatherCity = weather;
    this.weatherUpdateService.getWeatherReportForcast(weather).subscribe(
      (data: WeatherForcast) => {
        this.weatherData = data;
      },
      (error) => {
        console.error('Error fetching forcast:', error);
        alert('Error fetching forcast:' + error);
      }
    );
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

  removeCityReports(){
    if(this.citysWeatherReport.length <= 0){
      alert("No data to remove");
    }else{
      this.citysWeatherReport = [];
      this.weatherData = null;
      this.store.dispatch(setLastWeatherValue({ weather: this.citysWeatherReport }));
      alert("Weather Reports cleard");
    }
  }

  refreashWeatherForcast(){
    this.getWeatherForcast(this.selectedWeatherCity);
  }
}
