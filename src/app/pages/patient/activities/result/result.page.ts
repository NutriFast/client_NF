import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ActivitySchedule } from 'src/app/services/activitySchedule/activity-schedule.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})
export class ResultPage implements OnInit {
  result = 2000;
  path = '/tabs/activities';

  patientId: string;
  patientName: string;
  activitiesSchedule: ActivitySchedule;

  constructor(
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((queryParams: any) => {
      this.patientId = queryParams.id;
      this.patientName = queryParams.name;

      this.activitiesSchedule = JSON.parse(atob(queryParams.schedule));

      console.log({activitiesSchedule: this.activitiesSchedule});
    });
  }
}
