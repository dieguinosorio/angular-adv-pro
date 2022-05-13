import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { CargarHospitales } from '../../interfaces/cargar-hospitales.interface';
import { map } from 'rxjs/operators';
import { Hospital } from '../../models/hospitals/hospitales.model';
const base_url = environment.base_url
@Injectable({
  providedIn: 'root'
})
export class HospitalsService {

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

  getHospitals(){
    return this.http.get(`${base_url}/hospitales`,this.headers).pipe(
      map((res:{ok:boolean,hospitales:Hospital[]})=> res)
    )
  }

  createHospital(nombre:string){
    return this.http.post(`${base_url}/hospitales`,{nombre},this.headers)
  }

  updateHospital(hospital:Hospital){
    const {id,nombre} =  hospital;
    return this.http.put(`${base_url}/hospitales/${id}`,{nombre}, this.headers)
  }

  deleteHospital(id:string){
    return this.http.delete(`${base_url}/hospitales/${id}`,this.headers)
  }

}
