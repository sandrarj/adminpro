import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { NopagefoundComponent } from '../shared/nopagefound/nopagefound.component';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { Promesas1Component } from "./promesas1/promesas1.component";
import { RxjsComponent } from "./rxjs/rxjs.component";
import { LoginGuardGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
const pagesRoutes: Routes = [
   {
     path: '',   
     component: PagesComponent,
     canActivate: [LoginGuardGuard],
     children: [
       {path: 'dashboard', component: DashboardComponent, data: {titulo: 'Dashboard' } },
       {path: 'progress', component: ProgressComponent, data: {titulo: 'Progress' }},
       {path: 'graficas1', component: Graficas1Component, data: {titulo: 'Gráficas' }},  
       {path: 'promesas', component: Promesas1Component, data: {titulo: 'Promesas' }},
       {path: 'rxjs', component: RxjsComponent, data: {titulo: 'Rxjs' }},    
       {path: 'account-settings', component: AccountSettingComponent, data: {titulo: 'Ajustes de Tema' }},
       {path: 'perfil', component: ProfileComponent, data: {titulo: 'Perfil' }},    
       //mantenimiento
       {path: 'usuarios', component: UsuariosComponent, data: {titulo: 'Mantenimiento de usuarios' }},    
       {path: 'hospitales', component: HospitalesComponent, data: {titulo: 'Mantenimiento de hospitales' }},    
       {path: 'medicos', component: MedicosComponent, data: {titulo: 'Mantenimiento de médicos' }},    
       {path: 'medico/:id', component: MedicoComponent, data: {titulo: 'Actualizar médico' }},    
       {path: '', redirectTo: 'dashboard', pathMatch:'full'},       
       {path: '**', component: NopagefoundComponent }
     ]
   }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(pagesRoutes)
  ],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
