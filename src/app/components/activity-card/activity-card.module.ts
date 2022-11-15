import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActivityCardComponent} from './activity-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  declarations: [
    ActivityCardComponent,
  ],
  exports: [
    ActivityCardComponent,
  ]
})
export class ActivityCardModule {}
