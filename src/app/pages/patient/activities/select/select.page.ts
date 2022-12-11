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

        this.activities = this.activities.sort((a, b) => a.name.localeCompare(b.name));
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

  setIconByActivity(activityName: string) {
    const listBarbellIcon = [
      'Exercício de academia (Geral)',
      'Levantamento de peso (Vigoroso)',
      'Calistenia/Exercício de casa (Leve ou Moderado)',
      'Calistenia (Vigoroso)'
    ];

    const listBicycleIcon = [
      'Bicicleta ergométrica (Moderado)',
      'Bicicleta ergométrica (Vigoroso)',
      'Bicicleta ergométrica (Suave)',
      'Bicicleta ergométrica (Muito Vigoroso)'
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
      'Atividads Domesticas - Varrer',
      'Atividads Domesticas - Implicando ficar em pé'
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
