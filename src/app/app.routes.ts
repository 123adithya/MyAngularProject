import { Routes } from '@angular/router';
import { CounterComponent } from './counter/counter.component';

export const routes: Routes = [
    { path: '', redirectTo: '/counter', pathMatch: 'full' },
  { path: 'counter', component: CounterComponent },
  {
    path: 'vatavaran',
    loadComponent: () =>
      import('./weather/weather.component').then((m) => m.WeatherComponent),
  },
];
