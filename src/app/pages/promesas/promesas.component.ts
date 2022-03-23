import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(){
  //   const promesa  = new Promise((resolve,reject)=>{
  //     if(false){
  //       resolve('Hola mundo')
  //     }
  //     else{
  //       reject('Algo anda mal')
  //     }

  //   })

  //   promesa.then((res)=>{
  //     console.log(res)
  //   }).catch(err=>{
  //     console.log('Error en la promesa '+err)
  //   })

  //   console.log('fin del init')
    this.getUsuarios().then(usuarios=>{
      console.log(usuarios)
    })
  }

  getUsuarios(){
    const promesa = new Promise((resolve)=>{
      fetch('https://reqres.in/api/users')
      .then(res=> res.json())
      .then(body=>resolve(body.data))
    })
    return promesa

  }

}
