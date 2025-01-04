import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { NavigationStart, Router } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { ButtonTypeEnum, CounterAction } from '../../../core/models/enum';
import { CounterNumberService } from '../../../core/services/counter-number.service';
import { CounterState } from '../store/counter.state';
import { setLastCounterValue } from '../store/counter.actions';

@Component({
  selector: 'app-counter',
  imports: [SharedModule, CommonModule],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss',
 })
export class CounterComponent implements OnInit{
  CounterAction = CounterAction;
  ButtonTypeEnum = ButtonTypeEnum;
  
  counterListArray: number[] = [];

  lastCounterValues$!: Observable<number[] | null>;

  constructor(private counterNumberService: CounterNumberService, private store: Store<{ counter: CounterState }>, private router: Router,private cdr: ChangeDetectorRef){}

ngOnInit(): void {
  this.router.events.subscribe(event => {
    if (event instanceof NavigationStart) {
      this.store.dispatch(setLastCounterValue({ counter: this.counterListArray }));
    }
  });
  this.lastCounterValues$ = this.store.select((state) => state.counter?.lastCounterValues);
  this.lastCounterValues$?.subscribe(values => {this.counterListArray = values ? [...values] : [], this.cdr.detectChanges()});
  this.counterNumberService.updateNumber(this.counterListArray.length);
}


  performCounterAction(action: CounterAction, index?: number): void {
    let newCounterList = [...this.counterListArray];
    switch (action) {
      case CounterAction.Reset:
        newCounterList = [];
        break;
      case CounterAction.Add:
        newCounterList.unshift(Math.floor(Math.random() * 100) + 1);
        break;
      case CounterAction.Increment:
        if(index != undefined)newCounterList[index]++;
        break;
      case CounterAction.Decrement:
        if(index != undefined)newCounterList[index]--;
        break;
      case CounterAction.Delete:
        if(index != undefined)newCounterList.splice(index, 1);
        break;
      default:
      console.log("Wronge Action Performed")
    }
    this.store.dispatch(setLastCounterValue({ counter: newCounterList }));
    this.counterNumberService.updateNumber(this.counterListArray.length);
    this.counterListArray = newCounterList;
  }
}
