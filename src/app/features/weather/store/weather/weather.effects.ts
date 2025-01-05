import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { fetchWeatherByCity, fetchWeatherByCitySuccess, fetchWeatherByCityFailure, fetchWeatherForecast, fetchWeatherForecastSuccess, fetchWeatherForecastFailure } from './weather.actions';
import { WeatherState } from './weather.state';
import { WeatherUpdateService } from '../../../../core/services/weather-update.service';
import { WeatherCity } from '../../../../core/models/weather-city.interface';
import { WeatherForcast } from '../../../../core/models/weather-forcast.interface';

@Injectable()
export class WeatherEffects {
  constructor(
    private actions$: Actions,
    private weatherService: WeatherUpdateService,
    private store: Store<{ weather: WeatherState }>
  ) {
    this.actions$.subscribe({
        next: (action) => console.log('Action received:', action),
        error: (err) => console.error('Error in Actions:', err),
        complete: () => console.warn('Actions observable completed'),
      });
}

  // Effect to fetch weather by city
  fetchWeather$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchWeatherByCity),
      tap((action) => console.log('fetchWeatherByCity action intercepted',action)),
      map((action) => {
        console.log('Action received by effect:', action);
        return action;
      }),
      mergeMap(({ city }) =>
        this.weatherService.getWeatherByCity(city).pipe(
          map((weather: WeatherCity) => fetchWeatherByCitySuccess({ weather })),
          catchError((error) => of(fetchWeatherByCityFailure({ error: 'City not found' })))
        )
      )
    )
);

  // Effect to fetch weather forecast
  fetchWeatherForecast$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchWeatherForecast),
      mergeMap(({ weatherCity }) =>
        this.weatherService.getWeatherReportForcast(weatherCity).pipe(
          map((forecast: WeatherForcast) => fetchWeatherForecastSuccess({ forecast })),
          catchError((error) => of(fetchWeatherForecastFailure({ error: 'Failed to fetch forecast' })))
        )
      )
    ));
}
