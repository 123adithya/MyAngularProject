import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { BadgeTypeEnum } from './reusabel-components/enum';
import { BadgeComponent } from './reusabel-components/badge/badge.component';
import { CounterNumberService } from './services/counter-number.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, BadgeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'my-angular-project';
  BadgeTypeEnum = BadgeTypeEnum;
  counterListLength: number = 0

  constructor(private counterNumberService: CounterNumberService, private cdr: ChangeDetectorRef){}

  ngOnInit(): void {
    this.counterNumberService.number$.subscribe((newNumber) => {
      this.counterListLength = newNumber;
      this.cdr.detectChanges();
    });
  }
}
