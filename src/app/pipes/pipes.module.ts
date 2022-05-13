import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetImgPipe } from './get-img.pipe';

@NgModule({
  declarations: [
    GetImgPipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    GetImgPipe
  ]
})
export class PipesModule { }
