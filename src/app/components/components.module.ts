import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { GraficasComponent } from './graficas/graficas.component';
import { ModalImageComponent } from './modal-image/modal-image.component';




@NgModule({
  declarations: [
    IncrementadorComponent,
    GraficasComponent,
    ModalImageComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    NgChartsModule
  ],
  exports:[
    IncrementadorComponent,
    GraficasComponent,
    ModalImageComponent
  ]
})
export class ComponentsModule { }
