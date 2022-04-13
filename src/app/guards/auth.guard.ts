import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { tap } from 'rxjs/operators';
import { UsuariosService } from '../services/usuarios/usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private usuariosService:UsuariosService,private router:Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){

    return this.usuariosService.validarToken().pipe(
      tap(isAuth=>{
        if(!isAuth){
          this.router.navigateByUrl('/login')
        }
      })
    )
  }

}
