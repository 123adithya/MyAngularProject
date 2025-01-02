import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideState } from '@ngrx/store';
import { counterReducer } from './app/ngrx-store/counter/counter.reducer';
import { weatherReducer } from './app/ngrx-store/weather/weather.reducer';
import { weatherForcastReducer } from './app/ngrx-store/weather-forcast/weather-forcast.reducer';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...appConfig.providers, 
    provideState('counter', counterReducer),
    provideState('weather', weatherReducer),
    provideState('weatherForcast', weatherForcastReducer),
  ],
})
  .catch((err) => console.error(err));
