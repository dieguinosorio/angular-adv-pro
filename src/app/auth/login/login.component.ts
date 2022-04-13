import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/usuarios/login.service';
import swal from 'sweetalert2'
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
declare const gapi:any

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  ngOnInit(): void {
    this.renderButton();
  }

  public auth2:any

  public loginForm = this.fb.group({
    email:[localStorage.getItem('email') || '',[Validators.required,Validators.email]],
    password:['',[Validators.required]],
    remember:[localStorage.getItem('email') ? true:false]
  })

  constructor(
    private router:Router,
    private fb:FormBuilder,
    private loginService:LoginService,
    private usuariosService:UsuariosService,
    private ngZone:NgZone
  ) { }

  login(){
    if(!this.loginForm.valid) return

    this.loginService.login(this.loginForm.value).subscribe((res:any)=>{
      const remember = this.loginForm.get('remember')?.value
      if(remember){
        localStorage.setItem('email',`${this.loginForm.get('email')?.value}`)
      }
      else{

        localStorage.removeItem('email')
      }

      this.router.navigateByUrl('/');
    },({error})=>{
      const {errors} = error
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${errors.map((e:any)=>e.msg)}`,
      })
    })
  }

  get f(){
    return this.loginForm.controls
  }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark'
    });
    this.startApp()
  }

  async startApp(){
    await this.usuariosService.googleInit()
    this.auth2 = this.usuariosService.auth2;
    this.attachSignin(document.getElementById('my-signin2'));
  }

  attachSignin(element:any) {
    this.auth2.attachClickHandler(element, {},
      (googleUser:any)=> {
        //console.log(googleUser.getBasicProfile().getName());
        const id_token = googleUser.getAuthResponse().id_token;
        this.loginService.loginGoogle(id_token).subscribe(res=>{
          this.ngZone.run(()=>{
            this.router.navigateByUrl('/');
          })
        });

      }, (error:any) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

}
