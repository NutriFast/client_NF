import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientPage } from './patient.page';

const routes: Routes = [
  {
    path: '',
    component: PatientPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientPageRoutingModule {}
