import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  signup: boolean = false;
  signin: boolean = false;

  constructor(private router: Router) { }

  get currentUser() {
    return sessionStorage.getItem('user') ?? null;
  }

  ngOnInit(): void {
    if (this.currentUser) {
      this.router.navigate(["/home"]);
    }
  }

  setSignUp() {
    this.signin = false;
    this.signup = true;
  }

  setSignIn() {
    this.signup = false;
    this.signin = true;
  }

  setHome() {
    this.signin = false;
    this.signup = false;
  }
}
