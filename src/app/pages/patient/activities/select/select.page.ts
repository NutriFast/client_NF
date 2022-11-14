import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActivityService } from 'src/app/services/activity/activity.service';
import { Activity } from '../list/list-activities.page';

@Component({
  selector: 'app-select',
  templateUrl: './select.page.html',
  styleUrls: ['./select.page.scss'],
})
export class SelectPage implements OnInit {
  activities: Array<Activity> = [];
  isLoading: boolean;

  activitiesPath = '/tabs/activities';

  patientId: string;
  patientName: string;

  constructor(
    private route: ActivatedRoute,
    private activityService: ActivityService,
  ) { }

  ngOnInit() {
    this.isLoading = true;

    this.route.queryParams.subscribe((queryParams: any) => {
      this.patientId = queryParams.id;
      this.patientName = queryParams.name;

      this.activityService.getActivities().subscribe((activities: Array<Activity>) => {
        console.log({activities});
        if(activities) {
          activities.map((activity) => {
            if(!this.activities.find((oldActivity) => oldActivity.id === activity.id)) {
              this.activities.push({ ...activity, icon: this.setIconByActivity(activity.name) });
            }
          });
        }

        this.isLoading = false;
      });
    });
  }

  setIconByActivity(name: string) {
    if(name === 'Academia') {
      return 'barbell-outline';
    } else if (name === 'Correr') {
      return 'walk-outline';
    } else if (name === 'Ciclismo') {
      return 'bicycle-outline';
    } else if (name === 'Dormir') {
      return 'bed-outline';
    } else {
      return 'alert-circle-outline';
    }
  }
}
