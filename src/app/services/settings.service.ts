import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private linkTheme = document.querySelector('#theme');
  public themeSaved = localStorage.getItem('theme') || `./assets/css/colors/purple-dark.css`;
  constructor() {
    if(this.themeSaved){
      this.linkTheme?.setAttribute('href',this.themeSaved)
    }
    console.log(`Services settings`)
  }

  changeTheme(color:string,links:NodeListOf<Element>){
    const linkTheme = document.querySelector('#theme');
    const url = `./assets/css/colors/${color}.css`;
    linkTheme?.setAttribute('href',url)

    localStorage.setItem('theme',url)

    links.forEach(el=>{
      el.classList.remove('working')
      let btn = el.getAttribute('data-theme');
      let btnUrl = `./assets/css/colors/${btn}.css`
      if(btnUrl === url){
        el.classList.toggle('working')
      }
    })
  }

  checkCurrentTheme(links:NodeListOf<Element>){
    links?.forEach(el=>{
      el.classList.remove('working')
      let btn = el.getAttribute('data-theme');
      let btnUrl = `./assets/css/colors/${btn}.css`
      if(btnUrl === this.themeSaved){
        el.classList.toggle('working')
      }
    })
  }
}
