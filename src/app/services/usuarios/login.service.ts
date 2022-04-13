import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../../interfaces/login-form.interface'
const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http:HttpClient) {
  }

  login(loginForm:LoginForm){
    return this.http.post(`${base_url}/login`,loginForm).pipe(
      tap((resp:any)=>{
        const { token } = resp
        localStorage.setItem('token',token)
      }
    ))
  }

  loginGoogle(token:any){
    return this.http.post(`${base_url}/login/google`,{token}).pipe(
      tap((resp:any)=>{
        const { token } = resp
        localStorage.setItem('token',token)
      }
    ))
  }
}
