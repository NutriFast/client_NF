import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-config',
  templateUrl: 'config.page.html',
  styleUrls: ['config.page.scss']
})
export class ConfigPage {

  constructor(private router: Router) {}

  logOut() {
    this.setLocalStorageUnauthenticated();
    this.router.navigateByUrl('login');
  }

  setLocalStorageUnauthenticated() {
    localStorage.setItem('authenticated', '0');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
  }
}
