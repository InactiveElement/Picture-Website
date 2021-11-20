import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './home/sign-up/sign-up.component';
import { SignInComponent } from './home/sign-in/sign-in.component';
import { UserHomeComponent } from './user-home/user-home.component';

import { AuthInterceptorService } from './services/auth-interceptor.service';
import { UploadComponent } from './user-home/upload/upload.component';
import { SharedPicsComponent } from './user-home/shared-pics/shared-pics.component';
import { MyPicsComponent } from './user-home/my-pics/my-pics.component';
import { FileUploaderComponent } from './user-home/file-uploader/file-uploader.component';
// import filepond module
import { FilePondModule, registerPlugin } from 'ngx-filepond';

// import and register filepond file type validation plugin
import * as filepondPluginFileValidateType from 'filepond-plugin-file-validate-type';
registerPlugin(filepondPluginFileValidateType);

// Import the plugin code
import * as filepondPluginImagePreview from 'filepond-plugin-image-preview';

// Import the plugin styles
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

// Register the plugin
registerPlugin(filepondPluginImagePreview);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignUpComponent,
    SignInComponent,
    UserHomeComponent,
    UploadComponent,
    SharedPicsComponent,
    MyPicsComponent,
    FileUploaderComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FilePondModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
