import { Component, Input, OnInit } from '@angular/core';

import { Patient } from 'src/app/pages/patient/list/list-patients.page';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() patient: Patient;

  path = '/tabs/patient';
  name: string;
  gender: string;
  age: string | number;
  kcal: string | number;
  imgUrl = 'https://ionicframework.com/docs/img/demos/avatar.svg';

  constructor() { }

  ngOnInit() {
  }
}
