import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherComponent } from './component/weather.component';
import { WeatherForcastComponent } from './weather-forcast/weather-forcast.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: WeatherComponent }
];

@NgModule({
  declarations: [],
  imports: [WeatherForcastComponent, CommonModule, HttpClientModule, FormsModule, WeatherComponent,RouterModule.forChild(routes)],
  exports: [WeatherForcastComponent, WeatherComponent, RouterModule],
})
export class WeatherModule {}