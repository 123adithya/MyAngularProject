import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { NavigationStart, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SharedModule } from '../../../shared/shared.module';
import { ButtonTypeEnum } from '../../../core/models/enum';
import { WeatherForcast } from '../../../core/models/weather-forcast.interface';
import { WeatherForcastState } from '../store/weather-forcast/weather-forcast.state';
import { setLastWeatherForcastValue } from '../store/weather-forcast/weather-forcast.actions';

@Component({
  selector: 'app-weather-forcast',
  imports: [CommonModule, SharedModule],
  templateUrl: './weather-forcast.component.html',
  styleUrl: './weather-forcast.component.scss'
})
export class WeatherForcastComponent implements OnInit {
  ButtonTypeEnum = ButtonTypeEnum;
  @Input() weatherData!: WeatherForcast | null;

  @Output() refreshWeatherForcastEmitter = new EventEmitter();

  lastWeatherForcastValues$!: Observable<WeatherForcast | null>;

  constructor(private store: Store<{ weatherForcast: WeatherForcastState }>, private router: Router,){}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if(this.weatherData)this.store.dispatch(setLastWeatherForcastValue({ weatherForcast: this.weatherData }));
      }
    });
    this.lastWeatherForcastValues$ = this.store.select((state) => state.weatherForcast?.lastWeatherForcastValues);
    this.lastWeatherForcastValues$?.subscribe(value => { if(value)this.weatherData = value });
  }

  getWeatherIconUrl(icon: string | undefined): string {
    return icon ? `https://openweathermap.org/img/wn/${icon}.png` : '';
  }

  getDailyForecast(): { date: string; temp: number; icon: string }[] {
    if (!this.weatherData?.list) return [];

    const dailyForecast = this.weatherData.list
      .filter((_, index) => index % 8 === 0)
      .map((item) => ({
        date: new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
        temp: item.main.temp,
        icon: item.weather[0].icon
      }));

    return dailyForecast;
  }

  convertToCelsius(kelvin: number): string {
    return (kelvin - 273.15).toFixed(2);
  }

  refreshWeatherForcast(){
   this.refreshWeatherForcastEmitter.emit();
  }
}
