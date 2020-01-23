import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsService, SharedService, SidebarService } from "./service.index";
import { UsuarioService } from './usuario/usuario.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginGuardGuard } from './guards/login-guard.guard';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SharedService,
    SidebarService,
    UsuarioService,
    LoginGuardGuard,
    ModalUploadService
  ]
  
})
export class ServicesModule { }
