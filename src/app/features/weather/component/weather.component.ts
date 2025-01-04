import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NavigationStart, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ButtonTypeEnum } from '../../../core/models/enum';
import { WeatherCity } from '../../../core/models/weather-city.interface';
import { WeatherForcast } from '../../../core/models/weather-forcast.interface';
import { WeatherUpdateService } from '../../../core/services/weather-update.service';
import { WeatherState } from '../store/weather/weather.state';
import { setLastWeatherValue } from '../store/weather/weather.actions';
import { WeatherForcastComponent } from '../weather-forcast/weather-forcast.component';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-weather',
  imports: [WeatherForcastComponent, SharedModule],
  providers: [WeatherUpdateService],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss'
})
export class WeatherComponent implements OnInit{

  ButtonTypeEnum = ButtonTypeEnum;

  citysWeatherReport: WeatherCity[] = [];
  selectedWeatherCity!: WeatherCity | null;

  weatherData!: WeatherForcast | null;
  lastWeatherValues$!: Observable<{ cities: WeatherCity[] | null, selectedCity: WeatherCity | null } | null>;
  lastselectedWeatherCity$!: Observable<WeatherCity | null>;

  constructor(private weatherUpdateService: WeatherUpdateService, private store: Store<{ weather: WeatherState }>, private router: Router,){}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.store.dispatch(setLastWeatherValue({ weather: this.citysWeatherReport, selectedWeather: this.selectedWeatherCity! }));
      }
    });
    this.lastWeatherValues$ = this.store.select((state) => { return {cities : state.weather?.lastWeatherValues, selectedCity: state.weather?.lastSelectedWeather}});
    this.lastWeatherValues$?.subscribe(values => {this.citysWeatherReport = [...values?.cities || []], this.selectedWeatherCity = values?.selectedCity ? values.selectedCity : null});
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
        this.store.dispatch(setLastWeatherValue({ weather: this.citysWeatherReport, selectedWeather: this.selectedWeatherCity!}));
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
        this.store.dispatch(setLastWeatherValue({ weather: this.citysWeatherReport, selectedWeather: this.selectedWeatherCity! }));
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
      this.store.dispatch(setLastWeatherValue({ weather: this.citysWeatherReport, selectedWeather: this.selectedWeatherCity! }));
      alert("Weather Reports cleard");
    }
  }

  refreashWeatherForcast(){
    this.getWeatherForcast(this.selectedWeatherCity!);
  }
}
