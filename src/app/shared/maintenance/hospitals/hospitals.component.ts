import { Component, OnInit, OnDestroy } from '@angular/core';
import { HospitalsService } from '../../../services/hospitals/hospitals.service';
import { Hospital } from 'src/app/models/hospitals/hospitales.model';
import { ModalService } from '../../../services/modal.service';
import { delay } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: [
  ],
})
export class HospitalsComponent implements OnInit,OnDestroy {
  public hospitals:Hospital[] = []
  public tempHospitals:Hospital[] = []
  public totalHosp!:number
  public load:boolean = false
  public idEdit!:string
  public $imgSubs:Subscription;
  constructor(private readonly hospitalsService:HospitalsService, private modalService:ModalService) { }

  ngOnDestroy(): void {
    this.$imgSubs.unsubscribe()
  }

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
    this.$imgSubs = this.hospitalsService.getHospitals().subscribe(({ok,hospitales})=>{
      this.hospitals = hospitales;
      this.tempHospitals = hospitales
      this.totalHosp =  hospitales.length
      this.load = false;
    })
  }

  updateHospitals(hospital:Hospital){
    this.hospitalsService.updateHospital(hospital).subscribe(res=>{
      swal.fire({
        icon:'success',
        text:`El hospital se actualizo : ${hospital.nombre}`
      })
      this.idEdit = null
    },(error)=>{
      swal.fire({
        icon:'error',
        text:`Ocurrio un error, intenta nuevamente.`
      })
      this.idEdit = null
    })
  }

  deleteHospital(hospital:Hospital){
    swal.fire({
      icon:'question',
      text:`Estas seguro(a) de eliminar ${hospital.nombre}`,
      showConfirmButton:true,
      showCancelButton:true,
      confirmButtonText:'Eliminar',
      cancelButtonText:'Cancelar'
    }).then(res=>{
      if(res.value){
        this.hospitalsService.deleteHospital(hospital.id).subscribe(res=>{
          swal.fire({
            icon:'success',
            text:`Hospital ${hospital.nombre} Eliminado`
          })
          this.getHospitals();
        },error=>{
          swal.fire({
            icon:'error',
            text:'Ocurrio un error'
          })
        })
      }
    })

  }

  async createHospital(){
    const {value} = await swal.fire({
      icon:'question',
      title:'Crear Hospital',
      input:'text',
      showCancelButton:true,
      cancelButtonText:'Cancelar',
      inputPlaceholder:'Ingrese el nombre'
    })
    if(value){
      this.hospitalsService.createHospital(value).subscribe((res:any)=>{
        const {hospital,msg} = res
        this.hospitals.push(hospital)
        swal.fire({
          icon:'success',
          text:msg
        })
      },(error)=>{
        console.log(error)
        swal.fire({
          icon:'error',
          text:'Ocurrio un error'
        })
      })
    }
    else{
      swal.fire({
        icon:'error',
        text:'Debes ingresar un nombre'
      })
    }
  }

  searchHospitals(filter:string){
    if(filter){
      this.hospitals = this.hospitals.filter(filt => filt.nombre.toLowerCase().includes(filter.toLowerCase()))
    }
    else{
      this.hospitals =  this.tempHospitals
    }
  }

  showModal(hospital:Hospital){
    this.modalService.showModal('hospitales',hospital,hospital.img,)
  }
}
