import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  constructor() { }
  public themeSaved = localStorage.getItem('theme');
  ngOnInit(): void {

    if(this.themeSaved){
      const linkTheme = document.querySelector('#theme');
      linkTheme?.setAttribute('href',this.themeSaved)
    }
    this.checkCurrentTheme();
  }

  checkCurrentTheme(){
    const links = document.querySelectorAll('.selector');
    links.forEach(el=>{
      el.classList.remove('working')
      let btn = el.getAttribute('data-theme');
      let btnUrl = `./assets/css/colors/${btn}.css`
      if(btnUrl === this.themeSaved){
        el.classList.toggle('working')
      }
    })
  }

}
