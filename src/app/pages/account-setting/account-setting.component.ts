import { Component, OnInit, Inject } from '@angular/core';
import { SettingsService } from 'src/app/services/service.index';

@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  styles: []
})
export class AccountSettingComponent implements OnInit {

  constructor(private _setting: SettingsService) { }

  ngOnInit() {
    this.colocarCheck();
  }

  cambiarColor( link:any, tema: string){
    this._setting.aplicarTema(tema);
    
    
    this.aplicarCheck(link);
  }
  
  aplicarCheck( link:any){
    //vanilla javascript
    let selectores = document.getElementsByClassName('selector');
    for (let ref =0 ; ref<selectores.length ; ref ++) {
      selectores[ref].classList.remove('working');
    }
    link.classList.add('working');
  }

  colocarCheck(){
    //vanilla javascript
    let selectores = document.getElementsByClassName('selector');
    let tema = this._setting.ajustes.tema;
    for (let ref =0 ; ref<selectores.length ; ref ++) {
      if( tema == selectores[ref].getAttribute('data-theme') ){
        selectores[ref].classList.add('working');
      }
      
    }
    //link.classList.add('working');


  }
  

}
