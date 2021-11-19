import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-my-pics',
  templateUrl: './my-pics.component.html',
  styleUrls: ['./my-pics.component.scss']
})
export class MyPicsComponent implements OnInit {

  myPicsForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

  upload() {
    
  }

}
