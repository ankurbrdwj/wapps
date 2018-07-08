import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TdDialogService} from '@covalent/core';

import {Campaign} from '../campaign';
import {CampaignService} from '../campaign.service';

@Component({
  selector: 'app-campaigns-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  data: Campaign[];
  campaigns: Campaign[];
  isLoading: boolean;
  isArchive: boolean;
  canCreate: boolean;

  constructor(
    private _dialogService: TdDialogService,
    private _campaignService: CampaignService,
    private _route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this._route.queryParams.subscribe(params => {
      this.isLoading = true;
      this.isArchive = params['archive'] ? true : false;
      this.data = [];
      this.campaigns = this.data;
      // get campaigns
      this._campaignService.getAll(this.isArchive).subscribe(
        data => {
          this.data = data;
          this.campaigns = this.data;
        },
        error => {
          this._dialogService.openAlert({message: error});
          this.isLoading = false;
        },
        () => {
          /* onComplete */
          setTimeout(() => {
            this.isLoading = false;
          }, 800);
        }
      );
    });
  }

  onSearch(search: string = '') {
    search = search.toLowerCase();
    this.campaigns = this.data.filter((campaign: Campaign) => {
      return (
        campaign.name.toLowerCase().indexOf(search) > -1 ||
        campaign.description.toLowerCase().indexOf(search) > -1
      );
    });
  }
}
