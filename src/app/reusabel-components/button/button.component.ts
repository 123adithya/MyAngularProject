import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonSize, ButtonStyle } from '../types';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
@Input() buttonName: string = 'button';
@Input() buttonType: ButtonStyle = "secondary";
@Input() buttonSize: ButtonSize = 'md'
@Output() emitButtonClickEvent = new EventEmitter();

buttonClicked(): void{
this.emitButtonClickEvent.emit();
}
}
