import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActivityDetail } from '../list/list-activities.page';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.page.html',
  styleUrls: ['./activity.page.scss'],
})
export class ActivityPage implements OnInit {
  patientId: string;
  patientName: string;
  isEdit: boolean;
  activity: ActivityDetail;

  activitiesPath = '/tabs/activities';
  selectActivityPath = '/tabs/select';

  constructor(
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((queryParams: any) => {
      this.patientId = queryParams.id;
      this.patientName = queryParams.name;

      this.isEdit = queryParams.isEdit;

      this.activity = JSON.parse(atob(queryParams.activity));
    });
  }
}
