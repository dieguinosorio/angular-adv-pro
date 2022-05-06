import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { Usuario } from '../../models/usuarios/usuarios.model';
import { UploadService } from '../../services/uploads/upload.service';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styles: [
  ]
})
export class ModalImageComponent implements OnInit{


  constructor(public modalService:ModalService,private uploadService:UploadService) {}
  public tipo:string;
  public imgUpload:File
  public imgPrev:any

  ngOnInit(): void {
  }

  hideModal(){
    this.imgPrev = null
    this.modalService.hideModal()
  }

  changeImg(event){
    const file = event.target.files[0]
    this.imgUpload = file
    if(!file) return
    const reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onloadend = () =>{
      this.imgPrev = reader.result
    }
  }

  uploadImg(){
    const id = () =>{
      let id = null;
      switch(this.modalService.tipo){
        case 'usuarios':
          id = this.modalService.user.id
          break;

        case 'hospitales':
          console.log("Entro")
          id = this.modalService.hospital.id
          break;
      }
      return id
    }
    this.uploadService.updateImg(this.modalService.tipo as any,this.modalService.id,this.imgUpload).then(res=>{
      this.modalService.imgUpload$.emit({
        update:true,
        id:id(),
        img:res.imagen,
        msg:res.msg
      })
      this.hideModal()
    })
    .catch(error=>{
      this.modalService.imgUpload$.emit({
        update:false,
        img:null,
        msg:error.msg
      })
      this.hideModal();
    })
  }
}
