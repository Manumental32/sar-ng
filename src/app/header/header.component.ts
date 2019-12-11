import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
	  private autenticationService: AuthenticationService,
	  private router: Router,
  ) { }

  ngOnInit() {
  }

  public isUserAutenticated = (): boolean => {
	return (this.autenticationService.currentUserValue !== null);
  }

  public logout = () => {
	  this.autenticationService.logout();
	  this.router.navigate(['/login']);
  }

}
