import { Component} from '@angular/core';

export interface TpGrafic {
  title:string,
  data:number[],
  labels:string[],
  arrColors:string[]
}
@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})

export class Grafica1Component {

  public grafica1:TpGrafic =  {
    title:'Grafica Ventas',
    data: [350, 450, 100],
    labels:['Computadores', 'Celulares', 'Equipos'],
    arrColors:['#6857E6','#009FEE','#F02059']
  }

  public grafica2:TpGrafic =  {
    title:'Grafica Pedidos',
    data: [350, 450, 100],
    labels:['Computadores2', 'Celulares2', 'Equipos2'],
    arrColors:['#6857E2','#009FEA','#F02025']
  }

}
