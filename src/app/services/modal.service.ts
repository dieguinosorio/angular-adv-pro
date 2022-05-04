import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuarios/usuarios.model';
import { BehaviorSubject } from 'rxjs';
const base_url = environment.base_url
const imgUpload = {
  update:null,
  id:'',
  img:'',
  msg:''
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  public _modalShow:boolean = false;
  public user!:Usuario
  public tipo:string;
  public id:string;
  public img:string;

  constructor() { }

  imgUpload$:EventEmitter<object> = new EventEmitter();

  showModal(tipo:'usuarios'| 'medicos' | 'hospitales',obj:any,img:string=''){
    if(obj instanceof Usuario){
      this.user = obj
    }
    this.id = obj.id
    this._modalShow = true
    if(img.includes('http')){
      this.img = img;
    }
    else{
      this.img = `${base_url}/uploads/${tipo}/${img || 'no-img' }`
    }
  }

  hideModal(){
    this.user = new Usuario('','','')
    this._modalShow = false
  }

  get getShowModal(){
    return this._modalShow
  }

}
