import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent implements OnInit {
  @Input('nombre') leyenda: string= "leyenda";
  @Input() progreso: number = 50;

  @Output() actualizaValor : EventEmitter<number> = new EventEmitter();

  @ViewChild('txtProgress') txtProgress: ElementRef; 
  
  constructor() { }

  ngOnInit() { }

  cambiarValor(valor:number){
    if(this.progreso >= 100 && valor > 0){
      this.progreso = 100;
      return;
    }
    if(this.progreso <= 0 && valor < 0){
      this.progreso = 0;
      return;
    }
    this.progreso = this.progreso + valor;
    this.actualizaValor.emit(this.progreso);
  }

  onChanges(value: number){
    //let elemenHTML:any = document.getElementsByName('progreso');
    
    if( value >= 100){
      this.progreso = 100;
    }else if( value <= 0) {
      this.progreso = 0;
    }else {
      this.progreso = value;
    }    
    this.txtProgress.nativeElement.value = this.progreso
    //elemenHTML.value = this.progreso;
    this.actualizaValor.emit( this.progreso);
    this.txtProgress.nativeElement.focus(true);
  }

}
