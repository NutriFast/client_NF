import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PatientsPage } from './patients.page';
import { ExploreContainerComponentModule } from '../../components/explore-container/explore-container.module';

import { PatientsPageRoutingModule } from './patients-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    PatientsPageRoutingModule
  ],
  declarations: [PatientsPage]
})
export class PatientsPageModule {}
