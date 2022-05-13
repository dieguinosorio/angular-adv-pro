import { Component, OnInit, OnDestroy } from '@angular/core';
import { MedicoService } from '../../../services/medicos/medico.service';
import { MedicosModel } from '../../../models/medicos/medicos.model';
import { ModalService } from '../../../services/modal.service';
import { delay } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: [
  ]
})
export class DoctorsComponent implements OnInit,OnDestroy {

  constructor(private readonly medicoService:MedicoService,private readonly modalService:ModalService ) { }
  public medicos:MedicosModel[] = []
  public tempMedicos:MedicosModel[] = []
  public load:boolean = false
  public $imgSubs:Subscription;

  ngOnDestroy(): void {
    this.$imgSubs.unsubscribe()
  }

  ngOnInit(): void {
    this.getMedicos();
    this.$imgSubs =  this.modalService.imgUpload$.pipe(delay(100)).subscribe((imgUpdate:any)=>{
      if(imgUpdate?.update != null){
        if(imgUpdate.update){
          swal.fire({
            icon:'success',
            text:imgUpdate.msg
          })
          this.medicos.filter(medico =>{
            if(medico.id === imgUpdate.id) medico.img = imgUpdate.img
          })
        }
        else{
          swal.fire({
            icon:'error',
            text:'Ocurrio un error'
          })
        }
      }
    })
  }

  getMedicos(){
    this.load = true;
    this.medicoService.getDoctors().subscribe(({medicos})=>{
      this.medicos = medicos
      this.tempMedicos = medicos
      this.load = false;
    })
  }

  showModal(doctor:MedicosModel){
    this.modalService.showModal('medicos',doctor,doctor.img)
  }

  searchDoctors(filter:string){
    if(filter){
      this.medicos = this.medicos.filter(filt => filt.nombre.toLowerCase().includes(filter.toLowerCase()))
    }
    else{
      this.medicos =  this.tempMedicos
    }
  }

}
