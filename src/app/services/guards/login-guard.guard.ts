import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor(public _usuarioService: UsuarioService, public router: Router){ }


  canActivate(){
    //next: ActivatedRouteSnapshot,
    //state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if( this._usuarioService.estaLogueado() ){
        return true;
      }else{
        this.router.navigate(['/login']);
        return false;
      }
  }
}
