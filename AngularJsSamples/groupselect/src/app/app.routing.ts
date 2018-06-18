import {ModuleWithProviders, NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CampaignsRoutes } from './campaigns/campaigns.routing';


export const appRoutes: Routes = [
    ...CampaignsRoutes,
  { path: '', redirectTo: '/campaigns', pathMatch: 'full' }
];

export const ROUTES: ModuleWithProviders = RouterModule.forRoot(appRoutes);
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
