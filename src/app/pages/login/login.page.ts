import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';

import { AuthService } from '../../services/auth/auth.service';

GoogleAuth.initialize({
  clientId: '586885413478-qrg9b4f1c6q04ksb3l3m8897ddmbl3bm.apps.googleusercontent.com',
  scopes: ['profile', 'email'],
  grantOfflineAccess: true,
});

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  redirectAfterLoginUrl = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) { }

  ionViewDidEnter() {
    GoogleAuth.initialize();
  }

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
    this.getGoogleAuthJWTToken();
    /* this.setLocalStorageAuthenticated();
    this.router.navigateByUrl(this.redirectAfterLoginUrl); */
  }

  async getGoogleAuthJWTToken() {
    console.log(await this.authService.getGoogleAuth());/* .subscribe(response => {
      console.log({response});
    }); */
  }

  setLocalStorageAuthenticated() {
    localStorage.setItem('authenticated', '1');
  }
}
