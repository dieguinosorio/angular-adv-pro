import { Component, Input , OnInit } from '@angular/core';
import { ChartData, ChartType  } from 'chart.js';

export interface TpGrafic {
  title:string,
  data:number[],
  labels:string[],
  arrColors:string[]
}

@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styles: [
  ]
})


export class GraficasComponent implements OnInit {
  public doughnutChartData: ChartData<'doughnut'> ={datasets:[]};
  @Input('data') objData:TpGrafic = {
    title:'Sin Definir',
    data:[],
    labels:[],
    arrColors:[]
  }
  public doughnutChartType:ChartType = 'doughnut';

  ngOnInit(){
    this.loadChart()
  }

  loadChart(){
    this.doughnutChartData =  {
      labels: this.objData.labels,
      datasets: [
        {
          data: this.objData.data,
          backgroundColor:this.objData.arrColors
        },
      ]
    }
  }
}

