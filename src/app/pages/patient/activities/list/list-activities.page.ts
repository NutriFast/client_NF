import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActivityService } from 'src/app/services/activity/activity.service';
import { ActivityResult, ActivitySchedule, ActivityScheduleService } from 'src/app/services/activitySchedule/activity-schedule.service';
import { ClientScheduleService } from 'src/app/services/clientSchedule/schedule.service';
export interface ClientSchedule {
  id: string;
  clientId: string;
  createdAt: string;
}

export interface Activity {
  id: string;
  name: string;
  value: number;
}

export interface ActivityDetail extends ActivityResult {
  name: string;
  icon: string;
  value: number;
}

@Component({
  selector: 'app-list',
  templateUrl: './list-activities.page.html',
  styleUrls: ['./list-activities.page.scss'],
})
export class ListActivitiesPage implements OnInit {
  resultPath = '/tabs/result';
  activityPath = '/tabs/activity';
  patientPath = '/tabs/patient';
  selectActivityPath = '/tabs/select';

  patientId: string;
  patientName: string;

  isLoading = false;

  selectedSchedule: ClientSchedule;
  patientActivitiesSchedule: ActivitySchedule;
  activities: Array<Activity>;
  patientActivitiesResult: Array<ActivityDetail>;

  constructor(
    private route: ActivatedRoute,
    private clientScheduleService: ClientScheduleService,
    private activityScheduleService: ActivityScheduleService,
    private activityService: ActivityService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((queryParams: any) => {
      this.isLoading = true;

      this.patientId = queryParams.id;
      this.patientName = queryParams.name;

      // Dar get nas atividades
      // Dar um get no schedule
      // Ver se existe algum
      // Se nao existir cria
      // Se existir da o get no activitySchedule
      // Se nao existir cria

      // Permitir incluir atividade (post activitySchedule)
      // Exibir o resultado no calcular (get activitySchedule)

      this.activityService.getActivities().subscribe((activities: Array<Activity>) => {
        console.log({activities});

        this.activities = activities;

        if(this.patientId != null) {
          this.clientScheduleService.getClientSchedules(this.patientId).subscribe((clientSchedules: Array<ClientSchedule>) => {
            console.log({clientSchedules});

            if(clientSchedules && clientSchedules.length > 0) {
              this.selectedSchedule = clientSchedules[0];

              const activityId = this.selectedSchedule.id;
              this.activityScheduleService.getActivitySchedule(activityId).subscribe((activitySchedule: ActivitySchedule) => {
                console.log({activitySchedule});

                if(activitySchedule) {
                  this.patientActivitiesSchedule = activitySchedule;
                  this.patientActivitiesResult = this.setActivitiesResult(activitySchedule);
                }

                this.isLoading = false;
              });
            } else {
              this.clientScheduleService.postClientSchedule(this.patientId).subscribe((clientSchedule: ClientSchedule) => {
                console.log({clientSchedule});

                if(clientSchedule) {
                  this.selectedSchedule = clientSchedule;

                  const activityId = this.selectedSchedule.id;
                  this.activityScheduleService.getActivitySchedule(activityId).subscribe((activitySchedule: ActivitySchedule) => {
                    console.log({activitySchedule});

                    if(activitySchedule) {
                      this.patientActivitiesSchedule = activitySchedule;
                      this.patientActivitiesResult = this.setActivitiesResult(activitySchedule);
                    }

                    this.isLoading = false;
                  });
                }
              });
            }
          });
        }
      });
    });
  }

  stringifyActivityDetail(activityDetail: ActivityDetail) {
    return btoa(JSON.stringify(activityDetail));
  }

  stringifyActivitySchedule(activitySchedule: ActivitySchedule) {
    return btoa(JSON.stringify(activitySchedule));
  }

  stringifySchedule(clientSchedule: ClientSchedule) {
    return btoa(JSON.stringify(clientSchedule));
  }

  setActivitiesResult(activitySchedule: ActivitySchedule): Array<ActivityDetail> {
    const patientActivitiesResult = activitySchedule.result.map(activityResult => {
      const relatedActivity = this.activities.find(activity => activity.id === activityResult.activityId);

      const formatedActivityDetail: ActivityDetail = {
        ...activityResult,
        name: relatedActivity.name,
        value: relatedActivity.value,
        icon: this.setIconByActivity(relatedActivity.name)
      };

      return formatedActivityDetail;
    });

    return patientActivitiesResult;
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
