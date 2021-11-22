import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { first } from 'rxjs';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-shared-pics',
  templateUrl: './shared-pics.component.html',
  styleUrls: ['./shared-pics.component.scss']
})
export class SharedPicsComponent implements OnInit {

  sharedPicsForm: FormGroup;
  public sharedPhoto: string = '';
  // public geolocation: string = '';
  // public tags: string = '';
  // public captureDate: string = '';
  // public captureBy: string = '';

  // get imageLink() {
  //   return this.sanitizer.bypassSecurityTrustUrl(localStorage.getItem("sharedPhoto"));
  // }
  

  constructor(private imageService: ImageService) { }

  ngOnInit(): void {
    this.sharedPicsForm = this.createFormGroup();
    this.display();
  }

  createFormGroup() {
    return new FormGroup({
      username: new FormControl(localStorage.getItem("username"), [Validators.required]),
    })
  }

  display() {
    console.log(this.sharedPicsForm.value.username)
    this.imageService.showShared({"currentUser": this.sharedPicsForm.value.username}).pipe(first()).subscribe(
      message => {
        this.sharedPhoto = localStorage.getItem("sharedPhoto");
      }
    )
  }

}
