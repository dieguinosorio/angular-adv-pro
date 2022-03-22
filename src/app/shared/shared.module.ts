import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { BredcrumbsComponent } from './bredcrumbs/bredcrumbs.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';



@NgModule({
  declarations: [
    BredcrumbsComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent
  ],
  exports:[
    BredcrumbsComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent
  ],

  imports: [
    CommonModule,
    RouterModule,
  ]
})
export class SharedModule { }
