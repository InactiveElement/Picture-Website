import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  @Output() _switchUp = new EventEmitter();
  @Output() _goHome = new EventEmitter();
  loginForm: any;
  error: string = "";
  loading: boolean = true;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    sessionStorage.setItem('user', 'true');
    this.router.navigate(["/home"]);
  }

  switchUp() {
    this._switchUp.emit();
  }

  goHome() {
    this._goHome.emit();
  }

}
