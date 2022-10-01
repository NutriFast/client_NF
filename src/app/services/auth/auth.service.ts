import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { isPlatform } from '@ionic/angular';

import '@capacitor-community/http';
/* import { Plugins } from '@capacitor/core'; */

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  data: any;

  constructor(private http: HttpClient) { }

  getGoogleAuth() {
    return this.http.get('https://nutrifast.icu/auth');
  }
}
