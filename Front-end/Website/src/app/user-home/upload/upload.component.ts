import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, Validators, NgForm, FormBuilder } from '@angular/forms';
import { FilePondOptions } from 'filepond';
import 'filepond/dist/filepond.css';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  uploadForm: FormGroup;
  img: any;
  

  constructor() {
   
  }

  async ngOnInit() {
    
  }
  postData() {
    
  }

  @ViewChild('myPond') myPond: any;

  pondOptions = {
      class: 'my-filepond',
      multiple: true,
      acceptedFileTypes: ['image/jpeg', 'image/png'],
  };

  // pondFiles = ['index.html'];

  pondHandleInit() {
      console.log('FilePond has initialised', this.myPond);
  }

  pondHandleAddFile(event: any) {
      console.log('A file was added', event);
      this.img = event.file;
  }



}
