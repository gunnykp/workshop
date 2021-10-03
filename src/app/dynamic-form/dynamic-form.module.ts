import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DynamicFormRoutingModule } from './dynamic-form-routing.module';
import { DynamicFormComponent } from './dynamic-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [DynamicFormComponent],
  imports: [
    CommonModule,
    DynamicFormRoutingModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ]
})
export class DynamicFormModule { }
