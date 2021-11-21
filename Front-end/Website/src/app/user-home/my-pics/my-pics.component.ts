import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { ImageService } from 'src/app/services/image.service';
import { UserHomeComponent } from '../user-home.component';



@Component({
  selector: 'app-my-pics',
  templateUrl: './my-pics.component.html',
  styleUrls: ['./my-pics.component.scss']
})
export class MyPicsComponent implements OnInit {

  myPicsForm: FormGroup;
  public image: string = '';
  public geolocation: string = '';
  public tags: string = '';
  public captureDate: string = '';
  public captureBy: string = '';
  message: any;
  imageFile: any

  get userId() {
    return localStorage.getItem("userId");
  }

  get imageLink() {
    return this.sanitizer.bypassSecurityTrustUrl(localStorage.getItem("photo"));
  }

  get photoID() {
    return localStorage.getItem("photoID");
  }

  constructor(private router: Router, private imageService: ImageService, private sanitizer: DomSanitizer, private userHome: UserHomeComponent) { }

  ngOnInit(): void {
    this.myPicsForm = this.createFormGroup();
    this.display();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      id: new FormControl(this.userId, [Validators.required]),
      photoID: new FormControl(this.photoID, [Validators.required])
    })
  }

  display(): void {
    this.imageService.display({"id":this.myPicsForm.value.id}).pipe(first()).subscribe(
      message => {
        this.message = message.message;
        this.image = localStorage.getItem("photo");
        this.geolocation = localStorage.getItem("geolocation");
        this.tags = localStorage.getItem("tags");
        this.captureDate = localStorage.getItem("capturedDate");
        this.captureBy = localStorage.getItem("capturedBy");
      }
    )
  }

  deletePic(): void {
    this.imageService.delete({"photoID":this.photoID}).pipe(first()).subscribe(
      message => {
        this.message = message.message;
        localStorage.removeItem("photo");
        localStorage.removeItem("geolocation");
        localStorage.removeItem("tags");
        localStorage.removeItem("capturedDate");
        localStorage.removeItem("capturedBy");
        localStorage.removeItem("photoID");
        this.image = null;
      }
    )
  }

  updateForm() {
    this.userHome.updatePic();
  }

}
