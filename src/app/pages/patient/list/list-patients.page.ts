import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from '@codetrix-studio/capacitor-google-auth';

import { AuthService } from 'src/app/services/auth/auth.service';
import { ClientService } from 'src/app/services/client/client.service';

export interface Patient {
  id: string;
  name: string;
  telephone: string;
  gender: string;
  age: number;
  kcal: number;
  height: number;
  weight: number;
  imgUrl: string;
}

export interface ApiPatient {
  id: string;
  userId: string;
  gender: string | null;
  birthDate: string | Date | null;
  name: string | null;
}

/* eslint-disable max-len */
export const mockedPatients: Array<Patient | ApiPatient> = [
  { id: '0', name: 'Renato Lopes (Mock)', telephone: '(63) 2166-7169', gender: 'Masculino', age: 24, kcal: 2000, height: 1.80, weight: 68.40, imgUrl: 'https://images.generated.photos/L0DKS46xWc-U6HfWBtuJBQJrggDGQk5pacJFleli0h8/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/NzcwMDcxLmpwZw.jpg' },
  /* { id: '1', name: 'Marcela Silva (Mock)', telephone: '(86) 3433-9392', sex: 'Feminino', age: 15, kcal: 2500, height: 1.56, weight: 54.48, imgUrl: 'https://images.generated.photos/qFFNt8622A9UInzX8OcQ1dqQrMJNJxdvyOaH2woRmHs/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/MDI4MzM1LmpwZw.jpg' },
  { id: '2', name: 'Gabriela Pereira (Mock)', telephone: '(91) 3717-7654', sex: 'Feminino', age: 22, kcal: 1800, height: 1.72, weight: 75.80, imgUrl: 'https://images.generated.photos/M3xqPPeXm_m2UPK_WJVJdc4EH6aXvz-6ffYG11bUObk/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/MjI3MjM1LmpwZw.jpg' },
  { id: '3', name: 'Sandra Pires (Mock)', telephone: '(64) 3187-9421', sex: 'Feminino', age: 38, kcal: 2400, height: 1.64, weight: 69.32, imgUrl: 'https://images.generated.photos/0DUOKVlZhT9k76Jv9Wi_A6Es3kBn7sFYTW0uslxnXVg/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/MzM3MzM2LmpwZw.jpg' },
  { id: '4', name: 'Augusto Alves (Mock)', telephone: '(95) 3157-5273', sex: 'Masculino', age: 52, kcal: 3000, height: 1.87, weight: 85.67, imgUrl: 'https://images.generated.photos/vPU59jJoM99uU4Xg8UiJnov5OoQCh7FHlZv-ocn16x4/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/MDk3OTY2LmpwZw.jpg' },
  { id: '5', name: 'Pedro Paulo (Mock)', telephone: '(64) 3339-0973', sex: 'Masculino', age: 18, kcal: 2400, height: 1.70, weight: 70.34, imgUrl: 'https://images.generated.photos/ZEgu7oOIH5iSjqOh5q2QpHBnRcgjD2GVuf2iVSGX-6U/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/NDEzMzQwLmpwZw.jpg' }, */
];

@Component({
  selector: 'app-list-patients',
  templateUrl: 'list-patients.page.html',
  styleUrls: ['list-patients.page.scss']
})

export class ListPatientsPage implements OnInit {
  public patients: Array<Patient | ApiPatient> = mockedPatients;
  public user: User;
  userName: string;
  userEmail: string;

  constructor(
    private clientService: ClientService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // TODO: Buscar os pacientes de forma mais adequada
    this.route.queryParams.subscribe((queryParams: any) => {
      this.userName = localStorage.getItem('userName');
      this.userEmail = localStorage.getItem('userEmail');

      this.user = this.authService.googleUser;

      // TODO: Removendo quando resolver o problema do login no Android
      this.clientService.getClients().subscribe((response: Array<ApiPatient>) => {
        if(response) {
          response.map((patient) => {
            if(!this.patients.find((oldPatient) => oldPatient.id === patient.id)) {
              this.patients.push(patient);
            }
          });
        }
      });
    });
  }
}
