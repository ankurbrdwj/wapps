import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TdLoadingService, TdDialogService, TdFileService, IUploadOptions } from '@covalent/core';
import { MatSnackBar, MatTableDataSource, MatTooltip } from '@angular/material';
import { Campaign, Group, Tier, EligibilityRate, TableElement, Prize } from '../campaign';
import { CampaignService } from '../campaign.service';

@Component({
  selector: 'app-campaign-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  providers: [ TdFileService ]
})
export class ItemComponent implements OnInit, OnDestroy {
  id: string;
  campaign: Campaign;
  groups: Group[];
  tiers: Tier[];
  table: TableElement[];
  dataSource: any;
  displayedColumns: string[];
  groupList: string;
  tierList: string;
  manufacturerList: string;
  csub: any;
  gsub: any;
  tsub: any;

  create: boolean;
  edit: boolean;
  addPrize: boolean;
  addDrawing: boolean;
  showUpload: boolean;
  disableUpload: boolean;
  canArchive: boolean;
  canCreate: boolean;
  canUpdate: boolean;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _loadingService: TdLoadingService,
    private _dialogService: TdDialogService,
    private _fileService: TdFileService,
    private _snackBar: MatSnackBar,
    private _campaignService: CampaignService
  ) { }

  ngOnInit() {

    this.canArchive = true;
    this.canCreate = true;
    this.canUpdate = true;

    this.csub = this._route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
        this.getCampaign();
      } else {
        this.create = true;
        this.edit = true;

        this.campaign = <Campaign> {
          name: null,
          description: null,
          groups: [],
          prizes: [],
          tiers: [],
          eligibilityRate: [],
          manufacturers: [],
          rate: null,
          canRollover: false,
          isArchived: false,
          isAutoDraw: false,
          isAutoNotify: false,
          anticipationDuration: null
        };
      }
    });
    this.gsub = this._campaignService
      .groups()
      .subscribe(
        response => {
          this.groups = response;
          this.convertGroups();
        },
        error => {
          this._dialogService.openAlert({message: error});
        });
    this.tsub = this._campaignService
      .tiers()
      .subscribe(
        response => {
          this.tiers = response;
        },
        error => {
          this._dialogService.openAlert({message: error});
        });
  }

  ngOnDestroy() {
    this.csub.unsubscribe();
    this.gsub.unsubscribe();
    this.tsub.unsubscribe();
  }

  getCampaign() {
    console.log('getting campaign with id: ', this.id);
    let o = this._campaignService
      .get(this.id)
      .subscribe(
        response => {
          this.campaign = response;
          let url = this._route.snapshot.url;
          if (url.length > 0) { this.edit = (url.pop().toString().toLowerCase() === 'edit') } ;
          this.showUpload = this.campaign.canEdit && this.campaign.rulesFilename.length === 0;
          this.convertTiers();
          this.getEligibility();
          this.convertManufacturers();
        },
        error => {
          this._dialogService.openAlert({ message: error });
        });
  }

  convertGroups() {
    let groupList: string[] = [];
    let groupId: string[] = [];
    for (let group of this.groups) {
      groupList.push(group.name);
      groupId.push(group.id);
    }
    let groups: string[] = [];
    for (let group of this.campaign.groups) {
      groups.push(groupList[groupId.indexOf(group)]);
    }
    if (groups.length === 0) {
      this.groupList = '(No Groups)';
    } else {
      this.groupList = groups.join(', ');
    }
  }

  convertTiers() {
    this.tierList = this.campaign.tiers.join(', ');
    if (this.tierList.length === 0) { this.tierList = '(No Tiers)' } ;
  }
  // create table from Campaign Object from Database
  getEligibility() {
    this.displayedColumns = ['name', 'type', 'multiplier'];
    this.table = [];
    let multipliers: any[];
    multipliers = Array.from(new Set(this.campaign.eligibilityRate.map(eligibilityRate => eligibilityRate.rate)));
    for (let row of multipliers) {
      let groupElement = <TableElement>{};
      let tierElement = <TableElement>{};
      let groupNames: string[] = [];
      let tierNames: string[] = [];
      for (let column of this.campaign.eligibilityRate) {
        if (row === column.rate && column.type === 'Group') {
          groupNames.push(column.name) ;
          groupElement.type = 'Group';
          groupElement.multiplier =row;
        } else if (row === column.rate && column.type === 'Tier') {
          tierNames.push(column.name) ;
          tierElement.type = 'Tier';
          tierElement.multiplier = row;
        }
      }
      if ( groupNames.length > 0 ) { groupElement.name = groupNames.join(', ') } ;
      if ( tierNames.length > 0 ) { tierElement.name = tierNames.join(', ') } ;
      if (!(Object.keys(groupElement).length === 0 && groupElement.constructor === Object)) {
        groupElement.name.replace(',$', '');
        this.table.push(groupElement);
      }
      if (!(Object.keys(tierElement).length === 0 && tierElement.constructor === Object)) {
        tierElement.name.replace(',$', '');
        this.table.push(tierElement);
      }
    }
    this.dataSource = new MatTableDataSource<TableElement>(this.table);
  }

  convertManufacturers() {
    this.manufacturerList = this.campaign.manufacturers.join(', ');
    if (this.manufacturerList.length == 0) this.manufacturerList = '(No Manufacturers)';
  }

  onEdit() {
    this.edit = true;
  }

  onCopy() {
    this.campaign.id = null;
    this._loadingService.register();
    let o = this._campaignService
      .create(this.campaign)
      .subscribe(
        response => {
          setTimeout(() => this._loadingService.resolve(), 800);
          this._router.navigate(['/campaigns', response.id, 'edit']);
        },
        error => {
          setTimeout(() => this._loadingService.resolve(), 800);
          this._dialogService.openAlert({ message: error });
        });
  }

  onSaveCampaign(campaign: Campaign) {
    this.edit = false;
    this.campaign = campaign;
    this.campaign.rate = +this.campaign.rate;
    this.campaign.anticipationDuration = +this.campaign.anticipationDuration;
    this.convertGroups();
    this.convertTiers();
    this.getEligibility();
    this.convertManufacturers();

    if (this.create) {
      let o = this._campaignService
        .create(this.campaign)
        .subscribe(
          response => {
            this._router.navigate(['/campaigns', response.id]);
          },
          error => {
            this._dialogService.openAlert({ message: error });
          });
    } else {
      let o = this._campaignService
        .save(this.campaign)
        .subscribe(
          response => {
            this._router.navigate(['/campaigns', response.id]);
          },
          error => {
            this._dialogService.openAlert({ message: error });
          });
    }
  }

  onCancelCampaign() {
    if (this.create) {
      this._router.navigate(['/campaigns'])
    } else {
      this.edit = false;
    }
  }

  onAddPrize() {
    this.addPrize = true;
  }

  onDeletePrize(index: number) {
    this.campaign.prizes.splice(index, 1);
    let o = this._campaignService
      .save(this.campaign)
      .subscribe(
        response => {
          this._snackBar.open('Prize deleted.', 'OK', { duration: 5000 });
        },
        error => {
          this._dialogService.openAlert({ message: error });
          this.getCampaign();
        });
  }

  onSavePrize(prize: Prize) {
    this.addPrize = false;
    this.campaign.prizes.push(prize);

    let o = this._campaignService
      .save(this.campaign)
      .subscribe(
        response => {
          this._snackBar.open('Prize added.', 'OK', { duration: 5000 });
        },
        error => {
          this._dialogService.openAlert({ message: error });
          this.getCampaign();
        });
  }

  onCancelPrize() {
    this.addPrize = false;
  }

  onAddDrawing(show: boolean) {
    this.addDrawing = show;
  }

  onFileUpload(file: File) {
    let options = this._campaignService.uploadOptions(this.id, file);
    this.disableUpload = true;
    this._fileService.upload(options).subscribe((response) => {
      this._snackBar.open('Rules uploaded.', 'OK', { duration: 5000 });
      this.showUpload = false;
      this.getCampaign();
    });
  }

  onDownload() {
    window.location.href = this._campaignService.getRulesDownloadUrl(this.id);
  }

  onUpload() {
    this.showUpload = true;
    this.disableUpload = false;
  }

  onArchive() {
    this._loadingService.register();
    let o = this._campaignService
      .archive(this.id)
      .subscribe(response => {
        setTimeout(() => this._loadingService.resolve(), 800);
        this._router.navigate(['/campaigns'])
      }, error => {
        setTimeout(() => this._loadingService.resolve(), 800);
        this._dialogService.openAlert({ message: error });
      });
  }
}

