import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements OnInit {

  isAuthenticated = false;
  upload: Boolean = false;
  myPicsForm: boolean = false;
  sharedPicsForm: Boolean = true;

  

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isUserLoggedIn$.subscribe((isLoggedin) => {
    this.isAuthenticated = isLoggedin;
    })
  }

  sharedPics() {
    document.getElementById('sharedPictures')?.setAttribute("style", "color: azure; text-shadow: 0 1px 2px 0 rgba(198, 202, 206, 1), 0 1px 5px 0 rgba(198, 202, 206, 1); transform: translateY(-0.1rem); transition: transform 150ms;")
    document.getElementById('myPictures')?.setAttribute("style", "color: #cdd3da; text-shadow: none; transform: none;")
    document.getElementById('uploadPicture')?.setAttribute("style", "color: #cdd3da; text-shadow: none; transform: none;")
    this.upload = false;
    this.sharedPicsForm = true;
    this.myPicsForm = false;
  }

  myPics() {
    document.getElementById('sharedPictures')?.setAttribute("style", "color: #cdd3da; text-shadow: none; transform: none;")
    document.getElementById('myPictures')?.setAttribute("style", "color: azure; text-shadow: 0 1px 2px 0 rgba(198, 202, 206, 1), 0 1px 5px 0 rgba(198, 202, 206, 1); transform: translateY(-0.1rem); transition: transform 150ms;")
    document.getElementById('uploadPicture')?.setAttribute("style", "color: #cdd3da; text-shadow: none; transform: none;")
    this.upload = false;
    this.sharedPicsForm = false;
    this.myPicsForm = true;
  }


  uploadPic() {
    document.getElementById('uploadPicture')?.setAttribute("style", "color: azure; text-shadow: 0 1px 2px 0 rgba(198, 202, 206, 1), 0 1px 5px 0 rgba(198, 202, 206, 1); transform: translateY(-0.1rem); transition: transform 150ms;")
    document.getElementById('sharedPictures')?.setAttribute("style", "color: #cdd3da; text-shadow: none; transform: none;")
    document.getElementById('myPictures')?.setAttribute("style", "color: #cdd3da; text-shadow: none; transform: none;")
    this.upload = true;
    this.sharedPicsForm = false;
    this.myPicsForm = false;
  } 





}
