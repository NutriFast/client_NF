import { IonicModule } from '@ionic/angular';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PatientPage } from './patient.page';

import { PatientPageRoutingModule } from './patient-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PatientPageRoutingModule
  ],
  declarations: [PatientPage]
})
export class PatientPageModule {}
