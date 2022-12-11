import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  isLoading = true;

  selectedSchedule: ClientSchedule;
  patientActivitiesSchedule: ActivitySchedule;
  activities: Array<Activity>;
  patientActivitiesResult: Array<ActivityDetail>;

  constructor(
    private router: Router,
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

      if(this.patientId) {
        this.activityService.getActivities().subscribe((activities: Array<Activity>) => {
          console.log({activities});

          this.activities = activities;

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
        });
      } else {
        /* this.router.navigateByUrl('/tabs/list'); */
      }
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

  setIconByActivity(activityName: string) {
    const listBarbellIcon = [
      'Exercício de academia (Geral)',
      'Levantamento de peso (Vigoroso)',
      'Calistenia/Exercício de casa (Leve ou Moderado)',
      'Calistenia (Vigoroso)'
    ];

    const listBicycleIcon = [
      'Bicicleta ergométrica (Moderado)',
      'Bicicleta ergométrica (Vigoroso)'
    ];

    const listCarIcon = [
      'Dirigir'
    ];

    const listBookIcon = [
      'Estudar'
    ];

    const listBedIcon = [
      'Sono'
    ];

    const listWalkIcon = [
      'Caminhar',
      'Esteira Ergométrica (Geral)'
    ];

    const listCartIcon = [
      'Padaria (Leve)'
    ];

    const listHomeIcon = [
      'Faxinar - limpar pia e banheiro',
      'Faxinar - espanar',
      'Faxinar - limpeza geral (Moderado)',
      'Atividads Domesticas - Varrer'
    ];

    if(listBarbellIcon.includes(activityName)) {
      return 'barbell-outline';
    }else if (listBicycleIcon.includes(activityName)) {
      return 'bicycle-outline';
    }  else if (listCarIcon.includes(activityName)) {
      return 'car-sport-outline';
    } else if (listBookIcon.includes(activityName)) {
      return 'book-outline';
    } else if (listBedIcon.includes(activityName)) {
      return 'bed-outline';
    } else if (listWalkIcon.includes(activityName)) {
      return 'walk-outline';
    } else if (listCartIcon.includes(activityName)) {
      return 'cart-outline';
    } else if (listHomeIcon.includes(activityName)) {
      return 'home-outline';
    }  else {
      return 'alert-circle-outline';
    }
  }
}
