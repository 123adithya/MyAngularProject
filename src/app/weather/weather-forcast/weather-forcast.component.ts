import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WeatherForcast } from '../../reusabel-components/weather-forcast.interface';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../reusabel-components/button/button.component';
import { ButtonTypeEnum } from '../../reusabel-components/enum';

@Component({
  selector: 'app-weather-forcast',
  imports: [CommonModule, ButtonComponent],
  templateUrl: './weather-forcast.component.html',
  styleUrl: './weather-forcast.component.scss'
})
export class WeatherForcastComponent implements OnInit {
  ButtonTypeEnum = ButtonTypeEnum;
  @Input() weatherData!: WeatherForcast;

  @Output() refreshWeatherForcastEmitter = new EventEmitter();

  ngOnInit(): void {}

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
