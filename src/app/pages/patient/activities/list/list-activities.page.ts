import { Component, OnInit } from '@angular/core';

export interface Activity {
  icon: string;
  name: string;
  daysPerWeek: number;
  hoursPerDay: number;
}

@Component({
  selector: 'app-list',
  templateUrl: './list-activities.page.html',
  styleUrls: ['./list-activities.page.scss'],
})
export class ListActivitiesPage implements OnInit {
  mockedActivities: Array<Activity> = [
    { icon: 'walk-outline', name: 'Correr', daysPerWeek: 1, hoursPerDay: 2 },
    { icon: 'bed-outline', name: 'Dormir', daysPerWeek: 7, hoursPerDay: 7 },
    { icon: 'barbell-outline', name: 'Academia', daysPerWeek: 3, hoursPerDay: 1 },
    { icon: 'bicycle-outline', name: 'Ciclismo', daysPerWeek: 2, hoursPerDay: 1 },
  ];
  resultPath = '/tabs/result';
  activityPath = '/tabs/activity';
  selectActivityPath = '/tabs/select';

  constructor() { }

  ngOnInit() {
  }

}
