import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  // TODO: AJUSTAR HIERARQUIA DAS ROTAS
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'list',
        loadChildren: () => import('../pages/patient/list/list-patients.module').then(m => m.ListPatientsModule)
      },
      {
        path: 'patient',
        loadChildren: () => import('../pages/patient/patient/patient.module').then(m => m.PatientPageModule)
      },
      {
        path: 'new',
        loadChildren: () => import('../pages/patient/new/new.module').then(m => m.NewPageModule)
      },
      {
        path: 'config',
        loadChildren: () => import('../pages/config/config.module').then(m => m.ConfigPageModule)
      },
      {
        path: 'nutri',
        loadChildren: () => import('../pages/nutri/nutri.module').then(m => m.NutriPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/list',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/list',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
