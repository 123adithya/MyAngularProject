import { TestBed } from '@angular/core/testing';

import { CounterNumberService } from './counter-number.service';

describe('CounterNumberService', () => {
  let service: CounterNumberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CounterNumberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
