import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../../services/auth/auth.service';

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

  getGoogleAuthJWTToken() {
    this.authService.getGoogleAuth().subscribe(response => {
      console.log({response});
    });
  }

  setLocalStorageAuthenticated() {
    localStorage.setItem('authenticated', '1');
  }
}
