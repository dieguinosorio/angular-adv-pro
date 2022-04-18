import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuarios/usuarios.model';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

  public menuItems:any[];
  public infoUser:any
  constructor(private sidebarService:SidebarService,private usuariosService:UsuariosService) {
    this.menuItems = sidebarService.menu
    this.infoUser = this.usuariosService.getInfoUser
  }

  logout(){
    this.usuariosService.logout()
  }

}
