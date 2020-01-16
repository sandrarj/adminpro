import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';
import  swal  from "sweetalert";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  usuario: Usuario;
  imagensubir: File;
  imagenTemp: string;

  constructor(public _usuarioService: UsuarioService) {
    this.usuario = this._usuarioService.usuario;
    //console.log(this.usuario);
   }

  ngOnInit() {}

  guardar( usuario: Usuario){
    this.usuario.nombre = usuario.nombre;
    if( !this.usuario.google){
      this.usuario.email = usuario.email;
    }
    this._usuarioService.actualizarUsuario( this.usuario ).subscribe( )  
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

  cambiarImagen() {
    this._usuarioService.cambiarImagen( this.imagensubir, this.usuario._id );
  }

}
