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
    return this.http.get<CargarHospitales>(`${base_url}/hospitales`)
  }
}
