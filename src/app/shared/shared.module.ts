import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumsComponent } from './breadcrums/breadcrums.component';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    BreadcrumsComponent
  ],
  imports: [
    CommonModule,    
    //AppRoutingModule
    RouterModule,
    PipesModule
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    BreadcrumsComponent
  ]
})
export class SharedModule { }
