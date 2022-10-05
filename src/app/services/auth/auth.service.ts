import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  googleUser: any;

  constructor() { }

  async getGoogleAuth() {
    const response = await GoogleAuth.signIn();
    this.googleUser = response;

		return this.googleUser;
  }
}
