import { Component, Input, OnInit } from '@angular/core';

import { Patient } from 'src/app/pages/patient/list/list-patients.page';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() patient: Patient;
  age: number;

  path = '/tabs/patient';
  imgUrl = 'https://ionicframework.com/docs/img/demos/avatar.svg';

  constructor() {}

  ngOnInit() {
    this.age = this.getAgeByBirthDate(this.patient.birthDate);
  }

  getAgeByBirthDate(birthDate: string) {
    const todaysDate = new Date();
    const convertedBirthDate = new Date(birthDate);

    const diferenceInYears = todaysDate.getFullYear() - convertedBirthDate.getFullYear();
    const diferenceInMonths = todaysDate.getMonth() - convertedBirthDate.getMonth();

    if (diferenceInMonths < 0 || (diferenceInMonths === 0 && todaysDate.getDate() < convertedBirthDate.getDate())) {
      return diferenceInYears - 1;
    } else {
      return diferenceInYears;
    }
  }
}
