import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  @Output() _switchUp = new EventEmitter();
  @Output() _goHome = new EventEmitter();
  @Output() _updateUser = new EventEmitter();
  loginForm: any;
  error: string = "";
  loading: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    
  }

  switchUp() {
    this._switchUp.emit();
  }

  goHome() {
    this._goHome.emit();
  }

  updateUser() {
    this._updateUser.emit();
  }

}
