import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherComponent } from './component/weather.component';
import { WeatherForcastComponent } from './weather-forcast/weather-forcast.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { provideEffects } from '@ngrx/effects';
import { WeatherEffects } from './store/weather/weather.effects';
import { WeatherUpdateService } from '../../core/services/weather-update.service';

const routes: Routes = [
  { path: '', component: WeatherComponent }
];

@NgModule({
  declarations: [],
  providers: [provideEffects(WeatherEffects), WeatherUpdateService],
  imports: [WeatherForcastComponent, CommonModule, HttpClientModule, FormsModule, WeatherComponent,RouterModule.forChild(routes)],
  exports: [WeatherForcastComponent, WeatherComponent, RouterModule],
})
export class WeatherModule {}