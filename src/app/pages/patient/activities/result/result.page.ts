import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ActivitySchedule } from 'src/app/services/activitySchedule/activity-schedule.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})
export class ResultPage implements OnInit {
  path = '/tabs/activities';

  patientId: string;
  patientName: string;
  activitiesSchedule: ActivitySchedule;

  statusTextColor: string;

  constructor(
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((queryParams: any) => {
      this.patientId = queryParams.id;
      this.patientName = queryParams.name;

      const parsedActivitySchedule = JSON.parse(atob(queryParams.schedule));

      this.activitiesSchedule = parsedActivitySchedule;

      this.setColorByStatus(this.activitiesSchedule.status);
      console.log({activitiesSchedule: this.activitiesSchedule});
      console.log({statusTextColor: this.statusTextColor});

    });
  }

  setColorByStatus(status: string) {
    if(status === 'Sedentário' || status === 'Pouco Ativo') {
      this.statusTextColor = '#ffd534';
    } else if(status === 'Numero insuficiente de atividades') {
      this.statusTextColor = '#ff4961';
    } else {
      this.statusTextColor = '#2C9042';
    }
  }
}
