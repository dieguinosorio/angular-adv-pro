import { Component } from '@angular/core';
import { UsuariosService } from '../../../services/usuarios/usuarios.service' ;
import { Usuario } from '../../../models/usuarios/usuarios.model';
import { SearchService } from '../../../services/search.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
})
export class UsersComponent{
  public usuario!:Usuario;
  constructor(private usuariosService:UsuariosService,private serchService:SearchService) {
    this.getUsers();
    this.usuario = this.usuariosService.usuario
  }

  public totalUsers:number = 0;
  public usuarios:Usuario[] = [];
  public usuariosTemp:Usuario[] = [];
  public pageDesde:number = 0
  getUsers(){
    this.usuariosService.getUsers(this.pageDesde).subscribe(({total,usuarios})=>{
      this.usuarios = usuarios
      this.usuariosTemp = usuarios
      this.totalUsers = total
    })

  }

  getUsersFilter(filter:string){
    if(filter){
      this.usuarios = []
      this.serchService.search('usuarios',filter).subscribe((res:any)=>{
        this.usuarios = res
        this.totalUsers = res.length
      })
    }
    else{
      this.usuarios = this.usuariosTemp
    }
  }

  deleteUser(user:Usuario){
    swal.fire({
      title: `Estas seguro(a) de eliminar a ${user.nombre}`,
      icon: 'warning',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      showCloseButton: true
    }).then((result:any)=>{
      if(result.value){
        this.usuariosService.deleteUser(user.id).subscribe(res=>{
          swal.fire({ icon: 'success',title:`Usuario ${user.nombre} Eliminado`})
          this.getUsers();
        },({error})=>{
          const {msg} =  error.errors[0]
          swal.fire({ icon: 'error',title:`Error : ${msg}`})
        })
      }
    })
  }

  changePage(value:number){
    this.pageDesde += value;

    if(this.pageDesde<0){
      this.pageDesde =0;
    }
    else if(this.pageDesde > this.totalUsers){
      this.pageDesde -= value;
    }
    this.getUsers()
  }



}
