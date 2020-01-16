import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/service.index';
import { Usuario } from 'src/app/models/usuario.model';
import { URL_SERVICIOS } from 'src/app/config/config';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
//import swal from 'sweetalert';
declare var swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean;
  constructor(public _usuarioServices: UsuarioService,
    public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarUsuarios();
    this._modalUploadService.notificacion.subscribe(
      resp => {
        this.cargarUsuarios();
      }
    )
  }

  cargarUsuarios(){
    this.cargando = true;
    this._usuarioServices.cargarUsuarios(this.desde).subscribe(
      (resp:any) => {
        this.totalRegistros = resp.total;
        this.usuarios = resp.usuarios;
        this.cargando = false;
      }
    )
  }

  cambiarDesde( valor: number ){
    let desde = this.desde +  valor;
    if( desde >= this.totalRegistros ){
      return;

    }
    if( desde < 0 ){
      return;
    }

    this.desde += valor;
    this.cargarUsuarios() ;
  }

  buscarUsuario( termino: string){
    console.log(termino)
     if( termino.length <= 0 ){
       this.cargarUsuarios();
       return;
     }
     this.cargando = true;
    this._usuarioServices.buscarUsuarios(termino).subscribe(
      (usuarios: Usuario[]) => {
        this.usuarios = usuarios;
        this.cargando = false;
      }
    )
  }

  borrarUsuario( usuario: Usuario){
    console.log(usuario);
    if( usuario._id === this._usuarioServices.usuario._id){
      swal('No puede borrar usuario','No se puede borrar a si mismo','success');
      return;
    }

    swal({
        title: "Borrar usuario",
        text: "Está seguro de borrar a "+ usuario.nombre,
        icon:"warning",
        buttons: true,
        dangerMode: true })
      .then(  borrar => {
          if( borrar ){
           // swal('Borrado','El usuario ha sido borrado','success');
            this._usuarioServices.borrarUsuario( usuario._id ).subscribe(
              (resp:any) => { 
                console.log('usuario component:')
                console.log(resp);
                this.cargarUsuarios();
              }
            )
            // podriamos poner un mensaje "Borrado correctamente"
            //validar si el usuario es el ultimo 
            //validar que al eliminar hayan paginas existentes
          }
        } 
      )
  }
  
  guardarUsuario(usuario: Usuario){
    this._usuarioServices.actualizarUsuario( usuario ).subscribe(

    );
  }
  mostrarModal( usuario: Usuario){
    this._modalUploadService.mostrarModal('usuarios', usuario._id)
  }

}
