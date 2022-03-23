import { Component, OnDestroy  } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
export interface dataRoter {
  title:string
}
@Component({
  selector: 'app-bredcrumbs',
  templateUrl: './bredcrumbs.component.html',
  styles: [
  ]
})
export class BredcrumbsComponent implements OnDestroy{

  ngOnDestroy(): void {
    this.subcribe.unsubscribe();
  }

  public titulo:string = ''
  public subcribe:Subscription
  constructor(private router:Router) {
    this.subcribe = this.getBreadcrum().subscribe(({title})=>{
      this.titulo = title
      document.title = `AdminPro-${title}`
    })
  }

  getBreadcrum(){
    return this.router.events.pipe(
      filter((event):event is ActivationEnd => event instanceof ActivationEnd ),
      filter((event:ActivationEnd)=>!event.snapshot.firstChild),
      map(event=> event.snapshot.data)
    )
  }

}
