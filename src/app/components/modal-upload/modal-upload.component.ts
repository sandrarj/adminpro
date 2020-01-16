import { Component, OnInit } from '@angular/core';
import  swal  from 'sweetalert';
import { SubirArchivoService } from 'src/app/services/service.index';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styleUrls: ['./modal-upload.component.css']
})
export class ModalUploadComponent implements OnInit { 
  imagensubir: File;
  imagenTemp: string;
  constructor( public _subirArchivoService: SubirArchivoService, public _modalService: ModalUploadService) {
    console.log('modallisto');

   }

  ngOnInit() {
  }

  seleccionImagen( archivo: File ){
    if( !archivo ){
      this.imagensubir = null;
      return;
    }

    if ( archivo.type.indexOf('image') < 0 ) {
      swal('Sólo imágenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagensubir = null;
      return;
    }

    this.imagensubir = archivo;
    console.log(this.imagensubir);

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL( archivo );

    reader.onloadend = () => this.imagenTemp = reader.result.toString();

  }

  subirImagen(){
    //console.log(  localStorage.getItem('id') );
   // this.oculto = 'oculto';
    this._subirArchivoService.subirArchivo( this.imagensubir, this._modalService.tipo, this._modalService.id)
    .then( resp => {
      console.log(resp)
        this._modalService.notificacion.emit( resp );
        //this._modalService.ocultarModal();
        this.cerrarModal();
    })
    .catch( err => console.log('error en la carga'))
  }

  cerrarModal(){
    this.imagenTemp = null;
    this.imagensubir = null;
    this._modalService.ocultarModal();
  }



}
