import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  getClients() {
    const accessToken = this.authService.getAccessTokenFromLocalStorage();
    const headers = new HttpHeaders().set('Authorization', accessToken);

    return this.http.get('https://macro-key-346005.web.app/clients', { headers });
  }
}
