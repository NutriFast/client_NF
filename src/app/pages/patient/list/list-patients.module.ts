import { IonicModule } from '@ionic/angular';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ListPatientsPage } from './list-patients.page';
import { ListPatientsRoutingModule } from './list-patients-routing.module';

import { CardComponentModule } from 'src/app/components/card/card.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    CardComponentModule,
    ListPatientsRoutingModule
  ],
  declarations: [ListPatientsPage]
})
export class ListPatientsModule {}
