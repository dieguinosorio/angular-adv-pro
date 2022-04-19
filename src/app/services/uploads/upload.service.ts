import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UsuariosService } from '../usuarios/usuarios.service';
const base_url = environment.base_url
@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private usuariosService:UsuariosService) { }

  async updateImg(tipo:'usuarios'| 'medicos' | 'hospitales',id:string,archivo:File){
    try{
      const url = `${base_url}/uploads/${tipo}/${id}`
      const formData = new FormData()
      formData.append('imagen',archivo)
      const resp =  await fetch(url,{
        method:'PUT',
        body:formData,
        headers:{
          'x-token':this.usuariosService.token
        }
      })
      const data = await resp.json();
      return data
    }
    catch(error){
      console.log(error)
      return await error
    }
  }
}
