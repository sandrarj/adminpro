import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu: any[] = []
  // public menu: any = [
  //   { 
  //     titulo: 'principal' , 
  //     icono:'mdi mdi-gauge', 
  //     submenu: [ 
  //       { 
  //         titulo:'Dashboard',
  //         url:'/dashboard'
  //       },
  //       { 
  //         titulo:'Progress',
  //         url:'/progress'
  //       },
  //       { 
  //         titulo:'Graficas',
  //         url:'/graficas1'
  //       },
  //       { 
  //         titulo:'Promesas',
  //         url:'/promesas'
  //       },
  //       { 
  //         titulo:'rxjs',
  //         url:'/rxjs'
  //       }       
  //     ]
  //   },
  //   { 
  //     titulo:'Mantenimiento',
  //     icono:'mdi mdi-folder-lock-open',
  //     submenu: [
  //       {titulo: 'Usuarios', url:'/usuarios'},
  //       {titulo: 'Hospitales', url:'/hospitales'},
  //       {titulo: 'Médicos', url:'/medicos'}
  //     ]
  //   }
  // ];

  constructor( public _usuarioService: UsuarioService) { 
    //this.menu = this._usuarioService.menu; 
  }

  cargarMenu(){
    this.menu = this._usuarioService.menu; 
  }
}
