import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient } from "@angular/common/http";
import { URL_SERVICIOS } from 'src/app/config/config';
import { retry, map } from 'rxjs/operators';

import swal from 'sweetalert';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  usuario: Usuario;
  token: string;

  constructor( public http: HttpClient, 
    public router: Router,
    public  _subirArchivoService: SubirArchivoService) {
    console.log('usuario service listo');
    this.cargarStorage();
  }

  estaLogueado(){
    return ( this.token.length > 5 ) ? true : false;
  }

  cargarStorage(){
    if( localStorage.getItem('token') ){
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    }else{
      this.token = '';
      this.usuario = null;
    }
  }

  guardarstorage( id: string, token: string, usuario: Usuario){
    localStorage.setItem('id', id);
    localStorage.setItem('token',token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuario = usuario;
    this.token = token;
  }

  loginGoogle( token: string ){
    let url = URL_SERVICIOS + '/login/google';

    return this.http.post(url, { token }).pipe(
      map( (resp:any) => {
            this.guardarstorage(resp.id, resp.token, resp.usuario);
            return true;
      })
    );
  }
  
  login( usuario: Usuario, recordar: boolean = false){
    
    if( recordar ){
      localStorage.setItem('email', usuario.email)
    } else {
      localStorage.removeItem('email');
    }
    
    let url = URL_SERVICIOS + "/login";
    console.log(url)
    
    return this.http.post(url, usuario).pipe(
      map( (resp:any) => {
        this.guardarstorage(resp.id, resp.token, resp.usuario);
        return true;
      })
    );
  }

  logout(){
    this.usuario = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login'])
   // localStorage.clear();

  }
  
  crearUsuario( usuario: Usuario){
    let url = URL_SERVICIOS + '/usuario';
    return this.http.post(url, usuario).pipe( 
      retry(2), 
      map( (resp:any) => {
        swal("Success","usuario creado con exito","success");        
        return resp.usuario;
      })
    )
  }

  actualizar( usuario: Usuario){

    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url+= '?token=' + this.token;
    return this.http.put(url, usuario).pipe(
      map( (resp:any) => {
        this.usuario = resp.usuario;        
        this.guardarstorage(resp.usuario._id, this.token,resp.usuario)
        swal('Usuario actualizado', usuario.nombre,"success");
        return true;
      })
    );
  }

  cambiarImagen( archivo:File, id: string ){
    this._subirArchivoService.subirArchivo( archivo, 'usuarios', id)
    .then( (resp:any) =>{ 
      this.usuario.img =  resp.usuario.img;
      swal('Imagen Actualizada', this.usuario.nombre,'success');
      this.guardarstorage( id, this.token, this.usuario);
    })
    .catch(err => { console.log(err)})
  }
}
