import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AlertService } from '../_services/alert.service';

export interface IrrigationPLan {
	irrigation_plan_id: string;
	name: string;
	humidity_min_allowed: number;
	light_max_allowed: number;
	temperature_max_allowed: number;
}

@Component({
	selector: 'app-irrigations-plans',
	templateUrl: './irrigations-plans.component.html',
	styleUrls: ['./irrigations-plans.component.css']
})
export class IrrigationsPlansComponent implements OnInit {

	public items: IrrigationPLan[];
	public selectedItem: IrrigationPLan;
	public isLoading = true;

	constructor(
		private http: HttpClient,
		private alertService: AlertService,
	) { }

	ngOnInit() {
		return this.http.get<IrrigationPLan[]>(`${environment.apiUrl}/getIrrigationsPlans.php`)
			.subscribe(response => {
				console.log('response :', response);
				this.items = response;
				this.getCurrentIrrigationPlanSelected();
				this.isLoading = false;
			},
			error => {
				this.alertService.error(error.error);
				this.isLoading = false;
			});
	}

	public selectItem(item: IrrigationPLan) {
		console.log('item :', item);
		// http://localhost:9999/changeIrrigationPlan.php?arduino_id=1&irrigation_plan_id=2&user_id=3
		return this.http.get(`${environment.apiUrl}/changeIrrigationPlan.php?arduino_id=1&irrigation_plan_id=${item.irrigation_plan_id}&user_id=1`, 
		{ responseType: 'text'})
			.subscribe( response => {
				// console.log('selectItem response :', response);
				this.selectedItem = item;
				this.alertService.success('Plan de riego seleccionado correctamente');
			},
			error => {
				this.alertService.error(error.error);
			});
	}

	public getCurrentIrrigationPlanSelected() {
		// http://localhost:9999/getCurrentIrrigationPlanSelected.php?arduino_id=1&user_id=1
		return this.http.get<IrrigationPLan>(`${environment.apiUrl}/getCurrentIrrigationPlanSelected.php?arduino_id=1&user_id=1`)
			.subscribe(
				response => {
					console.log('response :', response);
					console.log('this.items :', this.items);
					this.selectedItem = response;
				},
				error => {
					this.alertService.error(error.error);
				});
	}

}
