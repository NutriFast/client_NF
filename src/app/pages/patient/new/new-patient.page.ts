import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

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

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private clientService: ClientService,
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
    console.log(this.form);
    this.route.queryParams.subscribe(() => {
      this.form.reset({});

      this.firstStep = this.setFirstStep();
      this.lastStep = this.setLastStep();

      this.currentStep = this.firstStep;
    });
  }

  submit() {
    console.log(this.form.value);

    this.clientService.postClient(this.form.value).subscribe(createdClient => {
      console.log(createdClient);
    });
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
