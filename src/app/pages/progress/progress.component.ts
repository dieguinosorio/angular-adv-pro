import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: [
    './progress.component.css'
  ]
})
export class ProgressComponent{
  progress1:number =0
  progress2:number =0

  get getProgress1(){
    return `${this.progress1}%`
  }

  get getProgress2(){
    return `${this.progress2}%`
  }

  cambioValor(valor:number){
    this.progress1 = valor
  }
}
