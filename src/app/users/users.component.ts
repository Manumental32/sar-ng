import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AlertService } from '../_services/alert.service';

export interface Users {
	name: string;
	lastname: string;
	mail: string;
	password: string;
	enabled: boolean;
}

@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

	items: Users[];
	constructor(
		private http: HttpClient,
		private alertService: AlertService,
	) { }

	ngOnInit() {
		return this.http.get<Users[]>(`${environment.apiUrl}/getUsers.php`)
			.subscribe(response => {
				console.log('response :', response);
				this.items = response;
			},
			error => {
				this.alertService.error(error.error);
			});
	}

}
