import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { ImageService } from 'src/app/services/image.service';
import { MyPicsComponent } from '../my-pics/my-pics.component';
import { UserHomeComponent } from '../user-home.component';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  updatePicForm: FormGroup;
  public geolocation: string = localStorage.getItem("geolocation");
  public tags: string = localStorage.getItem("tags");
  public captureDate: string = localStorage.getItem("capturedDate");
  public captureBy: string = localStorage.getItem("capturedBy");
  message: any;

  constructor(private imageService: ImageService, private userhome: UserHomeComponent) { }

  ngOnInit(): void {
    this.updatePicForm =  this.newForm();
  }

  newForm(): FormGroup {
    return new FormGroup({
      geolocation: new FormControl(this.geolocation, [Validators.required, Validators.minLength(2)]),
      tags: new FormControl(this.tags, [Validators.required, Validators.minLength(2)]),
      captureDate: new FormControl(this.captureDate, [Validators.required, Validators.minLength(2)]),
      captureBy: new FormControl(this.captureBy, [Validators.required, Validators.minLength(2)]),
      photoID: new FormControl(localStorage.getItem("photoID"))
    })
  }
  
  update(): void {
    this.imageService.update(this.updatePicForm.value).pipe(first()).subscribe(
      message => {
        this.message = message.message;
        this.userhome.myPics()
      }
    )
  }

  cancel() {
    this.userhome.myPics();
  }

}
