import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';


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


  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) { }

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
    })
  }

  postData(form : FormGroup) {
    this.submitted = true;
    if(!this.uploadForm.valid) {
      return;
    }
    if (this.uploadForm.get('photo').invalid) {
      this.isPhotoError = true;
      console.log(0);
    }
    console.log(this.uploadForm.get('photo').value); 
    this.uploadError = '';
    const formData = new FormData();
    console.log(1);
    formData.append('photo', this.uploadForm.get('photo').value);
    formData.append('geolocation', this.uploadForm.controls['geolocation'].value);
    formData.append('tags', this.uploadForm.controls['tags'].value);
    formData.append('captureDate', this.uploadForm.controls['captureDate'].value);
    formData.append('captureBy', this.uploadForm.controls['captureBy'].value);
    const userId = localStorage.getItem("userId");
    formData.append('id', userId);
    console.log(2);
    this.http.post('http://localhost:3000/auth/upload', formData).subscribe(resp => {
      if(resp['status'] == 'success') {
        alert('File saved in file-upload-server/uploads');
        console.log(3);
      }
    }, (resp)=> {
      this.uploadError = 'Some error occured please try later';
      console.log(resp);
      console.log(4);
    });
    console.log(5);

  }

  onFileSelect(file) {
    this.uploadForm.patchValue({ photo: file });
    this.uploadForm.get('photo').updateValueAndValidity();
  }

}
