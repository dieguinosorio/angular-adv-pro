import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuarios/usuarios.model';
const base_url = environment.base_url
@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http:HttpClient,) { }

  get token():string {
    return localStorage.getItem('token') || ''
  }

  get headers():Object{
    return {
      headers:{
        'x-token':this.token
      }
    }
  }

  private trasnformUsuarios(arrUsers:any[]):Usuario[]{
    const usuarios = arrUsers.map((user:any)=>{
      const {id,nombre,email,google,img,role} = user
      return new Usuario(id,nombre,email,'',google,img,role)
    })

    return usuarios
  }

  search(tipo:'usuarios'|'medicos'|'hospitales',filter){
    const url = `${base_url}/busqueda/collection/${tipo}/${filter}`
    return this.http.get(url ,this.headers).pipe(
      map((res:any)=>{

        switch (tipo) {
          case 'usuarios':
            return this.trasnformUsuarios(res.result)
            break;

          default:
            return []
            break;
        }
      })
    )
  }
}
