import {RouterModule, Routes} from '@angular/router';
import { ListComponent } from './list/list.component';
import { ItemComponent } from './item/item.component';
import {NgModule} from '@angular/core';

export const CampaignsRoutes: Routes = [
    // map '/campaigns' to campaign list component
    {
        path: 'campaigns',
        component: ListComponent,
        // canActivate: [PermissionGuard],
    },
    // map '/campaigns/create' to campaign item component
    {
        path: 'campaigns/create',
        component: ItemComponent,
        // canActivate: [PermissionGuard],
    },
    // map '/campaigns/:id' to campaign item component
    {
        path: 'campaigns/:id',
        component: ItemComponent,
       // canActivate: [PermissionGuard],
    },
    // map '/campaigns/:id/edit' to campaign item component
    {
        path: 'campaigns/:id/edit',
        component: ItemComponent,
        // anActivate: [PermissionGuard],
    },
    // map '/' to '/campaigns' as our default route
    {
        path: '',
        redirectTo: '/campaigns',
        pathMatch: 'full'
    }
];
@NgModule({
  imports: [
    RouterModule.forChild(CampaignsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class CampaignsRoutingModule {
}
