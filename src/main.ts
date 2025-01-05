import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideState } from '@ngrx/store';
import { counterReducer } from './app/features/counter/store/counter.reducer';
import { weatherReducer } from './app/features/weather/store/weather/weather.reducer';
import { weatherForcastReducer } from './app/features/weather/store/weather-forcast/weather-forcast.reducer';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import { importProvidersFrom } from '@angular/core';
import { WeatherEffects } from './app/features/weather/store/weather/weather.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { WeatherUpdateService } from './app/core/services/weather-update.service';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    provideState('counter', counterReducer),
    provideState('weather', weatherReducer),
    provideState('weatherForcast', weatherForcastReducer),
    provideEffects([WeatherEffects]),
    provideStoreDevtools({
      maxAge: 25, // Retain last 25 actions
      logOnly: true, // Log actions only in production
    }),
    WeatherUpdateService,
  ],
})
  .catch((err) => console.error(err));


