import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  data: any;

  constructor(private http: HttpClient) { }

  getGoogleAuth() {
    return this.http.get('https://macro-key-346005.web.app/auth');
  }
}
