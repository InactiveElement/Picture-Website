import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  signin: boolean = false;
  currentUser: any = false;
  title = 'Website';

  setUser() {
    this.currentUser = true;
  }
}
