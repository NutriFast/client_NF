import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from '@codetrix-studio/capacitor-google-auth';

import { AuthService } from 'src/app/services/auth/auth.service';
import { ClientService } from 'src/app/services/client/client.service';

export interface Patient {
  id: string;
  userId: string;
  gender: string | null;
  birthDate: string | Date | null;
  name: string | null;
}

@Component({
  selector: 'app-list-patients',
  templateUrl: 'list-patients.page.html',
  styleUrls: ['list-patients.page.scss']
})

export class ListPatientsPage implements OnInit {
  patients: Array<Patient> = [];
  user: User;
  userName: string;
  userEmail: string;

  constructor(
    private clientService: ClientService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // TODO: Buscar os pacientes de forma mais adequada
    this.route.queryParams.subscribe(() => {
      this.userName = localStorage.getItem('userName');
      this.userEmail = localStorage.getItem('userEmail');

      this.user = this.authService.googleUser;

      this.clientService.getClients().subscribe((patients: Array<Patient>) => {
        console.log({patients});
        if(patients) {
          patients.map((patient) => {
            if(!this.patients.find((oldPatient) => oldPatient.id === patient.id)) {
              this.patients.push(patient);
            }
          });
        }
      });
    });
  }
}
