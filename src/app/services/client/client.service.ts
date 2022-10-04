/* eslint-disable max-len */
/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/naming-convention */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  data: any;
  mockedToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imx1Y2FzZ3VlcnJhdGVlQGdtYWlsLmNvbSIsInN1YiI6IjdhODM3OGNiLTVmMDktNDQzMi1iNmY5LTQ0ODc3MmIzM2E0MCIsImlhdCI6MTY2NDg1MDI4OSwiZXhwIjoxNjY0OTM2Njg5fQ.PJnq5355PGSyfJduO2TvpYXXIxDM3GYEkznoCjWTVG8';

  constructor(private http: HttpClient) { }

  getClients() {
    return this.http.get(
      'https://macro-key-346005.web.app/clients',
      { headers: { 'Authorization': 'Bearer ' + this.mockedToken }}
    );
  }
}
