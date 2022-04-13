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

}
