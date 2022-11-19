import { Component, Input, OnInit } from '@angular/core';

import { ActivityDetail } from 'src/app/pages/patient/activities/list/list-activities.page';

@Component({
  selector: 'app-activity-card',
  templateUrl: './activity-card.component.html',
  styleUrls: ['./activity-card.component.scss'],
})
export class ActivityCardComponent implements OnInit {
  @Input() activity: ActivityDetail;
  @Input() isEdit: boolean;

  constructor() { }

  ngOnInit() {}

}
