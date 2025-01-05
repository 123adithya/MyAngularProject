import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { WeatherCity } from '../models/weather-city.interface';
import { WeatherForcast } from '../models/weather-forcast.interface';

@Injectable({
  providedIn: 'root'
})
export class WeatherUpdateService {

  private apiWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private apiforecastUrl = 'https://api.openweathermap.org/data/2.5/forecast';
  private apiKey = 'd4594364698122bfd1c4b3eb5f2ff19f';


  constructor(private httpClient: HttpClient) { }

  getWeatherByCity(cityName: string): Observable<WeatherCity> {
    const params = {
      q: cityName,
      appid: this.apiKey
    };
    return this.httpClient.get<WeatherCity>(this.apiWeatherUrl, { params }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          console.error('City not found');
        }
        return throwError(error);
      })
    );;
  }

  getWeatherReportForcast(city: WeatherCity): Observable<WeatherForcast> {
      const params = {
        lat: city.coord.lat,
        lon: city.coord.lon,
        appid: this.apiKey
      };
      return this.httpClient.get<WeatherForcast>(this.apiforecastUrl, { params });
    }
  }
