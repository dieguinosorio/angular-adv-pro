import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {
  public elementList:NodeListOf<Element>
  constructor(private settingsService:SettingsService) {
    this.elementList = document.querySelectorAll('.selector')
  }

  ngOnInit() {
    this.elementList = document.querySelectorAll('.selector')
    this.settingsService.checkCurrentTheme(this.elementList);
  }

  changeTheme(color:string){
    this.settingsService.changeTheme(color,this.elementList)
  }

}
