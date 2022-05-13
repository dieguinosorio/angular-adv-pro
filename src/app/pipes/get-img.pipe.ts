import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';
const base_url = environment.base_url
@Pipe({
  name: 'getImg'
})
export class GetImgPipe implements PipeTransform {

  transform(img:string,tipo:'usuarios'|'medicos'|'hospitales'): string {
    if(img && img.includes('http')) return img
    return `${base_url}/uploads/${tipo}/${img}`
  }

}
