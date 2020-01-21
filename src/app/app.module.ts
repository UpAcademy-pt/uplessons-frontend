import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './admin/admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { NgxSelectModule } from 'ngx-select-ex';
import { AcademiesComponent } from './gestao-aulas/academies/academies.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,
    HeaderComponent,
    FooterComponent,
    AdminComponent,
    AcademiesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,      
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    FontAwesomeModule,
    CollapseModule.forRoot(),
    NgxSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
