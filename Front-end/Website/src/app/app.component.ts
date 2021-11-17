import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Website';
  isAuthenticated = false;

  constructor(private authService: AuthService, private router: Router) { }
  
  async ngOnInit() {
    this.authService.isUserLoggedIn$.subscribe((isLoggedin) => {
      this.isAuthenticated = isLoggedin;
    })
  }

  // get currentUser() {
  //   return sessionStorage.getItem('token') ?? null;
  // }

  signOut() {
    localStorage.removeItem("token");
    this.authService.isUserLoggedIn$.next(false);
    this.router.navigate([""]);
  }
}
