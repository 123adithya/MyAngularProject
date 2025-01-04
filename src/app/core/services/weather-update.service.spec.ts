import { TestBed } from '@angular/core/testing';
import { WeatherUpdateService } from './weather-update.service';


describe('WeatherUpdateService', () => {
  let service: WeatherUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
