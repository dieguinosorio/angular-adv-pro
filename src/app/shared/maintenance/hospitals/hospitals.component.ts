import { Component, OnInit } from '@angular/core';
import { HospitalsService } from '../../../services/hospitals/hospitals.service';
import { CargarHospitales } from '../../../interfaces/cargar-hospitales.interface';
import { Hospital } from 'src/app/models/hospitals/hospitales.model';
import { ModalService } from '../../../services/modal.service';
import { delay } from 'rxjs/operators';
import swal from 'sweetalert2';
@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: [
  ],
})
export class HospitalsComponent implements OnInit {
  public hospitals:Hospital[] = []
  public totalHosp!:number
  public load:boolean = false
  public idEdit!:string
  constructor(private readonly hospitalsService:HospitalsService, private modalService:ModalService) { }

  ngOnInit(): void {
    this.getHospitals();
    this.modalService.imgUpload$.pipe(delay(100)).subscribe((res:any)=>{
      const {id,img,msg,update} = res
      console.log({id,img,msg,update})
      if(update){
        this.hospitals.filter(filt => filt.id === id)[0].img = img
        swal.fire({
          icon:'success',
          text: msg
        })
      }
      else{
        swal.fire({
          icon:'error',
          text:'Ocurrio un error'
        })
      }
    })
  }

  getHospitals(){
    this.load =  true;
    this.hospitalsService.getHospitals().subscribe(({hospitales})=>{
      this.hospitals = hospitales;
      this.totalHosp =  hospitales.length
      this.load = false;
    })
  }

  showModal(hospital:Hospital){
    this.modalService.showModal('hospitales',hospital,hospital.img,)
  }

}
