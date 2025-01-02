import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ButtonComponent } from '../reusabel-components/button/button.component';
import { BadgeComponent } from '../reusabel-components/badge/badge.component';
import { CounterAction, ButtonTypeEnum } from '../reusabel-components/enum';
import { CommonModule } from '@angular/common';
import { CounterNumberService } from '../services/counter-number.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { CounterState } from '../ngrx-store/counter/counter.state';
import { NavigationStart, Router } from '@angular/router';
import { setLastCounterValue } from '../ngrx-store/counter/counter.actions';

@Component({
  selector: 'app-counter',
  imports: [ButtonComponent, BadgeComponent, CommonModule],
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
