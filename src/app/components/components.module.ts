import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { GraficasComponent } from './graficas/graficas.component';




@NgModule({
  declarations: [
    IncrementadorComponent,
    GraficasComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    NgChartsModule
  ],
  exports:[
    IncrementadorComponent,
    GraficasComponent
  ]
})
export class ComponentsModule { }
