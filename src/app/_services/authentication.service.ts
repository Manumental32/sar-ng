import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
		console.log('username :', username);
		// try {
			return this.http.get<any>(`${environment.apiUrl}/getUsers.php?mail=${username}&password=${password}`)
				.pipe(map(user => {
					console.log('user :', user);
					// login successful if there's a jwt token in the response
					if (user && user[0]) {
						// store user details and jwt token in local storage to keep user logged in between page refreshes
						localStorage.setItem('currentUser', JSON.stringify(user[0]));
						this.currentUserSubject.next(user[0]);
					} else {
						console.log('sin user :', user);
					}

					return user;
				}
			))
		// }
		// catch(error) {
		// 	return error;
		// }
	};

        // return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username, password })
        //     .pipe(map(user => {
        //         // login successful if there's a jwt token in the response
        //         if (user && user.token) {
        //             // store user details and jwt token in local storage to keep user logged in between page refreshes
        //             localStorage.setItem('currentUser', JSON.stringify(user));
        //             this.currentUserSubject.next(user);
        //         }

        //         return user;
        //     }));
    // }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}