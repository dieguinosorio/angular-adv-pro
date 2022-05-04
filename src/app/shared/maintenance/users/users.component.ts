import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../../services/usuarios/usuarios.service' ;
import { Usuario } from '../../../models/usuarios/usuarios.model';
import { SearchService } from '../../../services/search.service';
import swal from 'sweetalert2';
import { ModalService } from '../../../services/modal.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit{
  public usuario!:Usuario;
  constructor(private usuariosService:UsuariosService,private serchService:SearchService,public modalService:ModalService) {
    this.getUsers();
    this.usuario = this.usuariosService.usuario
  }

  ngOnInit(): void {
    this.modalService.imgUpload$.pipe(delay(100)).subscribe((imgUpdate:any)=>{
      if(imgUpdate?.update != null){
        if(imgUpdate.update){
          swal.fire({
            icon:'success',
            text:imgUpdate.msg
          })
          this.usuarios.filter(user =>{
            if(user.id === imgUpdate.id) user.img = imgUpdate.img
          })
        }
        else{
          swal.fire({
            icon:'error',
            text:'Ocurrio un error'
          })
        }
      }
    })
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

  changeRole(user:Usuario){
    this.usuariosService.updateUser(user).subscribe((res:any)=>{
      const { email,nombre,role } =  res.usuario
    },({error})=>{
      swal.fire({
        icon:'error',
        title:`Ocurio un error`,
        text:`Error al actualizar los datos ${error.msg}`
      })
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

  showModal(user:Usuario){
    this.modalService.tipo = 'usuarios'
    this.modalService.showModal('usuarios',user,user.img)
  }



}
