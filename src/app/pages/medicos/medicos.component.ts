import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/models/medico.model';
import { MedicoService } from 'src/app/services/service.index';
import { Router } from '@angular/router';
declare var swal: any;

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {
   cargando: boolean;
   totalRegistros: number = 0;
   medicos : Medico[] = [];
   desde: number = 0;


  constructor( public _medicoService: MedicoService) { }

  ngOnInit() {
    this.cargarMedicos();
  }
  
  cargarMedicos() {
    this._medicoService.cargarMedicos(this.desde)
          .subscribe( (resp:any) => {
            this.medicos = resp.medicos;
            this,this.totalRegistros = resp.total;
            this.cargando = false;
          } );
  }
  
  buscarMedico( termino: string){
    if( termino.length <= 0 ){
      this.cargarMedicos();
      return;
    }
   this.cargando = true;
   this._medicoService.buscarMedico(termino).subscribe(
     (medicos: any[]) => {
       this.medicos = medicos;
       this.cargando = false;
     }
   )
 }

  crearMedico(){
    swal({
      title: 'Crear Medico',
      text: ' Ingrese el nombre del medico',
      content: 'input',
      icon: 'info',
      button: true,
      dangerMode: true
    })
    .then( (name: string) => {      
      if (!name || name.length === 0) return null;
      this._medicoService.crearMedico(name,'5e21ae816435563c7c5f2bc1').subscribe(
        (resp:any) =>{ 
          this.cargarMedicos();
        }
      )
    })
  }


  borrarMedico(medico: Medico){
      swal({
        title: "Borrar medico",
        text: "Está seguro de borrar a "+ medico.nombre,
        icon:"warning",
        buttons: true,
        dangerMode: true  

      })
      .then(
        borrar => {
          if( borrar ){            
             this._medicoService.borrarMedico( medico._id ).subscribe(
               (resp:any) => { 
                 this.cargarMedicos();
               }
             )
          }
        }
      )    
  }

  buscarMedicos( termino: string){
    if( termino.length <= 0 ){
      this.cargarMedicos();
      return;
    }
   this.cargando = true;
   this._medicoService.buscarMedico(termino).subscribe(
     (medicos: any[]) => {
       this.medicos = medicos;
       this.cargando = false;
     }
   )
 }

  cambiarDesde( valor: number){
    let desde = this.desde +  valor;
    if( desde >= this.totalRegistros ){
      return;

    }
    if( desde < 0 ){
      return;
    }

    this.desde += valor;
    this.cargarMedicos() ;
  }

}
