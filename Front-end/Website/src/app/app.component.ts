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
  
  get username() {
    return localStorage.getItem("username") ?? "(missing)";
  }

  constructor(private authService: AuthService, private router: Router) { }
  
  async ngOnInit() {
    this.authService.isUserLoggedIn$.subscribe((isLoggedin) => {
      this.isAuthenticated = isLoggedin;
    })
    const userToken = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
  }

  signOut() {
    localStorage.clear();
    this.authService.isUserLoggedIn$.next(false);
    this.router.navigate([""]);
  }
}
