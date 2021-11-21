import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-shared-pics',
  templateUrl: './shared-pics.component.html',
  styleUrls: ['./shared-pics.component.scss']
})
export class SharedPicsComponent implements OnInit {

  sharedPicsForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

}
