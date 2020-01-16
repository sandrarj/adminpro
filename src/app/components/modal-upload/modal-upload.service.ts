import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {
  public tipo: string;
  public id: string;
  public oculto: string = 'oculto';
  public notificacion = new EventEmitter<any>();
  
  constructor() {
    console.log('servicio modalupload');
  }
  
  ocultarModal(){
    this.oculto='oculto';
  }
  mostrarModal( tipo: string,id){
    this.oculto = '';
    this.id = id;
    this.tipo= tipo;
  }

}
