import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ImageService } from 'src/app/services/image.service';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  uploadForm: FormGroup;
  isPhotoError = false;
  image: string;
  submitted: boolean = false;
  uploadError: string = "";


  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient, private imageService: ImageService) { }

  ngOnInit(): void {
    this.newForm();
  }

  newForm() {
    this.uploadForm = this.fb.group({
      photo         : ['', Validators.compose([Validators.required])],
      geolocation:    ['', Validators.compose([Validators.required])],
      tags:           ['', Validators.compose([Validators.required])],
      captureDate:   ['', Validators.compose([Validators.required])],
      captureBy:     ['', Validators.compose([Validators.required])],
      id:             [localStorage.getItem("userId")]
    })
  }

  async postData(form : FormGroup) {
    this.submitted = true;
    if(!this.uploadForm.valid) {
      return;
    }
    if (this.uploadForm.get('photo').invalid) {
      this.isPhotoError = true;
    }
    this.uploadError = '';
    const formData = new FormData();
    formData.append('photo', this.uploadForm.get('photo').value);
    formData.append('geolocation', this.uploadForm.controls['geolocation'].value);
    formData.append('tags', this.uploadForm.controls['tags'].value);
    formData.append('captureDate', this.uploadForm.controls['captureDate'].value);
    formData.append('captureBy', this.uploadForm.controls['captureBy'].value);
    const userId = localStorage.getItem("userId");
    formData.append('id', userId);
    console.log(formData)
    console.log(this.uploadForm) 

    await this.imageService.upload(formData).subscribe(
      message => {
        console.log(message)
      }
    );

    // this.http.post('http://localhost:3000/image/upload', formData).subscribe(resp => {
      
    //   if(resp['status'] == 'success') {
    //     alert('File saved in file-upload-server/uploads');
    //   }
    // }, (resp)=> {
    //   this.uploadError = 'Some error occured please try later';
    //   console.log(resp);
    // });

  }

  onFileSelect(file) {
    this.uploadForm.patchValue({ photo: file });
    this.uploadForm.get('photo').updateValueAndValidity();
  }

}
