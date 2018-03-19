import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryComponent } from './library/library.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ LibraryComponent],
  exports: [ LibraryComponent]
})
export class LibraryModule { }
