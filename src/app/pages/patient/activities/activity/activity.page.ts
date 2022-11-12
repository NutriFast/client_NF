import { Component, OnInit } from '@angular/core';
import { Activity } from '../list/list-activities.page';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.page.html',
  styleUrls: ['./activity.page.scss'],
})
export class ActivityPage implements OnInit {
  mockedActivity: Activity = { icon: 'walk-outline', name: 'Correr', daysPerWeek: 1, hoursPerDay: 2 };
  path = '/tabs/activities';

  constructor() { }

  ngOnInit() {
  }

}
