import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
  isLoading = true;

  constructor(
    private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((queryParams: any) => {
      this.patientId = queryParams.id;

      if(this.patientId) {
        this.clientService.getClient(this.patientId).subscribe((patient: Patient) => {
          console.log({patient});
          if(patient) {
            this.patient = patient;
            this.isLoading = false;
          } else {
            this.isLoading = false;
            this.router.navigateByUrl('/tabs/list');
          }
        });
      } else {
        this.isLoading = false;
        this.router.navigateByUrl('/tabs/list');
      }
    });
  }
}
