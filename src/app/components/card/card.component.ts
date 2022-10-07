import { Component, Input, OnInit } from '@angular/core';

import { ApiPatient, Patient } from 'src/app/pages/patient/list/list-patients.page';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() patient: Patient | ApiPatient;

  path = '/tabs/patient';
  name: string;
  gender: string;
  age: string | number;
  kcal: string | number;
  imgUrl: string;

  constructor() { }

  ngOnInit() {
    this.getImgUrl(this.patient);
  }

  // TODO: Remover essa gambiarra quando nao tiver mais dados mockados
  getImgUrl(patient: Patient | ApiPatient) {
    if('imgUrl' in patient) {
      this.imgUrl = patient.imgUrl;
      this.age = this.age;
      this.kcal = this.kcal;
    } else {
      this.imgUrl = 'https://ionicframework.com/docs/img/demos/avatar.svg';
    }
  }
}
