import { Component, OnInit } from '@angular/core';
import { Activity } from '../list/list-activities.page';

@Component({
  selector: 'app-select',
  templateUrl: './select.page.html',
  styleUrls: ['./select.page.scss'],
})
export class SelectPage implements OnInit {
  mockedActivities: Array<Activity> = [
    { icon: 'walk-outline', name: 'Correr', daysPerWeek: 1, hoursPerDay: 2 },
    { icon: 'bed-outline', name: 'Dormir', daysPerWeek: 7, hoursPerDay: 7 },
    { icon: 'barbell-outline', name: 'Academia', daysPerWeek: 3, hoursPerDay: 1 },
    { icon: 'bicycle-outline', name: 'Ciclismo', daysPerWeek: 2, hoursPerDay: 1 },
  ];
  constructor() { }

  ngOnInit() {
  }

}
