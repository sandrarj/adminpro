import { Component, OnInit,OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import {  map, filter, retry } from "rxjs/operators";

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit {
  subscription: Subscription;
  constructor() { 
    //let obs = this.regresaObservable();
    // obs.pipe(  
    //   retry() 
    // )
    // obs.subscribe(
    //   numero => console.log('subscribe',numero),        
    //   error => console.log('error en el obs', error),
    //   () => console.log('el obs terminó')      
    // );

    this.subscription = this.regresaObservable()
    .subscribe(
         numero => console.log('subscribe',numero),        
         error => console.log('error en el obs', error),
         () => console.log('el obs terminó')      
    );
  }

  ngOnInit() {
  }  

  ngOnDestroy(){
    console.log('cerrar pagina');
    this.subscription.unsubscribe();
  }

  regresaObservable(): Observable<number>{
     //definicion del observable
     return new Observable(
      observer => {
          let contador = 0;
          let interval = setInterval(
            () => {
              contador+= 1;
              const salida = {
                valor : contador
              }
              observer.next( salida );
              // controlar el observable , detenerlo
              if( contador === 3){
                clearInterval( interval );    
                observer.complete();
              }
              // if( contador === 2){
              //   //clearInterval( interval ); 
              //   observer.error('auxilio!');
              // }
          }, 1000 );          
      }
    )
    .pipe( 
      retry(2),
      map( (resp:any) => resp.valor),
      filter( (valor, index) => {        
        console.log('filter', valor, index); 
        if( (valor %  2) === 1)
        { return true }
        else { return false }
      } )
    )
  }

}
