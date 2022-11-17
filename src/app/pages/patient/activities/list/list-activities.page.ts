import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

export interface Activity {
  id?: string;
  icon?: string;
  name: string;
  daysPerWeek?: number;
  hoursPerDay?: number;
  value?: number;
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
  patientPath = '/tabs/patient';
  selectActivityPath = '/tabs/select';

  patientId: string;
  patientName: string;

  // Dar um get no schedule
  // Ver se existe algum
  // Se nao existir cria
  // Se existir da o get no activitySchedule
  // Se nao existir cria
  // Dar get nas atividades

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((queryParams: any) => {
      this.patientId = queryParams.id;
      this.patientName = queryParams.name;
    });
  }

  stringifyActivity(activity: Activity) {
    return btoa(JSON.stringify(activity));
  }
}
