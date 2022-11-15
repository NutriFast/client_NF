import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListActivitiesPageRoutingModule } from './list-activities-routing.module';

import { ListActivitiesPage } from './list-activities.page';

import { ActivityCardModule } from 'src/app/components/activity-card/activity-card.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActivityCardModule,
    ListActivitiesPageRoutingModule
  ],
  declarations: [ListActivitiesPage]
})
export class ListActivitiesPageModule {}
