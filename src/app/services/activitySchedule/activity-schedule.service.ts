import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthService } from '../auth/auth.service';

interface ActivitySchedule {
  duration: number;
  freequency: number; // Errado pq ta errado no backend
  activityId: string;
  scheduleId: string;

}

@Injectable({
  providedIn: 'root'
})
export class ActivityScheduleService {
  // TODO: Levar para outro arquivo
  baseUrl = 'https://macro-key-346005.web.app/activitySchedules';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  getActivitySchedule(scheduleId: string) {
    const accessToken = this.authService.getAccessTokenFromLocalStorage();
    const headers = new HttpHeaders().set('Authorization', accessToken);

    const url = this.baseUrl + '/schedule/' + scheduleId;

    return this.http.get(url, { headers });
  }

  postActivitySchedule(clientId: string, activitySchedule: ActivitySchedule) {
    const accessToken = this.authService.getAccessTokenFromLocalStorage();
    const headers = new HttpHeaders().set('Authorization', accessToken);

    const url = this.baseUrl + '/client/' + clientId;

    return this.http.post(url, activitySchedule, { headers });
  }
}
