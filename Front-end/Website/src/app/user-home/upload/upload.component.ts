import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  uploadForm: FormGroup;


  constructor() { }

  ngOnInit(): void {
  }

  upload() {

  }

  onFileChanged() {

  }

  onUpload() {
    
  }


}
