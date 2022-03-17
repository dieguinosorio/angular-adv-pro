import { Component, Input, Output, EventEmitter,OnInit } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit{

  ngOnInit(){
    this.btnClass = `btn ${this.btnClass}`
  }

  //De esta manera podemos cambiar el nombre de la propiedad desde componente padre
  //@Input('valor') progress:number = 0
  @Input('valor') progress:number = 0
  @Input() btnClass:string = 'btn-primary'
  @Output('valor') valorSalida:EventEmitter<number> = new EventEmitter();
  constructor() { }



  cambioValor(valor:number){
    if(this.progress>=100 && valor >=0){
      this.progress =100
      this.valorSalida.emit(100)
    }
    else if(this.progress<=0 && valor < 0){
      this.progress = 0;
      this.valorSalida.emit(0)
    }
    this.progress = this.progress+valor
    this.valorSalida.emit(this.progress)
  }

  onChange(newVal:number){
    //console.log({oldValue :this.progress,newVal:valor})
    if(newVal >= 100){
      this.progress = 100;
    }
    else if(newVal <= 0){
      this.progress = 0;
    }
    else{
      this.progress = newVal
    }
    this.valorSalida.emit(this.progress)
  }

}
