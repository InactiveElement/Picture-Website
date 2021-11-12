import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  signin: boolean = false;
  // currentUser: any = false;
  title = 'Website';

  constructor() { }
  
  async ngOnInit() {
    
  }

  get currentUser() {
    return sessionStorage.getItem('user') ?? null;
  }

  signOut() {
    sessionStorage.removeItem('user');
  }
}
