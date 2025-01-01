import { Component, Input } from '@angular/core';
import { BadgeStyle } from '../types';

@Component({
  selector: 'app-badge',
  imports: [],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss'
})
export class BadgeComponent {
  @Input() badgeValue: number = 0;
  @Input() badgeType: BadgeStyle= "primary"; 
}
