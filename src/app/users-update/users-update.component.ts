import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AlertService } from 'src/app/_services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Users } from 'src/app/users/users.component';

@Component({
	selector: 'app-users-update',
	templateUrl: './users-update.component.html',
	styleUrls: ['./users-update.component.css']
})
export class UsersUpdateComponent implements OnInit {

	public isLoading = true;
	public updateUsersForm: FormGroup;
	public submitted = false;
	public user_id;
	public selectedItem: Users;

	constructor(
		private http: HttpClient,
		private alertService: AlertService,
		private formBuilder: FormBuilder,
		private activatedRoute: ActivatedRoute,
		private router: Router,
	) { }

	ngOnInit() {
		this.createForm();
		this.getUsersIdFromUrl();
		this.getCurrentUsersSelected();
	}

	private getUsersIdFromUrl() {
		this.user_id = this.activatedRoute.snapshot.paramMap.get('userId');
		console.log('this.userId :', this.user_id);
		if (this.user_id === 0) {
			this.router.navigate(['user']);
		}
	}

	private createForm() {
		this.updateUsersForm = this.formBuilder.group({
			name: ['', [Validators.required, Validators.maxLength(20)]],
			lastname: ['', [Validators.required, Validators.maxLength(30)]],
			mail: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(4)]],
		});
	}

	private getCurrentUsersSelected() {

		return this.http.get<Users>(`${environment.apiUrl}/getUsers.php?user_id=${this.user_id}`)
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
		this.updateUsersForm.patchValue({
			name: this.selectedItem.name,
			lastname: this.selectedItem.lastname,
			mail: this.selectedItem.mail,
			password: this.selectedItem.password,
		});
	}

	// convenience getter for easy access to form fields
	get f() { return this.updateUsersForm.controls; }

	public updateUsers() {
		this.submitted = true;
		if (this.updateUsersForm.invalid) {
			return;
		}
		return this.http.get(
			`${environment.apiUrl}/updateUser.php?name=${this.f.name.value}&lastname=${this.f.lastname.value}&mail=${this.f.mail.value}&password=${this.f.password.value}&user_id=${this.user_id}`,
			{ responseType: 'text' }
		)
			.subscribe(response => {
				console.log('selectItem response :', response);
				this.alertService.success('Usuario actualizado correctamente');
				this.submitted = false;
			},
				error => {
					this.alertService.error(error.error);
					this.submitted = false;
				});
	}

}
