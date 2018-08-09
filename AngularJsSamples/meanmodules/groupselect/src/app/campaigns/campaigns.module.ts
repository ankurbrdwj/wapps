import {ModuleWithProviders, NgModule} from '@angular/core';
import {CdkTableModule} from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatCommonModule,
  MatIconModule,
  MatListModule,
  MatInputModule,
  MatSelectModule,
  MatCheckboxModule,
  MatProgressBarModule,
  MatGridListModule,
  MatPaginatorModule,
  MatTableModule,
  MatMenuModule,
  MatNativeDateModule,
  MatSnackBarModule,
  MatTooltipModule,
  MatSortModule
} from '@angular/material';
import { CovalentChipsModule, CovalentCommonModule, CovalentDialogsModule, CovalentFileModule, CovalentSearchModule } from '@covalent/core';
import { CampaignService } from './campaign.service';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';
import { ItemComponent } from './item/item.component';
import {fakeBackendProvider} from '../fakeBackend.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {JwtInterceptor} from '../jwt.interceptor';

@NgModule({
  declarations: [
    FormComponent,
    ItemComponent,
    ListComponent
  ],
  imports: [
    CdkTableModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatSelectModule,
    MatCommonModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatGridListModule,
    MatPaginatorModule,
    MatTableModule,
    CovalentChipsModule,
    CovalentCommonModule,
    CovalentDialogsModule,
    CovalentFileModule,
    CovalentSearchModule,
    MatTooltipModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [CampaignService,
    { provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    fakeBackendProvider]
})

export class CampaignsModule {}
