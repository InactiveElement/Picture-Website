import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements OnInit {

  share: any = document.getElementById("sharedPictures");
  sharedUnder: boolean = false;
  myUnder: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  sharedPics() {
    this.sharedUnder = true;
    this.myUnder = false;
  }

  myPics() {
    this.sharedUnder = false;
    this.myUnder = true;
  }

  newOld() {

  }

  oldNew() {

  }



}
