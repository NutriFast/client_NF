import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewPatientPageRoutingModule } from './new-patient-routing.module';

import { NewPatientPage } from './new-patient.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    NewPatientPageRoutingModule
  ],
  declarations: [NewPatientPage]
})
export class NewPatientPageModule {}
