import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PatientPage } from './patient.page';
import { ExploreContainerComponentModule } from '../../../components/explore-container/explore-container.module';

import { PatientPageRoutingModule } from './patient-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    PatientPageRoutingModule
  ],
  declarations: [PatientPage]
})
export class PatientPageModule {}
