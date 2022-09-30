import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  redirectAfterLoginUrl = '';

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.redirectAfterLoginUrl = this.getRedirectAfterLoginUrl();
  }

  getRedirectAfterLoginUrl() {
    return this.getQueryParamsRedirectUrl() || '';
  }

  getQueryParamsRedirectUrl() {
    return this.activatedRoute.snapshot.queryParamMap.get('redirectTo');
  }

  signInWithGoogle() {
    this.setLocalStorageAuthenticated();
    this.router.navigateByUrl(this.redirectAfterLoginUrl);
  }

  setLocalStorageAuthenticated() {
    localStorage.setItem('authenticated', '1');
  }
}
