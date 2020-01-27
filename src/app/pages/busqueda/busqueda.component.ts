import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Usuario } from 'src/app/models/usuario.model';
import { Hospital } from 'src/app/models/hospital.models';
import { Medico } from 'src/app/models/medico.model';
import { UsuarioService } from 'src/app/services/service.index';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {
  usuarios : Usuario[] = [];
  medicos: Medico[] = [];
  hospitales: Hospital[] = [];
  constructor(public activatedRoute : ActivatedRoute, public router: Router, 
    public http: HttpClient,
    public _usuarioServices: UsuarioService) {
    this.activatedRoute.params.subscribe(
      params => { 
        let termino = params['termino'];
        this.buscar(termino);
        //this.router.navigate(['/'+termino]);  
      }
    )
   }

  ngOnInit() {
  }

  buscar( termino: string ){
    let url = URL_SERVICIOS + '/busqueda/todo/'+ termino;
    this.http.get( url ).subscribe(
      (resp:any) => {
        this.usuarios = resp.usuarios;
        this.hospitales = resp.hospitales;
        this.medicos = resp.medicos;
        console.log(this.usuarios)
        console.log(this.medicos)
        console.log(this.hospitales)
      }
    )
  }

  mostrarDetalle( entidad: string, usuario: Usuario ){
    console.log('mostrar detalle')
    switch (entidad) {
      case 'usuario':
        { 
          this.router.navigate['/usuarios'];
          // this._usuarioServices.buscarUsuarios(termino).subscribe(
          //   (usuarios: Usuario[]) => {
          //     this.usuarios = usuarios;
          //   }
          // )
        }
        break;
      case 'hospital':
        {}
        break;
      case 'medico':
        {}
        break;
      default:
        break;
    }
  }

}
