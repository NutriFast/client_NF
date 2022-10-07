import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { GoogleAuth, User } from '@codetrix-studio/capacitor-google-auth';

export interface AuthResponse {
  accessToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public googleUser: User;
  public googleAccessToken: string;

  constructor(private http: HttpClient) {}

  async authenticateWithGoogle() {
    const googleUser = await GoogleAuth.signIn();
    const googleAccessToken = googleUser.authentication.accessToken;

    console.log({googleUser});

    if(googleAccessToken) {
      this.googleUser = googleUser;
      this.googleAccessToken = googleAccessToken;

      // TODO: Buscar os dados do usuário da api e salvar da forma correta
      localStorage.setItem('userName', this.googleUser.givenName);
      localStorage.setItem('userEmail',this. googleUser.email);
    }
  }

  getAccessToken() {
    return this.http.post(
      'https://macro-key-346005.web.app/auth/google',
      { token: this.googleAccessToken }
    );
  }

  setLocalStorageToken(accessToken: string) {
    localStorage.setItem('accessToken', accessToken);
  }

  getAccessTokenFromLocalStorage() {
    return localStorage.getItem('accessToken');
  }

  setLocalStorageAuthenticated() {
    localStorage.setItem('authenticated', '1');
  }
}
