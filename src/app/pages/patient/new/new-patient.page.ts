import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AlertController } from '@ionic/angular';

import { ClientService } from 'src/app/services/client/client.service';

export interface Step {
  id: number;
  title: string;
}

@Component({
  selector: 'app-new',
  templateUrl: './new-patient.page.html',
  styleUrls: ['./new-patient.page.scss'],
})
export class NewPatientPage implements OnInit {
  isLoading = false;

  form: FormGroup;
  steps: Array<Step> = [
    {
      id: 1,
      title: 'Qual o nome do seu paciente?',
    },
    {
      id: 2,
      title: 'Data de nascimento',
    },
    {
      id: 3,
      title: 'Mais alguns dados',
    },
    {
      id: 4,
      title: 'Gênero',
    },
  ];
  currentStep: Step;
  firstStep: Step;
  lastStep: Step;

  handlerMessage = '';
  roleMessage = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private clientService: ClientService,
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
    this.route.queryParams.subscribe(() => {
      this.form.reset({});

      this.firstStep = this.setFirstStep();
      this.lastStep = this.setLastStep();

      this.currentStep = this.firstStep;
    });
  }

  async showConfirmAlert() {
    const formatedBirthDate = new Date(this.form.value.birthDate).toLocaleDateString();
    const name = this.form.value.name;
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
    console.log(this.form.value);
    this.isLoading = true;

    this.clientService.postClient(this.form.value).subscribe(createdClient => {
      console.log(createdClient);
      if(createdClient) {
        this.showCreatedAlert();
        this.router.navigateByUrl('/tabs/list');
      }

      this.isLoading = false;
    });
  }

  async showCreatedAlert() {
    const alert = await this.alertController.create({
      header: 'Paciente criado com sucesso!',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
        },
      ],
    });

    await alert.present();
  }

  setFirstStep() {
    return this.steps[0];
  }

  setLastStep() {
    return this.steps[this.steps.length - 1];
  }

  nextStep() {
    if(!this.checkIsLastStep()) {
      this.currentStep = this.steps.find(step => step.id === this.currentStep.id + 1);
    }
  }

  previousStep() {
    if(!this.checkIsFirstStep()) {
      this.currentStep = this.steps.find(step => step.id === this.currentStep.id - 1);
    }
  }

  checkIsFirstStep() {
    return this.currentStep.id === this.firstStep.id;
  }

  checkIsLastStep() {
    return this.currentStep.id === this.lastStep.id;
  }
}
