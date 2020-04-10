import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AlertService } from 'src/app/_services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
	selector: 'app-users-new',
	templateUrl: './users-new.component.html',
	styleUrls: ['./users-new.component.css']
})
export class UsersNewComponent implements OnInit {

	public isLoading = true;
	public createUsersForm: FormGroup;
	public submitted: boolean = false;

	constructor(
		private http: HttpClient,
		private alertService: AlertService,
		private formBuilder: FormBuilder,
	) { }

	ngOnInit() {
		this.createUsersForm = this.formBuilder.group({
			name: ['', Validators.required],
			lastname: ['', Validators.required],
			mail: ['', Validators.required],
			password: ['', Validators.required],
			
		});
	}

	// convenience getter for easy access to form fields
	get f() { return this.createUsersForm.controls; }

	public createUsers() {

		this.submitted = true;
        if (this.createUsersForm.invalid) {
            return;
		}
		
		return this.http.get(
				`${environment.apiUrl}/createUser.php?name=${this.f.name.value}&lastname=${this.f.lastname.value}&mail=${this.f.mail.value}&password=${this.f.password.value}`,
				{ responseType: 'text' }
			)
			.subscribe(response => {
				console.log('selectItem response :', response);
				this.alertService.success('Usuario creado correctamente');
				this.submitted = false;
			},
			error => {
				this.alertService.error(error.error);
				this.submitted = false;
				console.log('aca');
			});
	}

}
