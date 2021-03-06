import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {CdkTableModule} from '@angular/cdk/table';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatButtonModule, MatCardModule, MatCommonModule, MatIconModule, MatListModule,
  MatInputModule, MatSelectModule,  MatTooltipModule,
  MatMenuModule, MatNativeDateModule, MatSnackBarModule, MatTableModule, MatPaginatorModule, MatGridListModule
} from '@angular/material';
import {HttpModule} from '@angular/http';
import {CovalentDialogsModule, CovalentLayoutModule, CovalentLoadingModule, CovalentMediaModule} from '@covalent/core';
import {CampaignsModule} from './campaigns/campaigns.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppRoutingModule, ROUTES} from './app.routing';
import { FakeBackendInterceptor, fakeBackendProvider} from './fakeBackend.service';
import {JwtInterceptor} from './jwt.interceptor';

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
    ROUTES,
    CampaignsModule,
    MatTooltipModule,
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
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true
  },
    fakeBackendProvider],
    bootstrap: [AppComponent]
})
  export class AppModule {
}
