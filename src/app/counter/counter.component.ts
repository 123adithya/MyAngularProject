import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from '../reusabel-components/button/button.component';
import { BadgeComponent } from '../reusabel-components/badge/badge.component';
import { CounterAction, ButtonTypeEnum } from '../reusabel-components/enum';
import { CommonModule } from '@angular/common';
import { CounterNumberService } from '../services/counter-number.service';

@Component({
  selector: 'app-counter',
  imports: [ButtonComponent, BadgeComponent, CommonModule],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss'
})
export class CounterComponent implements OnInit{
  CounterAction = CounterAction;
  ButtonTypeEnum = ButtonTypeEnum;
  
  counterListArray: number[] = [];

  constructor(private counterNumberService: CounterNumberService){}

ngOnInit(): void {
  this.counterNumberService.updateNumber(this.counterListArray.length);
}


  performCounterAction(action: CounterAction, index?: number): void {
    switch (action) {
      case CounterAction.Reset:
        this.counterListArray = [];
        break;
      case CounterAction.Add:
        this.counterListArray.unshift(Math.floor(Math.random() * 100) + 1);
        break;
      case CounterAction.Increment:
        if(index != undefined)this.counterListArray[index]++;
        break;
      case CounterAction.Decrement:
        if(index != undefined)this.counterListArray[index]--;
        break;
      case CounterAction.Delete:
        if(index != undefined)this.counterListArray.splice(index, 1);
        break;
      default:
      console.log("Wronge Action Performed")
    }
    this.counterNumberService.updateNumber(this.counterListArray.length);
  }
}
