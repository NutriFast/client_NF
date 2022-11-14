import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Activity } from '../list/list-activities.page';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.page.html',
  styleUrls: ['./activity.page.scss'],
})
export class ActivityPage implements OnInit {
  activity: Activity;
  patientId: string;
  patientName: string;

  activitiesPath = '/tabs/activities';

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((queryParams: any) => {
      this.patientId = queryParams.id;
      this.patientName = queryParams.name;

      this.activity = JSON.parse(atob(queryParams.activity));
    });
  }
}
