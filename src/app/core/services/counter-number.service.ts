import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CounterNumberService {

  private numberSource = new BehaviorSubject<number>(0);  
  number$ = this.numberSource.asObservable();

 
  updateNumber(newNumber: number): void {
    this.numberSource.next(newNumber);
  }
}
