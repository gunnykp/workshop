import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoxRoutingModule } from './box-routing.module';
import { BoxComponent } from './box.component';
import { KtdGridModule } from "@katoid/angular-grid-layout";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatInputModule } from "@angular/material/input";
import { MatChipsModule } from "@angular/material/chips";
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [BoxComponent],
  imports: [
    CommonModule,
    BoxRoutingModule,
    KtdGridModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatInputModule,
    MatChipsModule,
    MatTableModule,
    FormsModule,
    MatPaginatorModule,
    MatSortModule
  ]
})
export class BoxModule { }
