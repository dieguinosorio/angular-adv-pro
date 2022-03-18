import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  changeTheme(color:string){
    const linkTheme = document.querySelector('#theme');
    const url = `./assets/css/colors/${color}.css`;
    linkTheme?.setAttribute('href',url)

    localStorage.setItem('theme',url)

    document.querySelectorAll('.selector').forEach(el=>{
      el.classList.remove('working')
      let btn = el.getAttribute('data-theme');
      let btnUrl = `./assets/css/colors/${btn}.css`
      if(btnUrl === url){
        el.classList.toggle('working')
      }
    })
  }

}
