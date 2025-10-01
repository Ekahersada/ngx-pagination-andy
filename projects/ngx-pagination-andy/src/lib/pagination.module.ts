import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationAndy } from './pagination.component';

@NgModule({
  imports: [CommonModule, PaginationAndy],
  exports: [PaginationAndy],
})
export class PaginationModule { }
