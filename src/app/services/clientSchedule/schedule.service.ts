import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClientScheduleService {
  // TODO: Levar para outro arquivo
  baseUrl = 'https://macro-key-346005.web.app/schedules';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  getClientSchedules(clientId: string) {
    const accessToken = this.authService.getAccessTokenFromLocalStorage();
    const headers = new HttpHeaders().set('Authorization', accessToken);

    const url = this.baseUrl + '/client/' + clientId;

    return this.http.get(url, { headers });
  }

  postClientSchedule(clientId: string) {
    const accessToken = this.authService.getAccessTokenFromLocalStorage();
    const headers = new HttpHeaders().set('Authorization', accessToken);

    const url = this.baseUrl + '/client/' + clientId;

    return this.http.post(url, {}, { headers });
  }
}
