import { Hospital } from '../hospitals/hospitales.model';

export interface _UsuarioMedico{
  id:string,
  nombre:string,
  email:string,
  img:string
}


export class MedicosModel {
  constructor(
    public id:string,
    public nombre:string,
    public img:string,
    public usuario?:_UsuarioMedico,
    public hospital?:Hospital
  ){}
}
