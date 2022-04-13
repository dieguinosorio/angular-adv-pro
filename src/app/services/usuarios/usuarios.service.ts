import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { RegisterForm } from '../../interfaces/register-form.interface'
const base_url = environment.base_url
declare const gapi:any

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http:HttpClient,private router:Router,private ngZone:NgZone) {
    this.googleInit();
  }

  public auth2:any

  googleInit(){
    return new Promise((resolve)=>{
      console.log('google init')
      gapi.load('auth2', ()=>{
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '306708579936-c0d26814o34hjle60da51gsufpuovjfo.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          // Request scopes in addition to 'profile' and 'email'
          //scope: 'additional_scope'
        });
        resolve(true);
      });

    })
  }

  logout(){
    localStorage.removeItem('token')
    this.auth2.signOut().then(()=>{
      this.ngZone.run(()=>{
        this.router.navigateByUrl('/login')
      })
    });

  }

  validarToken():Observable<boolean>{
    const token  = localStorage.getItem('token') || ''
    return this.http.get(`${base_url}/login/renew`,{
      headers:{
        'x-token':token
      }
    }).pipe(
      tap((resp:any)=>{
        const { token } = resp
        localStorage.setItem('token',token)
        }
      ),
      map(resp=> true),
      catchError(error => of(false))
    )
  }

  createUser(formData:RegisterForm){
    return this.http.post(`${base_url}/usuarios`,formData).pipe(
      tap((resp:any)=>{
        const { token } = resp
        localStorage.setItem('token',token)
      }
    ))
  }
}