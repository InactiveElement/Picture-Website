import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Website';

  constructor() { }
  
  async ngOnInit() {
    
  }

  get currentUser() {
    return sessionStorage.getItem('token') ?? null;
  }

  signOut() {
    sessionStorage.removeItem('token');
  }
}
