import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { AlertController } from '@ionic/angular';

import { ClientService } from 'src/app/services/client/client.service';

import { Patient } from '../list/list-patients.page';

@Component({
  selector: 'app-patient',
  templateUrl: 'patient.page.html',
  styleUrls: ['patient.page.scss']
})
export class PatientPage implements OnInit {
  patient: Patient;
  patientId: string;
  patientName: string;
  patientAge: number;

  isLoading: boolean;
  isEditing: boolean;

  form: FormGroup;

  activitiesPath = '/tabs/activities';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private clientService: ClientService,
    private formBuilder: FormBuilder,
    private alertController: AlertController
  ) {
    this.form = this.formBuilder.group({
      name: new FormControl(),
      weight: new FormControl(),
      height: new FormControl(),
      gender: new FormControl(),
      birthDate: new FormControl()
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe((queryParams: any) => {
      this.form.reset({});

      this.isLoading = true;
      this.isEditing = false;

      this.patientId = queryParams.id;
      this.patientName = queryParams.name;

      if(this.patientId) {
        /* this.clientService.getClient(this.patientId).subscribe((patient: Patient) => {
          console.log({patient});
          this.isLoading = false;

          if(patient) {
            this.patient = patient;
          } else {
            this.router.navigateByUrl('/tabs/list');
          }
        }); */

        this.clientService.getClients().subscribe((patients: Array<Patient>) => {
          if(patients) {
            this.patient = patients.find((patient) => patient.id === this.patientId);

            this.form.patchValue({
              name: this.patient.name,
              weight: this.patient.weight,
              height: this.patient.height,
              gender: this.patient.gender,
              birthDate: this.patient.birthDate
            });

            console.log({thisPatient: this.patient});
          }

          this.patientAge = this.getAgeByBirthDate(this.patient.birthDate);

          this.isLoading = false;
        });
      } else {
        /* this.router.navigateByUrl('/tabs/list'); */
      }
    });
  }

  setIsEditing() {
    this.isEditing = !this.isEditing;
  }

  async showConfirmAlert() {
    const name = this.form.value.name;
    const formatedBirthDate = this.getFormatedBirthDate(this.form.value.birthDate);
    const weight = this.form.value.weight;
    const height = this.form.value.height;
    const gender = this.form.value.gender;

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
      message: `Nome: ${name ? name : 'vazio!'},
                Data de Nascimento: ${formatedBirthDate},
                Peso: ${weight ? weight + ' kg' : 'vazio!'},
                Altura: ${height ? height + ' m' : 'vazio!'},
                Gênero: ${gender ? gender : 'vazio!'}`,
    });

    await alert.present();
  }

  submit() {
    console.log({formValue: this.form.value});
    this.isLoading = true;

    const client = {
      id: this.patient.id,
      userId: this.patient.userId,
      name: this.form.value.name,
      birthDate: this.form.value.birthDate,
      gender: this.form.value.gender,
      height: this.form.value.height,
      weight: this.form.value.weight
    };

    console.log({client});

    this.clientService.updateClient(client).subscribe((createdClient: Patient) => {
      console.log({createdClient});
      if(createdClient) {
        this.patient = createdClient;
        this.patientAge = this.getAgeByBirthDate(this.patient.birthDate);
      }

      this.isLoading = false;
      this.isEditing = false;
    });
  }

  async showCreatedAlert() {
    const alert = await this.alertController.create({
      header: 'Paciente editado com sucesso!',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
        },
      ],
    });

    await alert.present();
  }

  getFormatedBirthDate(birthDate: string) {
    return new Date(birthDate).toLocaleDateString();
  }

  getAgeByBirthDate(birthDate: string) {
    const todaysDate = new Date();
    const convertedBirthDate = new Date(birthDate);

    const diferenceInYears = todaysDate.getFullYear() - convertedBirthDate.getFullYear();
    const diferenceInMonths = todaysDate.getMonth() - convertedBirthDate.getMonth();

    if (diferenceInMonths < 0 || (diferenceInMonths === 0 && todaysDate.getDate() < convertedBirthDate.getDate())) {
      return diferenceInYears - 1;
    } else {
      return diferenceInYears;
    }
  }
}
