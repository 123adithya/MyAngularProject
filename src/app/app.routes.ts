import { Routes } from '@angular/router';
import { CounterComponent } from './features/counter/component/counter.component';

export const routes: Routes = [
    { path: '', redirectTo: '/counter', pathMatch: 'full' },
  { path: 'counter', component: CounterComponent },
  {
    path: 'vatavaran',
    loadChildren: () =>
      import('./features/weather/weather.module').then((m) => m.WeatherModule),
  },
];
