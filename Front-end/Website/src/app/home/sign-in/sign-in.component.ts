import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  loginForm: any;
  error: string = "";
  loading: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    
  }

}
