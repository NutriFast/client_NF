import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mockedPatients, Patient } from '../list/list-patients.page';

@Component({
  selector: 'app-patient',
  templateUrl: 'patient.page.html',
  styleUrls: ['patient.page.scss']
})
export class PatientPage implements OnInit {
  patients: Array<Patient> = mockedPatients;
  patient: Patient;
  patientId: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe((queryParams: any) => {
      this.patient = this.patients.find((patient: Patient) => patient.id === queryParams.id);
    });
  }
}
