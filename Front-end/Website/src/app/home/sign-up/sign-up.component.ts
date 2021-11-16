import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  @Output() _switchIn = new EventEmitter();
  @Output() _goHome = new EventEmitter();
  signUp: any;
  error: string = "";
  loading: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {

  }

  switchIn() {
    this._switchIn.emit();
  }

  goHome() {
    this._goHome.emit();
  }
}
