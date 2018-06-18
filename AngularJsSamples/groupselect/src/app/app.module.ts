import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {CdkTableModule} from '@angular/cdk/table';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatCommonModule, MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule,
  MatSelectModule, MatSnackBarModule, MatTableModule
} from '@angular/material';
import {HttpModule} from '@angular/http';
import {CovalentDialogsModule, CovalentLayoutModule, CovalentLoadingModule, CovalentMediaModule} from '@covalent/core';
import {CampaignsModule} from './campaigns/campaigns.module';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule, ROUTES} from './app.routing';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CdkTableModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatCommonModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatGridListModule,
    MatPaginatorModule,
    MatTableModule,
    CovalentDialogsModule,
    CovalentLayoutModule,
    CovalentLoadingModule,
    CovalentMediaModule,
    CampaignsModule,
    ROUTES,
    AppRoutingModule
  ],
  exports: [
    HttpClientModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatCommonModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatGridListModule,
    MatPaginatorModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
