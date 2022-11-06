import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthService } from '../auth/auth.service';
/* import { Patient } from 'src/app/pages/patient/list/list-patients.page'; */

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  // TODO: Levar para outro arquivo
  baseUrl = 'https://macro-key-346005.web.app/clients';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  getClients() {
    const accessToken = this.authService.getAccessTokenFromLocalStorage();
    const headers = new HttpHeaders().set('Authorization', accessToken);

    const url = this.baseUrl;

    return this.http.get(url, { headers });
  }

  getClient(id: string) {
    const accessToken = this.authService.getAccessTokenFromLocalStorage();
    const headers = new HttpHeaders().set('Authorization', accessToken);

    const url = this.baseUrl + '/' + id;

    return this.http.get(url, { headers });
  }

  postClient(client: any) {
    const accessToken = this.authService.getAccessTokenFromLocalStorage();
    const headers = new HttpHeaders().set('Authorization', accessToken);

    const url = this.baseUrl;

    return this.http.post(url, client, { headers });
  }

  updateClient(client: any) {
    const accessToken = this.authService.getAccessTokenFromLocalStorage();
    const headers = new HttpHeaders().set('Authorization', accessToken);

    console.log({client});

    const url = this.baseUrl;

    return this.http.patch(url, client, { headers });
  }
}
