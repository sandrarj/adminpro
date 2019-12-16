import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

interface Ajustes {
  temaUrl :string ;
  tema:string ;
}


@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  ajustes : Ajustes = {
    temaUrl : 'assets/css/colors/default-dark.css',
    tema: 'default'
  }
  constructor(@Inject(DOCUMENT) private _document) {
    this.cargarAjustes();
   }
  
  guardarAjustes(){    
      localStorage.setItem('ajustes', JSON.stringify(this.ajustes));    
  }
  
  cargarAjustes(){

    if( localStorage.getItem('ajustes')){
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));  
      
    } else {
      console.log('uando valores por defecto')
    }
     
    this.aplicarTema(this.ajustes.tema);
    
  }

  aplicarTema( tema: string){
    this.ajustes.temaUrl = `assets/css/colors/${tema}.css`;
    this.ajustes.tema = tema;
    this._document.getElementById('theme').setAttribute('href',this.ajustes.temaUrl);

    this.guardarAjustes();
  }

  


}


