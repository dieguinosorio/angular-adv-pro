import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { BredcrumbsComponent } from './bredcrumbs/bredcrumbs.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { UsersComponent } from './maintenance/users/users.component';
import { HospitalsComponent } from './maintenance/hospitals/hospitals.component';
import { DoctorsComponent } from './maintenance/doctors/doctors.component';

@NgModule({
  declarations: [
    BredcrumbsComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    UsersComponent,
    HospitalsComponent,
    DoctorsComponent,
  ],
  exports:[
    BredcrumbsComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    UsersComponent,
    HospitalsComponent
  ],

  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ]
})
export class SharedModule { }
