import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { first } from 'rxjs';



@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  @Output() _switchUp = new EventEmitter();
  @Output() _goHome = new EventEmitter();
  loginForm: FormGroup;
  message: any;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(5)])
    })
  }

  login(): void {
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password).pipe(first()).subscribe(
      message => {
        this.message = message.message;
      }
    )
  }
  
  valueChange() {
    this.message = null;
  }

  switchUp() {
    this._switchUp.emit();
  }

  goHome() {
    this._goHome.emit();
  } 

}
