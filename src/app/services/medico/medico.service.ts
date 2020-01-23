import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map, retry } from 'rxjs/operators';
import  swal  from "sweetalert";
import { UsuarioService } from '../usuario/usuario.service';
import { Medico } from 'src/app/models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  totalMedicos: number = 0;
  token: string;


  constructor( public http: HttpClient, public _usuarioServices: UsuarioService) { 
    this.token = this._usuarioServices.token;
  }


  cargarMedicos(desde: number = 0 ){
    let url = URL_SERVICIOS + '/medico?desde='+ desde;
    return this.http.get(url);
  }

  crearMedico( nombre: string,  hospital: string){    
    let url = URL_SERVICIOS + '/medico';
    url += '?token=' + this.token;
    let medico = {
      nombre: nombre,
      usuario: this._usuarioServices.usuario._id,
      hospital: hospital
    }
    return this.http.post(url, medico).pipe( 
      map( (resp:any) => {
        console.log(resp)
        swal("Success","Medico creado con exito","success");        
        return resp.medico;
      })
    )
  } 

  guardarmedico(medico: Medico){
    let url = URL_SERVICIOS + '/medico/'+ medico._id;
    return this.http.put(url, medico);
  }

  borrarMedico( id: string){
    let url = URL_SERVICIOS + '/medico/'+ id;
    url += '?token=' + this.token;
    return this.http.delete(url);
  }

  
  buscarMedico( termino: string){
    let url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;
    return this.http.get( url ).pipe(
      map( (resp:any) => {
        return resp.medicos ;   } )
    ) 
  }

  obtenerMedico( id: string){
    let url = URL_SERVICIOS + '/medico/'+ id;
    return this.http.get(url).pipe(
      retry(2),
      map( (resp:any) => {          
          //console.log(resp.medico);
          return resp.medico;
      })
    )
  }

  guardarMedico( medico: Medico){
    let url = URL_SERVICIOS + '/medico';
    if( medico._id ){
      //actualizando
      url = url + '/'+ medico._id;
      url += '?token=' + this.token;
      return this.http.put( url, medico ).pipe(
        map(       
          (resp:any) => {
            swal('Medico actualizado',medico.nombre,"success");
            return resp.medico;
          }
        )
      )
    } else {   
      //creando   
      url += '?token=' + this.token;
      return this.http.post( url, medico ).pipe(
      map(       
        (resp:any) => {
          swal('Medico creado',medico.nombre,"success");
          return resp.medico;
        })
      )
    }
  }
}
