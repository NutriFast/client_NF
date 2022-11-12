import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectPageRoutingModule } from './select-routing.module';

import { SelectPage } from './select.page';

import { ActivityCardComponent } from 'src/app/components/activity-card/activity-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectPageRoutingModule
  ],
  declarations: [SelectPage, ActivityCardComponent]
})
export class SelectPageModule {}
