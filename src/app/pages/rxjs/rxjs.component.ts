import { Component, OnDestroy } from '@angular/core';
import { Observable,interval, Subscription } from 'rxjs';
import { retry,take,map,filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy{

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe()
  }

  public intervalSubs:Subscription;
  constructor() {
    // this.retornaObservable().pipe(
    //   retry(1)
    // ).subscribe(valor=> console.log(`Valor : ${valor}`),err=>console.warn(`Error : ${err}`),(()=>{ console.log('completo')}))
    this.intervalSubs = this.retornaIntervalo().subscribe(console.log)
  }

  retornaIntervalo():Observable<number>{
    return interval(500).pipe(
      take(10),
      map(valor=>{
        return valor+1
      }),
      filter(valor=>  (valor % 2) === 0 ),

    );
  }

  retornaObservable():Observable<number>{
    let i=-1;
    return new Observable<number>(observer=>{
      const intervalo = setInterval(()=>{
        i++;
        observer.next(i)
        if(i === 4){
          clearInterval(intervalo)
          observer.complete()
        }
        if(i === 2){
          i=0
          observer.error('i llego al valor de 2')
        }
      },1000)
    });
  }


}
