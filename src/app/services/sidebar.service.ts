import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  public menu:any[] = [
    {
      title:'Dashboard',
      icon:'mdi mdi-gauge',
      submenu:[
        {
          title:'Main',
          icon:null,
          route:'/dashboard'
        },
        {
          title:'Graficas',
          icon:null,
          route:'/dashboard/grafica1'
        },
        {
          title:'Progresbar',
          icon:null,
          route:'/dashboard/progress'
        },
        {
          title:'Promesas',
          icon:null,
          route:'/dashboard/promesas'
        },
        {
          title:'Rxjs',
          icon:null,
          route:'/dashboard/rxjs'
        },
      ]
    },

  ]

  constructor() {

  }
}
