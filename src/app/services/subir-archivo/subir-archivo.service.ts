import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor() { 

  }
  //subir cualquier archivo
  //tipo: medico, usuario, hospital
  subirArchivo( archivo:File, tipo:string, id:string ){
    return new Promise( (resolve, reject) => {
      let formData = new FormData();
      let xhr = new XMLHttpRequest();

      formData.append('imagen', archivo,  archivo.name );
      //peticion ajax, recibo información a cada cambio
      xhr.onreadystatechange = function(){
        if( xhr.readyState === 4){
          if( xhr.status === 200 ){
            console.log('Imagen subida');
            resolve( JSON.parse(xhr.response) );
          } else {
            console.log('fallo al subir archivo');
            reject( xhr.response );
          }
        }
      }

      // donde enviamos la peticion
      let url = URL_SERVICIOS + '/upload/' + tipo + '/' + id;
      xhr.open('PUT', url, true );
      //s aqui se pueden enviar token o header segun querramos la peticion
      xhr.send( formData );
    });

  }
  
}
