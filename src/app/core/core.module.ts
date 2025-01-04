import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterNumberService } from './services/counter-number.service';
import { WeatherUpdateService } from './services/weather-update.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    CounterNumberService,
    WeatherUpdateService,
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded.'
      );
    }
  }
}
