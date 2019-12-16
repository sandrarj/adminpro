import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { PagesRoutingModule } from './pages-routing.module';
import { FormsModule } from "@angular/forms";
import { ComponentsModule } from '../components/components.module';
import { ChartsModule } from "ng2-charts";
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { NopagefoundComponent } from '../shared/nopagefound/nopagefound.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,      
    NopagefoundComponent,
    PagesComponent,
    AccountSettingComponent
  ],
  imports: [  
    SharedModule,
    PagesRoutingModule,
    FormsModule,
    ComponentsModule,
    ChartsModule  
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    PagesComponent
  ],
  providers: [    
  ]

})
export class PagesModule { }
