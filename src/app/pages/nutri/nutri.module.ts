import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NutriPageRoutingModule } from './nutri-routing.module';
import { NutriPage } from './nutri.page';
import { ActivityCardModule } from '../../components/activity-card/activity-card.module';

@NgModule({
    declarations: [NutriPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        NutriPageRoutingModule,
        ActivityCardModule
    ]
})
export class NutriPageModule {}
