import { environment } from "src/environments/environment"

const base_url = environment.base_url
export interface _HospitalUSer{
  id:string,
  nombre:string,
  email:string,
  img:string
}

export class Hospital{
  constructor(
    public id:string,
    public nombre:string,
    public img?:string,
    public usuario?:_HospitalUSer,
  ){}

  get getUrlImg(){
    if(this.img?.includes('http')) return this.img
    return `${base_url}/uploads/hospitales/${this.img}`
  }
}
