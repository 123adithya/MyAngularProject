import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { BadgeTypeEnum } from './core/models/enum';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { CounterNumberService } from './core/services/counter-number.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, SharedModule, CoreModule, HttpClientModule],
  providers:[CounterNumberService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'my-angular-project';
  BadgeTypeEnum = BadgeTypeEnum;
  counterListLength: number = 0;

  constructor(private counterNumberService: CounterNumberService, private cdr: ChangeDetectorRef){}

  ngOnInit(): void {
    this.counterNumberService.number$.subscribe((newNumber) => {
      this.counterListLength = newNumber;
      this.cdr.detectChanges();
    });
  }
}
