import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu: any = [
    { 
      title: 'principal' , 
      icon:'mdi mdi-gauge', 
      submenu: [ 
        { 
          titulo:'Dashboard',
          url:'/dashboard'
        },
        { 
          titulo:'Progress',
          url:'/progress'
        },
        { 
          titulo:'Graficas',
          url:'/graficas1'
        },
        { 
          titulo:'Graficas',
          url:'/graficas1'
        }
      ]
    }
  ];

  constructor() { }
}
