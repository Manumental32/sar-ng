import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AlertService } from 'src/app/_services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
	selector: 'app-irrigations-plans-new',
	templateUrl: './irrigations-plans-new.component.html',
	styleUrls: ['./irrigations-plans-new.component.css']
})
export class IrrigationsPlansNewComponent implements OnInit {

	public isLoading = true;
	public createirrigationPlanForm: FormGroup;
	public submitted: boolean = false;

	constructor(
		private http: HttpClient,
		private alertService: AlertService,
		private formBuilder: FormBuilder,
	) { }

	ngOnInit() {
		this.createirrigationPlanForm = this.formBuilder.group({
			name: ['', Validators.required], updateOn: 'blur', 
			humidity_min_allowed: ['', [Validators.required, Validators.min(0), Validators.max(99)]],
			light_max_allowed: ['', [Validators.required, Validators.min(0), Validators.max(99)]],
			temperature_max_allowed: ['', [Validators.required, Validators.min(0), Validators.max(99)]],
			
		});
	}

	// convenience getter for easy access to form fields
	get f() { return this.createirrigationPlanForm.controls; }

	public createIrrigationPlan() {
		if (this.submitted === true){
			return;
		}
        this.submitted = true;

        if (this.createirrigationPlanForm.invalid) {
            return;
        }
		return this.http.get(
				`${environment.apiUrl}/createIrrigationPlan.php?name='${this.f.name.value}'&humidity_min_allowed=${this.f.humidity_min_allowed.value}&light_max_allowed=${this.f.light_max_allowed.value}&temperature_max_allowed=${this.f.temperature_max_allowed.value}`,
				{ responseType: 'text' }
			)
			.subscribe(response => {
				console.log('selectItem response :', response);
				this.alertService.success('Plan de riego creado correctamente');
				this.submitted = false;
			},
			error => {
				this.alertService.error(error.error);
				this.submitted = false;
			});
	}

}
