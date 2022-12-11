import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { ActivityDetail } from '../list/list-activities.page';
import { AlertController } from '@ionic/angular';
import { ActivityScheduleService } from 'src/app/services/activitySchedule/activity-schedule.service';
import { ClientScheduleService } from 'src/app/services/clientSchedule/schedule.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.page.html',
  styleUrls: ['./activity.page.scss'],
})
export class ActivityPage implements OnInit {
  activity: ActivityDetail;
  scheduleId: string;

  patientId: string;
  patientName: string;
  isEdit: boolean;
  isLoading: boolean;

  activitiesPath = '/tabs/activities';
  selectActivityPath = '/tabs/select';

  form: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private clientScheduleService: ClientScheduleService,
    private activityScheduleService: ActivityScheduleService
  ) {
    this.form = this.formBuilder.group({
      duration: new FormControl(),
      freequency: new FormControl(),
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe((queryParams: any) => {
      this.form.reset({});

      this.patientId = queryParams.id;
      this.patientName = queryParams.name;

      this.activity = JSON.parse(atob(queryParams.activity));
      this.scheduleId = queryParams.scheduleId;

      console.log({thisActivity: this.activity});

      this.isEdit = queryParams.isEdit;

      if(this.isEdit) {
        this.form.patchValue({
          duration: this.activity.duration,
          freequency: this.activity.freequency,
        });
      }
    });
  }

  async showConfirmAlert() {
    const duration = this.form.value.duration;
    const freequency = this.form.value.freequency;

    if(!freequency) {
      this.showErrorAlert('Favor preencher o campo Dias / Semana');
    } else if (!duration) {
      this.showErrorAlert('Favor preencher o campo Horas / Dia');
    } else {
      const alert = await this.alertController.create({
        header: 'Revise antes de enviar!',
        buttons: [
          {
            text: 'Voltar',
            role: 'cancel',
          },
          {
            text: 'Enviar',
            role: 'confirm',
            handler: () => {
              this.submit();
            },
          },
        ],
        message: `Atividade: ${this.activity.name}
                  Dias / Semana: ${duration ? duration : 'vazio!'},
                  Horas / Dia: ${freequency ? freequency : 'vazio!'}`,
      });

      await alert.present();
    }
  }

  submit() {
    console.log({formValue: this.form.value});
    this.isLoading = true;

    if(this.isEdit) {
      /* const activity = {
        ...this.form.value,
        id: this.activity.id,
        scheduleId: this.scheduleId
      };

      console.log(activity);

      this.clientScheduleService.updateActivityFromClientSchedule(activity.id, activity).subscribe(editedActivity => {
        console.log({editedActivity});
        if(editedActivity) {
          this.showEditedActivityAlert();
        }

        this.isLoading = false;
      }); */

      this.showNotAvailableAlert();
    } else {
      const newActivity = {
        ...this.form.value,
        activityId: this.activity.id,
        scheduleId: this.scheduleId
      };

      console.log({newActivity});

      this.activityScheduleService.postActivitySchedule(this.patientId, newActivity).subscribe(includedActivity => {
        console.log({includedActivity});
        if(includedActivity) {
          this.showIncludedActivityAlert();
        }

        this.isLoading = false;
      });
    }
  }

  async showIncludedActivityAlert() {
    const alert = await this.alertController.create({
      header: 'Atividade incluída com sucesso!',
      buttons: [
        {
          text: 'Ok',
          role: 'confirm',
          handler: () => {
            this.goBackToPatientActivities();
          },
        },
      ],
    });

    await alert.present();
  }

  async showEditedActivityAlert() {
    const alert = await this.alertController.create({
      header: 'Atividade editada com sucesso!',
      buttons: [
        {
          text: 'Ok',
          role: 'confirm',
          handler: () => {
            this.goBackToPatientActivities();
          },
        },
      ],
    });

    await alert.present();
  }

  goBackToPatientActivities() {
    this.router.navigateByUrl(
      this.router.createUrlTree(
        ['tabs/activities'], {
          queryParams: { id: this.patientId, name: this.patientName},
        }
      )
    );
  }

  async showErrorAlert(msg: string) {
    const alert = await this.alertController.create({
      header: msg,
      buttons: [
        {
          text: 'Voltar',
          role: 'confirm'
        },
      ],
    });

    await alert.present();
  }

  async showDeleteAlert() {
    const alert = await this.alertController.create({
      header: 'Atenção! Deseja mesmo excluir essa atividade?',
      buttons: [
        {
          text: 'Não',
          role: 'confirm'
        },
        {
          text: 'Sim',
          role: 'confirm',
          handler: () => {
            this.submitDelete();
          },
        },
      ],
    });

    await alert.present();
  }

  submitDelete() {
    this.isLoading = true;

    /* this.clientScheduleService.deleteActivityFromClientSchedule(this.activity.id).subscribe(_ => {
      this.goBackToPatientActivities();
      this.isLoading = false;
    }); */
    this.showNotAvailableAlert();
  }

  async showNotAvailableAlert() {
    const alert = await this.alertController.create({
      header: 'Infelizmente essa funcionalidade não está disponível no momento.',
      buttons: [
        {
          text: 'Ok',
          role: 'confirm',
          handler: () => {
            this.isLoading = false;
          },
        }
      ],
    });

    await alert.present();
  }
}
