import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas1.component.html',
  styles: []
})
export class Promesas1Component implements OnInit {

  constructor() {
    
    
    this.contarTres().then(
      mensaje => console.log('termino!', mensaje)
    ).catch(
      error => console.log('Error en la promesa', error)
    )
    
   }

  ngOnInit() {
  }
  
  contarTres(): Promise<boolean>{
    return new Promise(
      (resolve,reject) => {
        let contador = 0;
        let interval = setInterval( () => {
            console.log(contador);
            contador+=1;
            if(contador === 3){
             // resolve('Termino OK');
             // reject('e r r o r');
             resolve(true);
              clearInterval(interval);
            }
          }, 1000 );
      });
  }

}
