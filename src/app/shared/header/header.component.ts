import { Component } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent{
  public infoUser:any
  constructor(private usuariosService:UsuariosService) {
    this.infoUser = this.usuariosService.getInfoUser
  }

  logout(){
    this.usuariosService.logout()
  }

}
