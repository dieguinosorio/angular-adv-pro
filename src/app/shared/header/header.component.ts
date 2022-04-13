import { Component } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent{

  constructor(private usuariosService:UsuariosService) { }

  logout(){
    this.usuariosService.logout()
  }

}
