import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MedicosModel } from 'src/app/models/medicos/medicos.model';
import { map } from 'rxjs/operators';
import { ModalService } from '../modal.service';
const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(private readonly http:HttpClient) { }

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


  getDoctors(){
    return this.http.get(`${base_url}/medicos`,this.headers).pipe(
      map((res:{ok:boolean,medicos:MedicosModel[]}) => res)
    )
  }

  createDoctor(medico:MedicosModel){
    return this.http.post(`${base_url}/medicos`,{medico},this.headers)
  }

  updateDoctor(medico:MedicosModel){
    return this.http.put(`${base_url}/medicos/${medico.id}`,{nombre:medico.nombre},this.headers)
  }

  deleteDoctor(id:number){
    return this.http.put(`${base_url}/medicos/${id}`,this.headers)
  }
}
