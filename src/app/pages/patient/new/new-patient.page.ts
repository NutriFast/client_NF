import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface Step {
  id: number;
  title: string;
}

@Component({
  selector: 'app-new',
  templateUrl: './new-patient.page.html',
  styleUrls: ['./new-patient.page.scss'],
})
export class NewPatientPage implements OnInit {
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
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(() => {
      this.firstStep = this.setFirstStep();
      this.lastStep = this.setLastStep();

      this.currentStep = this.firstStep;
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
