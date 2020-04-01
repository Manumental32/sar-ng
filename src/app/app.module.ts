import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactCreateComponent } from './contact-create/contact-create.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ForecastComponent } from './forecast/forecast.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http'; 
import { AlertComponent } from './_components';
import { IrrigationsPlansComponent } from './irrigations-plans/irrigations-plans.component';
import { MeasurementsComponent } from './measurements/measurements.component';
import { UsersComponent } from './users/users.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { IrrigationsPlansNewComponent } from './irrigations-plans-new/irrigations-plans-new.component';
import { IrrigationsPlansUpdateComponent } from './irrigations-plans-update/irrigations-plans-update.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactCreateComponent,
    HeaderComponent,
    FooterComponent,
	ForecastComponent,
	LoginComponent,
	AlertComponent,
	IrrigationsPlansComponent,
	IrrigationsPlansNewComponent,
	IrrigationsPlansUpdateComponent,
	MeasurementsComponent,
	UsersComponent,
	AboutUsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	FormsModule,
	ReactiveFormsModule,
	HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
