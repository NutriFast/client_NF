import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Activity } from '../list/list-activities.page';

@Component({
  selector: 'app-select',
  templateUrl: './select.page.html',
  styleUrls: ['./select.page.scss'],
})
export class SelectPage implements OnInit {
  mockedActivities: Array<Activity> = [
    { icon: 'walk-outline', name: 'Correr', daysPerWeek: 0, hoursPerDay: 0 },
    { icon: 'bed-outline', name: 'Dormir', daysPerWeek: 0, hoursPerDay: 0 },
    { icon: 'barbell-outline', name: 'Academia', daysPerWeek: 0, hoursPerDay: 0 },
    { icon: 'bicycle-outline', name: 'Ciclismo', daysPerWeek: 0, hoursPerDay: 0 },
  ];
  activitiesPath = '/tabs/activities';

  patientId: string;
  patientName: string;

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((queryParams: any) => {
      this.patientId = queryParams.id;
      this.patientName = queryParams.name;
    });
  }
}
