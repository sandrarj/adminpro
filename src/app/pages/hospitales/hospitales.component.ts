import { Component, OnInit } from '@angular/core';
import { HospitalService } from 'src/app/services/hospital/hospital.service';
import { Hospital } from 'src/app/models/hospital.models';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
//import swal from 'sweetalert';
declare var swal: any;
@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css']
})
export class HospitalesComponent implements OnInit {  

  hospitales: Hospital[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean;

  constructor(public _hospitalService: HospitalService, public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarHospitales();
    this._modalUploadService.notificacion.subscribe(
      () => this.cargarHospitales()
    )
    /** 
     * this._modalUploadService.notificacion.subscribe(
      (hospital: any) => this.guardarHospital( hospital)
    )
     */
  }
  
  cargarHospitales(){
    this.cargando = true;
    this._hospitalService.cargarHospitales(this.desde).subscribe(
      (resp:any) => {
        this.totalRegistros = resp.total;
        this.hospitales = resp.hospitales;
        this.cargando = false;
      }
    )
  }

  buscarHospital( termino: string){
     if( termino.length <= 0 ){
       this.cargarHospitales();
       return;
     }
    this.cargando = true;
    this._hospitalService.buscarHospitales(termino).subscribe(
      (hospitales: any[]) => {
        this.hospitales = hospitales;
        this.cargando = false;
      }
    )
  }

  guardarHospital( hospital ){
    this._hospitalService.actualizarHospital( hospital ).subscribe();
  }
  
  borrarHospital( hospital: Hospital){
    swal({
      title: "Borrar hospital",
      text: "Está seguro de borrar a "+ hospital.nombre,
      icon:"warning",
      buttons: true,
      dangerMode: true })
    .then(  borrar => {
        if( borrar ){
         // swal('Borrado','El usuario ha sido borrado','success');
          this._hospitalService.borrarHospital( hospital._id ).subscribe(
            (resp:any) => { 
              this.cargarHospitales();
            }
          )
          // podriamos poner un mensaje "Borrado correctamente"
          //validar si el usuario es el ultimo 
          //validar que al eliminar hayan paginas existentes
        }
      } 
    )
  }

  crearHospital(){
    swal({
      title: 'Crear hospital',
      text: ' Ingrese el nombre del hospital',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true
    })
    .then( (name: string) => {
      
      if (!name || name.length === 0) return null;     
      
      this._hospitalService.crearHospital( name).subscribe(
        () => this.cargarHospitales()
      );

    })

   
  }

  obtenerHospital( hospital: Hospital){
    this._hospitalService.obtenerHospital( hospital._id);
  }

  actualizarImagen( hospital: Hospital ){
    this._modalUploadService.mostrarModal('hospitales', hospital._id)
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
    this.cargarHospitales() ;
  }
  
  



}
