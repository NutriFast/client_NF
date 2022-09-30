import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  // TODO: AJUSTAR HIERARQUIA DAS ROTAS
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'list',
        loadChildren: () => import('../pages/patient/list/list-patients.module').then(m => m.ListPatientsModule),
        canLoad: [AuthGuard]
      },
      {
        path: 'patient',
        loadChildren: () => import('../pages/patient/patient/patient.module').then(m => m.PatientPageModule),
        canLoad: [AuthGuard]
      },
      {
        path: 'new',
        loadChildren: () => import('../pages/patient/new/new.module').then(m => m.NewPageModule),
        canLoad: [AuthGuard]
      },
      {
        path: 'config',
        loadChildren: () => import('../pages/config/config.module').then(m => m.ConfigPageModule),
        canLoad: [AuthGuard]
      },
      {
        path: 'nutri',
        loadChildren: () => import('../pages/nutri/nutri.module').then(m => m.NutriPageModule),
        canLoad: [AuthGuard]
      },
      {
        path: '',
        redirectTo: '/tabs/list',
        pathMatch: 'full',
        canLoad: [AuthGuard]
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/list',
    pathMatch: 'full',
    canLoad: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
