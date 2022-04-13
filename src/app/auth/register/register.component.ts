import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [
    './register.component.css'
  ]
})
export class RegisterComponent {

  public formSubmmited:boolean =false;
  public registerForm = this.fb.group({
    nombre:['Diego',[Validators.required,Validators.minLength(3)]],
    email:['dieguinosorio@gmail.com',[Validators.required,Validators.email]],
    password:['1234',[Validators.required]],
    password2:['1234',[Validators.required]],
    terminos:[false,[Validators.required]],
  })

  constructor(private fb:FormBuilder,private usuarioServices:UsuariosService,private router:Router) { }

  get f(){
    return this.registerForm.controls
  }

  get validPassword2(){
    const formValues = this.registerForm.value
    return formValues['password'] === formValues['password2']
  }

  get terms(){
    const formValues = this.registerForm.value
    return formValues['terminos']
  }

  createUser(){
    this.formSubmmited = true;
    if(!this.registerForm.valid || !this.terms){
      return
    }
    this.usuarioServices.createUser(this.registerForm.value).subscribe(res=>{
      this.router.navigateByUrl('/');
    },({error})=>{
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${error.msg}`,
        footer: ''
      })
    })
  }


}
