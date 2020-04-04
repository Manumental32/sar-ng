import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AlertService } from 'src/app/_services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IrrigationPLan } from 'src/app/measurements/measurements.component';

@Component({
	selector: 'app-irrigations-plans-update',
	templateUrl: './irrigations-plans-update.component.html',
	styleUrls: ['./irrigations-plans-update.component.css']
})
export class IrrigationsPlansUpdateComponent implements OnInit {

	public isLoading = true;
	public updateIrrigationPlanForm: FormGroup;
	public submitted = false;
	public irrigationPlanId;
	public selectedItem: IrrigationPLan;

	constructor(
		private http: HttpClient,
		private alertService: AlertService,
		private formBuilder: FormBuilder,
		private activatedRoute: ActivatedRoute,
		private router: Router,
	) { }

	ngOnInit() {
		this.createForm();
		this.getIrrigationPlanIdFromUrl();
		this.getCurrentIrrigationPlanSelected();
	}

	private getIrrigationPlanIdFromUrl() {
		this.irrigationPlanId = this.activatedRoute.snapshot.paramMap.get('irrigationPlanId');
		console.log('this.irrigationPlanId :', this.irrigationPlanId);
		if (this.irrigationPlanId === 0) {
			this.router.navigate(['irrigations-plans']);
		}
	}

	private createForm() {
		this.updateIrrigationPlanForm = this.formBuilder.group({
			name: ['', Validators.required],
			humidity_min_allowed: ['', [Validators.required, Validators.min(0), Validators.max(99)]],
			light_max_allowed: ['', [Validators.required, Validators.min(0), Validators.max(1)]],
			temperature_max_allowed: ['', [Validators.required, Validators.min(0), Validators.max(99)]],
		});
	}

	private getCurrentIrrigationPlanSelected() {

		return this.http.get<IrrigationPLan>(`${environment.apiUrl}/getIrrigationsPlans.php?arduino_id=1&user_id=1&irrigation_plan_id=${this.irrigationPlanId}`)
			.subscribe(response => {
				console.log('response :', response);
				if (!response[0]) {
					return;
				}
				this.selectedItem = response[0];
				this.setFormValues();
			},
			error => {
				this.alertService.error(error.error);
			});
	}

	private setFormValues() {
		this.updateIrrigationPlanForm.patchValue({
			name: this.selectedItem.name,
			humidity_min_allowed: this.selectedItem.humidity_min_allowed,
			light_max_allowed: this.selectedItem.light_max_allowed,
			temperature_max_allowed: this.selectedItem.temperature_max_allowed,
		});
	}

	// convenience getter for easy access to form fields
	get f() { return this.updateIrrigationPlanForm.controls; }

	public updateIrrigationPlan() {
		this.submitted = true;
		if (this.updateIrrigationPlanForm.invalid) {
			return;
		}
		return this.http.get(
			`${environment.apiUrl}/updateIrrigationPlan.php?name='${this.f.name.value}'&humidity_min_allowed=${this.f.humidity_min_allowed.value}&light_max_allowed=${this.f.light_max_allowed.value}&temperature_max_allowed=${this.f.temperature_max_allowed.value}&irrigation_plan_id=${this.irrigationPlanId}`,
			{ responseType: 'text' }
		)
			.subscribe(response => {
				console.log('selectItem response :', response);
				this.alertService.success('Plan de riego actualizado correctamente');
				this.submitted = false;
			},
				error => {
					this.alertService.error(error.error);
					this.submitted = false;
				});
	}

}
