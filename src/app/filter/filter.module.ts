import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilterRoutingModule } from './filter-routing.module';
import { FilterComponent } from './filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from '../filter.pipe';
import { MatDialogModule} from '@angular/material/dialog/';
import { AddComponent } from './add/add.component';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [FilterComponent,FilterPipe, AddComponent],
  imports: [
    CommonModule,
    FilterRoutingModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
  ]
})
export class FilterModule { }
