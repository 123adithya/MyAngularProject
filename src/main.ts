import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideState } from '@ngrx/store';
import { counterReducer } from './app/features/counter/store/counter.reducer';
import { weatherReducer } from './app/features/weather/store/weather/weather.reducer';
import { weatherForcastReducer } from './app/features/weather/store/weather-forcast/weather-forcast.reducer';

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
