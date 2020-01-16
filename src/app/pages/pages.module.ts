import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { PagesRoutingModule } from './pages-routing.module';
import { FormsModule } from "@angular/forms";
import { ComponentsModule } from '../components/components.module';

import { AccountSettingComponent } from './account-setting/account-setting.component';
import { NopagefoundComponent } from '../shared/nopagefound/nopagefound.component';
import { Promesas1Component } from './promesas1/promesas1.component';
import { RxjsComponent } from './rxjs/rxjs.component';
// ng2-charts
import { ChartsModule } from "ng2-charts";
// Pipe Module
import { PipesModule } from '../pipes/pipes.module';
import { ProfileComponent } from './profile/profile.component';
import { CommonModule } from '@angular/common';
import { SubirArchivoService } from '../services/service.index';
import { UsuariosComponent } from './usuarios/usuarios.component';
// temporal

@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,      
    NopagefoundComponent,
    PagesComponent,
    AccountSettingComponent,
    Promesas1Component,
    RxjsComponent,
    ProfileComponent,
    UsuariosComponent
  ],
  imports: [  
    SharedModule,
    PagesRoutingModule,
    FormsModule,
    ComponentsModule,
    ChartsModule,
    PipesModule,
    CommonModule 
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    PagesComponent,
    Promesas1Component
  ],
  providers: [ 
    SubirArchivoService   
  ]

})
export class PagesModule { }
