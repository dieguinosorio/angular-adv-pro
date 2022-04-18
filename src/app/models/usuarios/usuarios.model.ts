import { environment } from "src/environments/environment";

const base_url = environment.base_url

export class Usuario {
  constructor(
    public id:string,
    public nombre:string,
    public email:string,
    public password?:string,
    public google?:boolean,
    public img?:string,
    public role?:string,

  ){}

  //http://localhost:3005/api/uploads/usuarios/c8a085b1-572a-4aa4-9fc5-a4884881157a.jpg
  get getUrlImg(){
    if(this.img?.includes('https')) return this.img
    return `${base_url}/uploads/usuarios/${this.img}`
  }
}
