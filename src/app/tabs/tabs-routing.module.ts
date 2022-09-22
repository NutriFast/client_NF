import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../pages/home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'patients',
        loadChildren: () => import('../pages/patients/patients.module').then(m => m.PatientsPageModule)
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
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
