import {Component} from '@angular/core';
import {Location} from '@angular/common';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';
import {TdDialogService, TdMediaService} from '@covalent/core';
import {CampaignService} from './campaigns/campaign.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  user: string;
  homeUrl: string;
  config = null;

  constructor(
    public _dialogService: TdDialogService,
    public _media: TdMediaService,
    private _iconRegistry: MatIconRegistry,
    private _domSanitizer: DomSanitizer,
    private _campaignService: CampaignService,
  ) {
 /*   this._iconRegistry.addSvgIconInNamespace(
      'assets',
      'logo',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/logo.svg')
    );*/
  /*  _campaignService.BaseUrl = `http://localhost:4200`;
    _campaignService.Token = null;*/
  }

  onLogout(): void {
  }

  onAbout(): void {
    this._dialogService.openAlert({
      message: 'The current version is: ' + this.config.version || '1.0.0',
      closeButton: 'OK'
    });
  }

  onHelp(): void {
    window.open(this.config.helpUrl || 'https://support.aristocratgaming.com/', '_blank');
  }
}
