import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import swal2 from 'sweetalert2'
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent {

  constructor(private usuarioService:UsuariosService,private fb:FormBuilder) {}

  public usuario:any = this.usuarioService.getInfoUser
  public updateForm =  this.fb.group({
    nombre:[this.usuario.nombre,[Validators.required,Validators.minLength(3)]],
    email:[this.usuario.email,[Validators.required,Validators.email]],
    img:['']
  })

  updateUser(){
    const objUsuario = {...this.updateForm.value,...{id:this.usuario.id}}
    const {img ,...objUser} = objUsuario
    this.usuarioService.updateUser(objUser).subscribe((res:any)=>{
      swal2.fire({
        icon:'success',
        title:`Los datos de usuario se actualizaron`,
        text:`Actualizado ${res.usuario.nombre}`
      })
    },(error)=>{
      console.log(error)
      swal2.fire({
        icon:'error',
        title:`Ocurio un error`,
        text:`Error al actualizar los datos`
      })
    })
  }

}
