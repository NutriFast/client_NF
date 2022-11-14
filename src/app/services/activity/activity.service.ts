import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  // TODO: Levar para outro arquivo
  baseUrl = 'https://macro-key-346005.web.app/activities';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  getActivities() {
    const accessToken = this.authService.getAccessTokenFromLocalStorage();
    const headers = new HttpHeaders().set('Authorization', accessToken);

    const url = this.baseUrl;

    return this.http.get(url, { headers });
  }
}
