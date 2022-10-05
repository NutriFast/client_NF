import { IonicModule } from '@ionic/angular';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PatientPage } from './patient.page';

import { PatientPageRoutingModule } from './patient-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    PatientPageRoutingModule
  ],
  declarations: [PatientPage]
})
export class PatientPageModule {}
