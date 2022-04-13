import { Component, OnInit } from '@angular/core';
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
  constructor(private sidebarService:SidebarService,private usuariosService:UsuariosService) {
    this.menuItems = sidebarService.menu
  }

  logout(){
    this.usuariosService.logout()
  }

}
