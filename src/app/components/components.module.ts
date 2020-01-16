import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { GraficoDonaComponent } from './grafico-dona/grafico-dona.component';
import { ChartsModule } from 'ng2-charts';
import { ModalUploadComponent } from './modal-upload/modal-upload.component';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [
    IncrementadorComponent,
    GraficoDonaComponent,
    ModalUploadComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule,    
    PipesModule    
  ],
  exports: [
    IncrementadorComponent,
    GraficoDonaComponent,
    ModalUploadComponent
  ]
})
export class ComponentsModule { }
