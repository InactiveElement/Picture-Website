import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ImageService } from 'src/app/services/image.service';
import { UserHomeComponent } from '../user-home.component';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss']
})
export class ShareComponent implements OnInit {

  shareForm: FormGroup; 
  message: any;
  currentUser: string = localStorage.getItem("username");
  

  constructor(private imageService: ImageService, private userhome: UserHomeComponent, private authService: AuthService) { }

  ngOnInit(): void {
    this.shareForm =  this.newForm();
  }

  newForm() {
    return new FormGroup({
      photo: new FormControl(localStorage.getItem("photo"), [Validators.required]),
      username: new FormControl("", [Validators.required, Validators.minLength(2)])
    })
  }

  share(): void {
    if (this.shareForm.value.username == this.currentUser)
    {
      this.message = "You cannot share the picture with yourself."
    } else {
      this.authService.checkUser({"username": this.shareForm.value.username}).pipe(first()).subscribe(
        message => {
          if (message.message == "Success")
          {
            this.imageService.share(this.shareForm.value).pipe(first()).subscribe(
              message => {
                if (message.message == "Success") {
                  setTimeout(() => {
                    this.userhome.myPics();
                  },500);
                }
              }
            )
          } else {
            this.message = message.message;
          }
        }
        )
    }
  }

  cancel() {
    this.userhome.myPics();
  }

  valueChange() {
    this.message = null;
  }

}
