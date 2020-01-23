import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map, retry } from 'rxjs/operators';
import  swal  from "sweetalert";
import { UsuarioService } from '../usuario/usuario.service';
import { Hospital } from 'src/app/models/hospital.models';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  token: string;
  
  constructor(public http: HttpClient, 
    public _usuarioService: UsuarioService,
    public _subirArchivoService: SubirArchivoService) {
      this.token = this._usuarioService.token;
   }

  cargarHospitales(desde: number = 0 ){
    let url = URL_SERVICIOS + '/hospital?desde=' + desde;
  // let url = URL_SERVICIOS + '/hospital';
    return this.http.get(url);
  }

  crearHospital( nombre: string){    
    let url = URL_SERVICIOS + '/hospital';
    url += '?token=' + this.token;
    return this.http.post(url,{ nombre: nombre }).pipe( 
      map( (resp:any) => {
        swal("Success","usuario creado con exito","success");        
        return resp.hospital;
      })
    )
  }


  buscarHospitales( termino: string){
    let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
    return this.http.get( url ).pipe(
      map( (resp:any) => {
        return resp.hospitales ;   } )
    ) 
  }

  borrarHospital( id: string ){
    let url = URL_SERVICIOS + '/hospital/'+ id;
    url += '?token=' + this.token;
    //controlar el error si el token ya expiró
    return this.http.delete( url ).pipe(
      map( (resp:any) => {
        swal('Hospital borrado', 'El hospital ' +resp.hospitalBorrado.nombre +' ha sido eliminado correctamente','success');
        return true;
      } )
    )
  }

  obtenerHospital( id: string){
    let url = URL_SERVICIOS + '/hospital/'+ id;
    return this.http.get(url).pipe(
      retry(2),
      map( (resp:any) => {
          return resp.hospital;
      })
    )
  }

  actualizarHospital( hospital: Hospital){
    let url = URL_SERVICIOS + '/hospital/'+ hospital._id;
    //url += '?token=' + this.token;
    return this.http.put(url, hospital).pipe(
      map( (resp:any) => {
          swal('Hospital actualizado', hospital.nombre, 'success');
          return true;
      })
    )
  }


  cambiarImagen( hospital: Hospital, archivo:File, id: string ){
    this._subirArchivoService.subirArchivo( archivo, 'hospitales', id)
    .then( (resp:any) =>{ 
      hospital.img =  resp.usuario.img;
      swal('Imagen Actualizada', hospital.nombre,'success');      
    })
    .catch(err => { console.log(err)})
  }

}
