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
import { UpdateComponent } from './user-home/update/update.component';

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
    FileUploaderComponent,
    UpdateComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
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
