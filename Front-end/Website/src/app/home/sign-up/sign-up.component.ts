import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;
  @Output() _switchIn = new EventEmitter();
  @Output() _goHome = new EventEmitter();
  
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.signUpForm = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      username: new FormControl("", [Validators.required, Validators.minLength(2)]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(5)])
    })
  }

  signup(): void {
    this.authService.signup(this.signUpForm.value)
    .subscribe((msg) => console.log(msg));
  }

  switchIn() { 
    this._switchIn.emit();
  }

  goHome() {
    this._goHome.emit();
  }
}
