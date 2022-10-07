import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiPatient, mockedPatients, Patient } from '../list/list-patients.page';

@Component({
  selector: 'app-patient',
  templateUrl: 'patient.page.html',
  styleUrls: ['patient.page.scss']
})
export class PatientPage implements OnInit {
  patients: Array<Patient | ApiPatient> = mockedPatients;
  patient: Patient | ApiPatient;
  patientId: string;

  imgUrl: string;

  telephone: string;
  gender: string;
  age: string | number;
  kcal: string | number;
  weight: string | number;
  height: string | number;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((queryParams: any) => {
      // TODO: Buscar cliente na API
      if(queryParams.id) {
        this.patient = this.patients.find((patient: Patient | ApiPatient) => patient.id === queryParams.id);
        this.getImgUrl(this.patient);
      } else {
        this.router.navigateByUrl('/tabs/list');
      }
    });
  }

  // TODO: Remover essa gambiarra quando nao tiver mais dados mockados
  getImgUrl(patient: Patient | ApiPatient) {
    if('imgUrl' in patient) {
      this.imgUrl = patient.imgUrl;
      this.age = patient.age;
      this.kcal = patient.kcal;
      this.telephone = patient.telephone;
      this.weight = patient.weight;
      this.height = patient.height;
    } else {
      this.imgUrl = 'https://ionicframework.com/docs/img/demos/avatar.svg';
      this.age = '';
      this.kcal = '';
      this.telephone = '';
      this.weight = '';
      this.height = '';
    }
  }
}
