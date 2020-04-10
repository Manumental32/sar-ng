import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AlertService } from '../_services/alert.service';

export interface Users {
	name: string;
	lastname: string;
	mail: string;
	password: string;
	user_id: number;
	enabled: boolean;
}

@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

	items: Users[];
	public selectedItem: Users;
	public isLoading = true;


	constructor(
		private http: HttpClient,
		private alertService: AlertService,
	) { }

	ngOnInit() {

		this.getUsers();
	}



	private getUsers() {
		return this.http.get<Users[]>(`${environment.apiUrl}/getUsers.php`)
			.subscribe(response => {
				console.log('response :', response);
				this.items = response;
				this.isLoading = false;
			},
			error => {
				this.alertService.error(error.error);
				this.isLoading = false;
			});
	}
	

//nair



	public deleteItem(item: Users) {
		if(!confirm("¿Estás seguro que queres deshabilitar el usuario '" + item.name + "'?")) {
			return;
		}
		return this.http.get(`${environment.apiUrl}/updateUser.php?client_id=1&user_id=${item.user_id}&name=${item.name}
			&lastname=${item.lastname}
			&mail=${item.mail}&password=${item.password}&enabled=0`, 
		{ responseType: 'text'})
			.subscribe( response => {
				 console.log('selectItem response nair:', response);
				this.alertService.success('Usuario deshabilitado correctamente');
				this.getUsers();
			},
			error => {
				this.alertService.error(error.error);
			});
	}

		public enabledItem(item: Users) {
		if(!confirm("¿Estás seguro que queres habilitar el usuario '" + item.name + "'?")) {
			return;
		}
		return this.http.get(`${environment.apiUrl}/updateUser.php?client_id=1&user_id=${item.user_id}&name=${item.name}
			&lastname=${item.lastname}
			&mail=${item.mail}&password=${item.password}&enabled=1`,
		{ responseType: 'text'})
			.subscribe( response => {
				 console.log('selectItem response nair:', response);
				this.alertService.success('Usuario habilitado correctamente');
				this.getUsers();
			},
			error => {
				this.alertService.error(error.error);
			});
	}


}
