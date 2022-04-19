import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import swal2 from 'sweetalert2'
import { Usuario } from '../../models/usuarios/usuarios.model';
import { UploadService } from '../../services/uploads/upload.service';
const clearInputFile = () =>{
  const inputFile = document.getElementById('pwd2');
  if (inputFile instanceof HTMLInputElement) {
    inputFile.value = ''
  }
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})

export class ProfileComponent {
  public usuario:Usuario = this.usuarioService.usuario
  public imgUpload:File
  public imgPrev:any
  constructor(private usuarioService:UsuariosService,private fb:FormBuilder,private uploadService:UploadService) {}

  public updateForm =  this.fb.group({
    nombre:[this.usuario.nombre,[Validators.required,Validators.minLength(3)]],
    email:[this.usuario.email,[Validators.required,Validators.email]],
  })

  updateUser(){
    if(!this.updateForm.valid) return
    const objUsuario = this.updateForm.value
    objUsuario.role = 'USER_ROLE'
    this.usuarioService.updateUser(objUsuario).subscribe((res:any)=>{
      const { email,nombre } =  res.usuario
      this.usuario.nombre = nombre;
      this.usuario.email = email;
      if(this.imgUpload){
        this.updateImgProfile()
      }
      else{
        swal2.fire({
          icon:'success',
          title:`Los datos de usuario se actualizaron`,
          text:`Actualizado ${res.usuario.nombre}`,
          timer:3000
        })
      }
    },({error})=>{
      swal2.fire({
        icon:'error',
        title:`Ocurio un error`,
        text:`Error al actualizar los datos ${error.msg}`
      })
    })
  }

  get form(){
    return this.updateForm.controls
  }

  changeImg(event){
    const file = event.target.files[0]
    this.imgUpload = file

    if(!file) return
    const reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onloadend = () =>{
      this.imgPrev = reader.result
    }
  }

  onCancelUpdate(){
    swal2.fire({
      icon:'warning',
      title:`Estas seguro (a)`,
      text:'Deseas cancelar la actualización ?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((res:any)=>{
      if (!res.isConfirmed) {
        this.imgPrev = null;
        this.imgUpload = null;
        this.updateForm.get('nombre').setValue(this.usuario.nombre)
        this.updateForm.get('email').setValue(this.usuario.email)
        clearInputFile()
      }
    })
  }

  updateImgProfile(){
    this.uploadService.updateImg('usuarios',this.usuario.id,this.imgUpload).then(res=>{
      const { imagen,ok,msg } = res
      if(ok){
        this.usuario.img = imagen
        this.imgUpload = null
        this.imgPrev = null
        clearInputFile()
        swal2.fire({
          icon:'success',
          title:`Los datos de usuario se actualizaron`,
          text:`Actualizado ${this.usuario.nombre}`,
          timer:3000
        })
      }
      else{
        swal2.fire({
          icon:'warning',
          title:`No se pudo actualizar la imagen`,
          text:`${msg}`,
          timer:3000
        })
        this.imgPrev = null;
        this.imgUpload = null;
        clearInputFile()
      }
    })
  }

}
