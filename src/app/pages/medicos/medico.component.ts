import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/models/medico.model';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
import { MedicoService } from 'src/app/services/service.index';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.models';
import { HospitalService } from 'src/app/services/hospital/hospital.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {
  id: string;
  medico: Medico = new Medico('','','','');
  hospitales: Hospital[] = [];
  hospital: Hospital = new Hospital('');
  constructor( public route: ActivatedRoute ,public router: Router, 
    public _medicoService: MedicoService, public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService) { 
    this.route.params.subscribe(
      params => { 
        this.id = params['id'];
        if( this.id != 'nuevo'){
          this.cargarMedico(this.id);
        }
      }
    )
  }

  ngOnInit() {
      this._hospitalService.cargarHospitales().subscribe(
        (resp:any) => { this.hospitales = resp.hospitales; }
      );
      
      this._modalUploadService.notificacion.subscribe(
        resp => { this.medico.img = resp.medico.img}
      )
  }

  cambiarFoto( medico: Medico ){
    this._modalUploadService.mostrarModal('medicos', medico._id)
  }

  guardarMedico( f: NgForm ){
    if( f.invalid){ return }

    this._medicoService.guardarMedico( this.medico ).subscribe(
      medico => {
        this.medico._id = medico._id;
        this.router.navigate(['/medico',medico._id]);        
      }
    )
  }

  cambioHospital(id: string){
    this._hospitalService.obtenerHospital(id).subscribe(
      hospital => this.hospital = hospital
    )
  }

  cargarMedico(id: string){
    this._medicoService.obtenerMedico(id).subscribe(
      (medico:any) => { 
        this.medico = medico;
        this.medico.hospital = medico.hospital._id;
        this.cambioHospital( this.medico.hospital );
      }
    )
  }

}
