import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap, filter } from 'rxjs/operators';
import { CargarUsuarios } from 'src/app/interfaces/cargar-usuarios.interface';
import { RegisterForm } from '../../interfaces/register-form.interface'
import { Usuario } from 'src/app/models/usuarios/usuarios.model';
import { environment } from 'src/environments/environment';
import { SearchService } from '../search.service';

const base_url = environment.base_url
declare const gapi:any

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(
    private http:HttpClient,
    private router:Router,
    private ngZone:NgZone,
    private searchService:SearchService
    ) {
    this.googleInit();
  }

  public auth2:any
  public usuario!:Usuario

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
    return this.http.get(`${base_url}/login/renew`,this.headers).pipe(
      map((resp:any)=>{
          const { token } = resp
          const { email, google, id,img='not-aviable',nombre,role } =  resp.usuario
          this.usuario = new Usuario(id,nombre,email,'',google,img,role,)
          localStorage.setItem('token',token)
          return true;
        }
      ),
      catchError(error => of(false))
    )
  }

  createUser(formData:RegisterForm){
    return this.http.post(`${base_url}/usuarios`,formData,this.headers).pipe(
      tap((resp:any)=>{
        const { token } = resp
        localStorage.setItem('token',token)
      }
    ))
  }

  get token():string {
    return localStorage.getItem('token') || ''
  }

  get id():string{
    return this.usuario.id
  }

  get headers():Object{
    return {
      headers:{
        'x-token':this.token
      }
    }
  }

  updateUser(usuario:Usuario){
    return this.http.put(`${base_url}/usuarios/${this.id}`,usuario,this.headers)
  }

  getUsers(desde:number=0){
    const url = `${base_url}/usuarios?desde=${desde}`
    return this.http.get<CargarUsuarios>(url , this.headers).pipe(
      map((res)=>{
        const usuarios = res.usuarios.map((user:Usuario)=>{
          const {id,nombre,email,google,img,role} = user
          return new Usuario(id,nombre,email,'',google,img,role)
        })
        return {
          total:res.total,
          usuarios
        }
      })
    )
  }

  deleteUser(id:string){
    const url = `${base_url}/usuarios/${id}`
    return this.http.delete(url,this.headers)
  }
}
