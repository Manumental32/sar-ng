import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertService } from '../_services/alert.service';
import { Subscription, interval } from 'rxjs';

export interface IrrigationPLan {
	irrigation_plan_id: number;
	name: string;
	humidity_min_allowed: number;
	light_max_allowed: number;
	temperature_max_allowed: number;
}

@Component({
	selector: 'app-measurements',
	templateUrl: './measurements.component.html',
	styleUrls: ['./measurements.component.css']
})

export class MeasurementsComponent implements OnInit, OnDestroy {

	items;
	selectedItem: IrrigationPLan;
	periodicCheckSubscription: Subscription;
	public isLoadingItem = true;
	public irrigationOn = false;

	constructor(
		private http: HttpClient,
		private alertService: AlertService,
	) { }

	ngOnInit() {
		this.readArduinoMeasurements();
		this.getCurrentIrrigationPlanSelected();
		this.periodicCheckSubscription = interval(10000).subscribe(() => {
			this.readArduinoMeasurements();
			this.getCurrentIrrigationPlanSelected();
		});
	}

	public readArduinoMeasurements() {
		this.isLoadingItem = true;
		// http://184.72.104.116/readArduinoMeasurements.php?arduino_id=1

		const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');

		return this.http.get(`${environment.apiUrl}/readArduinoMeasurements.php?arduino_id=1`, { headers, responseType: 'text' })
			.subscribe(response => {
				console.log('response :', response);
				this.items = response.split(',');
				// console.log('this.items :', this.items);
				// this.getCurrentIrrigationPlanSelected();
				this.isLoadingItem = false;
			},
				error => {
					this.alertService.error(error.error);
					this.isLoadingItem = false;
				}
			);
	}


	public getCurrentIrrigationPlanSelected() {
		// http://localhost:9999/getCurrentIrrigationPlanSelected.php?arduino_id=1&user_id=1
		return this.http.get<IrrigationPLan>(`${environment.apiUrl}/getCurrentIrrigationPlanSelected.php?arduino_id=1&user_id=1`)
			.subscribe(
				response => {
					console.log('response :', response);
					console.log('this.items :', this.items);
					this.selectedItem = response;
					this.CompareIrrigationPlan();
				},
				error => {
					this.alertService.error(error.error);
				});
	}



public CompareIrrigationPlan() {
	console.log('pase por aca 1')
	console.log('this.items :', this.items);
	console.log('this.selectedItem :', this.selectedItem);
	let itemHumidityMinAllowed = parseInt(this.items[0]);
	let selectedHumidityMinAllowed = parseInt(this.selectedItem.humidity_min_allowed);
	let itemLigthMaxAllowed = parseInt(this.items[1]);
	let selectedLigthMaxAllowed = parseInt(this.selectedItem.light_max_allowed);
	let itemTemperatureMaxAllowed = parseInt(this.items[2]);
	let selectedTemperatureMaxAllowed = parseInt(this.selectedItem.temperature_max_allowed);
	if ((itemHumidityMinAllowed <= selectedHumidityMinAllowed) && (itemLigthMaxAllowed <= selectedLigthMaxAllowed) 
		&& (itemTemperatureMaxAllowed <= selectedTemperatureMaxAllowed)) {
			this.irrigationOn = true;
			this.alertService.success('El sistema está regando');
			return false;

	}
	/*else if (this.items[0] >= this.humidity_max_irrigation) || {*/
		//console.log('this.items else:', this.items[0]);
		//console.log('this.humidity_max_irrigation:', this.humidity_max_irrigation)
		this.alertService.error('El sistema no está regando');
}





	ngOnDestroy() {
		this.periodicCheckSubscription.unsubscribe();
	}

}
