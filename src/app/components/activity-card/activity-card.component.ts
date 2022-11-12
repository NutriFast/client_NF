import { Component, Input, OnInit } from '@angular/core';

import { Activity } from 'src/app/pages/patient/activities/list/list-activities.page';

@Component({
  selector: 'app-activity-card',
  templateUrl: './activity-card.component.html',
  styleUrls: ['./activity-card.component.scss'],
})
export class ActivityCardComponent implements OnInit {
  @Input() activity: Activity;
  @Input() isEdit: boolean;

  constructor() { }

  ngOnInit() {}

}
