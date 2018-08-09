import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TdDialogService} from '@covalent/core';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import {Campaign} from '../campaign';
import {CampaignService} from '../campaign.service';

@Component({
  selector: 'app-campaigns-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  id: string;
  data: Campaign[];
  campaigns: Campaign[];
  isLoading: boolean;
  isArchive: boolean;
  canArchive: boolean;
  canUpdate: boolean;
  canCreate: boolean;
  dialogSubscription: any;
  archiveSubscription: any;
  campaignSubscription: any;
  displayedColumns = ['name', 'description', 'status', 'view'];
  dataSource = new MatTableDataSource<Campaign>(this.data);

  paginator: MatPaginator;
  sort: MatSort;
  sortActive: string;
  sortDir: string;

  constructor(
    private _dialogService: TdDialogService,
    private _campaignService: CampaignService,
    private _route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this._route.queryParams.subscribe(params => {
      this.isArchive = params['archive'] ? true : false;
      this.data = [];
      this.campaigns = this.data;
      this.sortActive = '';

      this.canCreate = true;
      this.canArchive = true;
      this.canUpdate = true;
      this.getCampaigns();
    });
  }

  ngOnDestroy() {
    if (this.dialogSubscription) {
      this.dialogSubscription.unsubscribe();
    }
    if (this.archiveSubscription) {
      this.archiveSubscription.unsubscribe();
    }
    if (this.campaignSubscription) {
      this.campaignSubscription.unsubscribe();
    }
  }

  applyFilter(filterValue: string) {
    if (filterValue || filterValue === '') {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
      this.dataSource.filter = filterValue;
    }
  }

  // Clear the filter on cancel
  clearData() {
    this.dataSource.filter = '';
  }

  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onArchive(campaignId: string) {
    this.isLoading = true;
    this.sortActive = '';
    this.archiveSubscription = this._campaignService
      .archive(campaignId)
      .subscribe(response => {
          this.getCampaigns();
        }, error => {
          this.isLoading = false;
          this._dialogService.openAlert({message: error});
        },
        () => {
          setTimeout(() => {
            this.isLoading = false;
          }, 800);
        });
  }

  sortData(sort: MatSort) {
    this.sortActive = sort.active;
    this.sortDir = sort.direction;
  }


  openDialog(campaignId: string, campaignName: string) {
    this.dialogSubscription = this._dialogService.openConfirm({
      message: 'Do you want to archive the Campaign: ' + campaignName.substring(0, 40),
      acceptButton: 'Confirm'
    }).afterClosed().subscribe(result => {
      if (result) {
        this.onArchive(campaignId);
      }
    });
  }

  // get campaigns
  getCampaigns() {
    this.isLoading = true;
    this.campaignSubscription = this._campaignService.getAll(this.isArchive).subscribe(
      data => {
        this.data = data;
        this.campaigns = this.data;
        this.dataSource.data = this.data;
        this.dataSource.filter = '';
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
  }

}

