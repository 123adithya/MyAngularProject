import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BadgeComponent } from './components/badge/badge.component';
import { ButtonComponent } from './components/button/button.component';

@NgModule({
  declarations: [],
  imports: [
    ButtonComponent,
    BadgeComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    ButtonComponent,
    BadgeComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SharedModule {}
