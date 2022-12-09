import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActivityService } from 'src/app/services/activity/activity.service';
import { ActivitySchedule } from 'src/app/services/activitySchedule/activity-schedule.service';
import { ActivityDetail, ClientSchedule } from '../list/list-activities.page';

@Component({
  selector: 'app-select',
  templateUrl: './select.page.html',
  styleUrls: ['./select.page.scss'],
})
export class SelectPage implements OnInit {
  activities: Array<ActivityDetail> = [];
  scheduleId: string;
  isLoading: boolean;

  activitiesPath = '/tabs/activities';
  activityPath = '/tabs/activity';

  patientId: string;
  patientName: string;

  constructor(
    private route: ActivatedRoute,
    private activityService: ActivityService,
  ) {}

  ngOnInit() {
    this.isLoading = true;

    this.route.queryParams.subscribe((queryParams: any) => {
      this.patientId = queryParams.id;
      this.patientName = queryParams.name;
      this.scheduleId = queryParams.scheduleId;

      this.activityService.getActivities().subscribe((activities: Array<ActivityDetail>) => {
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

  stringifyActivityDetail(activityDetail: ActivityDetail) {
    return btoa(JSON.stringify(activityDetail));
  }

  stringifySchedule(clientSchedule: ClientSchedule) {
    return btoa(JSON.stringify(clientSchedule));
  }

  setIconByActivity(name: string) {
    if(name === 'Academia') {
      return 'barbell-outline';
    }else if (name === 'Ciclismo') {
      return 'bicycle-outline';
    }  else if (name === 'Dirigir') {
      return 'car-sport-outline';
    } else if (name === 'Estudar') {
      return 'book-outline';
    } else if (name === 'Dormir' || name === 'Sono') {
      return 'bed-outline';
    } else if (name === 'Correr' || name === 'Caminhar') {
      return 'walk-outline';
    } else {
      return 'alert-circle-outline';
    }
  }

  filterActivities(event: any) {
    this.isLoading = true;
    const filterParam = event.target.value;
    console.log({filterParam});

    this.activities = [];
    this.activityService.getFilteredActivities(filterParam).subscribe((activities: Array<ActivityDetail>) => {
      console.log({filteredPatients: activities});
      if(activities) {
        activities.map((activity) => {
          if(!this.activities.find((oldActivity) => oldActivity.id === activity.id)) {
            this.activities.push({ ...activity, icon: this.setIconByActivity(activity.name) });
          }
        });
      }

      this.isLoading = false;
    });
  }
}
