import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { ContactCreateComponent } from './contact-create/contact-create.component';
import { ForecastComponent } from './forecast/forecast.component';
import { MeasurementsComponent } from './measurements/measurements.component';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_guards';
import { IrrigationsPlansComponent } from './irrigations-plans/irrigations-plans.component';
import { AboutUsComponent } from './about-us/about-us.component';

const routes: Routes = [
	{ path: '', redirectTo: 'forecast', pathMatch: 'full', canActivate: [AuthGuard] },
	{path: "forecast", component: ForecastComponent, canActivate: [AuthGuard]},
	{path: "irrigations-plans", component: IrrigationsPlansComponent, canActivate: [AuthGuard]},
	{path: "measurements", component: MeasurementsComponent, canActivate: [AuthGuard]},
	{path: "users", component: UsersComponent, canActivate: [AuthGuard]},
	{path: "about-us", component: AboutUsComponent, canActivate: [AuthGuard]},

	// {path: "contact-create", component: ContactCreateComponent, canActivate: [AuthGuard]},
	{path: "login", component: LoginComponent},
	// otherwise redirect to forecast
	{ path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
