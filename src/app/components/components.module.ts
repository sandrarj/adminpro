import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { GraficoDonaComponent } from './grafico-dona/grafico-dona.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    IncrementadorComponent,
    GraficoDonaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule    
  ],
  exports: [
    IncrementadorComponent,
    GraficoDonaComponent
  ]
})
export class ComponentsModule { }
