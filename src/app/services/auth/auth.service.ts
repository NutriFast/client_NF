import { Injectable } from '@angular/core';

import { GoogleAuth, User } from '@codetrix-studio/capacitor-google-auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public googleUser: User;
  public accessToken: string;

  constructor() { }

  async authenticateWithGoogle() {
    const response = await GoogleAuth.signIn();
    const accessToken = response.authentication.accessToken;

    console.log(response);

    if(accessToken) {
      this.googleUser = response;
      this.accessToken = accessToken;
    }
  }
}
