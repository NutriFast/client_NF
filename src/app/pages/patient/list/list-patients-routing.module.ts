import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPatientsPage } from './list-patients.page';

const routes: Routes = [
  {
    path: '',
    component: ListPatientsPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListPatientsRoutingModule {}
