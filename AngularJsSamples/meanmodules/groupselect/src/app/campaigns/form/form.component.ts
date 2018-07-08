import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Campaign, Group, Tier, EligibilityRate,TableElement} from '../campaign';
import { MatTableDataSource } from '@angular/material';
import {TdDialogService} from '@covalent/core';

@Component({
  selector: 'app-campaign-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {


  @Input() campaign: Campaign;
  @Input() groups: Group[];
  @Input() tiers: Tier[];
  @Output() save = new EventEmitter<Campaign>();
  @Output() cancel = new EventEmitter();

  input = {
    start: null,
    end: null,
    groups: null,
    tiers: null,
    multiplier: null,
    selGroups: null,
    selTiers: null,
  };
  table: TableElement[] = [];
  showTable: boolean;
  addEligibility: boolean;
  groupList: string[] = []; // = ['DNCGroup'];
  groupId: string[] = [];
  tierList: string[] = []; // = ['OasisTiers'];
  tierId: string[] = [];
  selgroupList: string[] = []; // = ['DNCGroup'];
  seltierList: string[] = []; // = ['OasisTiers'];
  canSave: boolean;
  displayedColumns = null;
  dataSource = null;
  private eligibilityRates: EligibilityRate[];

  constructor(
    private _dialogService: TdDialogService
  ) {}

  ngOnInit() {
    this.canSave = true;
    this.input.selGroups = [];
    this.input.selTiers = [];
    this.addEligibility = false;
    this.eligibilityRates = JSON.parse(JSON.stringify(this.campaign.eligibilityRate));
    for (let group of this.groups) {
      this.groupList.push(group.name);
      this.groupId.push(group.id);
    }
    this.input.groups = [];
    for (let group of this.campaign.groups) {
      this.input.groups.push(this.groupList[this.groupId.indexOf(group)]);
    }
    this.selgroupList = JSON.parse(JSON.stringify(this.input.groups));
    for (let tier of this.tiers) {
      this.tierList.push(tier.name);
      this.tierId.push(tier.id);
    }
    this.input.tiers = [];
    for (let tier of this.campaign.tiers) {
      this.input.tiers.push(this.tierList[this.tierList.indexOf(tier)]);
    }
    this.seltierList = JSON.parse(JSON.stringify(this.input.tiers));
    //   this.table
    this.getEligibility();
  }

  onCheckbox1(campaign: Campaign) {
    campaign.canRollover = !campaign.canRollover;
  }

  onCheckbox2(campaign: Campaign) {
    campaign.isAutoDraw = !campaign.isAutoDraw;
  }

  onCheckbox3(campaign: Campaign) {
    campaign.isAutoNotify = !campaign.isAutoNotify;
  }


  getGroups(value: string) {
    this.selgroupList.push(value);
    this.selgroupList = Array.from(new Set(this.selgroupList.map((item: any) => item)));
  }

  getTiers(value: string) {
    this.seltierList.push(value)
    this.seltierList = Array.from(new Set(this.seltierList.map((item: any) => item)));

  }

  removeGroups(value: string) {
    this.selgroupList = this.selgroupList.filter(item => item !== value  );
    if ( this.input.selGroups ) {
      this.input.selGroups = this.input.selGroups.filter(item => item !== value  );
    }
  }

  removeTiers(value: string) {
    this.seltierList = this.seltierList.filter(item => item !== value  );
    if ( this.input.selTiers ) {
      this.input.selTiers = this.input.selTiers.filter(item => item !== value  );
    }
  }

  onSave() {
    this.campaign.groups = [];
    for (let group of this.input.groups) {
      this.campaign.groups.push(this.groupId[this.groupList.indexOf(group)].toString());
    }
    this.campaign.tiers = [];
    for (let tier of this.input.tiers) {
      this.campaign.tiers.push(this.tierList[this.tierList.indexOf(tier)]);
    }
    this.campaign.eligibilityRate = [];
    for (let rate of this.eligibilityRates) {
      this.campaign.eligibilityRate.push(rate);
    }
    this.save.emit(this.campaign);
  }

  onCancel() {
    this.cancel.emit();
  }

  fillRates(multiplier: any) {
    let groupElement = <TableElement>{};
    let tierElement = <TableElement>{};
    let groups: string[] = [];
    let tiers: string[] = [];
    if (arrayIsNotNull(this.input.selGroups)) {
      for (let item of this.input.selGroups) {
        groups.push(item);
        let rate: EligibilityRate = <EligibilityRate>{};
        rate.id = this.groupId[this.groupList.indexOf(item)];
        rate.type = 'Group';
        rate.rate = parseInt(this.input.multiplier, 10);
        rate.name = item;
        if (!this.dupEligibilityRate(this.eligibilityRates, item)) {
          this.eligibilityRates.push(rate);
        } else {
          this._dialogService.openAlert({message: ' WARNING: Multiplier : ' + item +
            ' already defined. Please remove if you want to modify multiplier for ' + item + ' .'});
        }
      }
      groupElement.name = groups.join(',');
      groupElement.type = 'Group';
      groupElement.multiplier = multiplier;
      if (!this.dupTableElement(this.table, groupElement.name)) {
        this.table.push(groupElement);
      }
    }
    if (arrayIsNotNull(this.input.selTiers)) {
      for (let item of this.input.selTiers) {
        tiers.push(item);
        let rate: EligibilityRate = <EligibilityRate>{};
        rate.id = this.tierId[this.tierList.indexOf(item)];
        rate.type = 'Tier';
        rate.rate = parseInt(this.input.multiplier, 10);
        rate.name = item;
        if (!this.dupEligibilityRate(this.eligibilityRates, item)) {
          this.eligibilityRates.push(rate);
        } else {
          this._dialogService.openAlert({message: ' WARNING: Multiplier : ' + item +
            ' already defined. Please remove if you want to modify multiplier for ' + item + ' .'});
        }
      }
      tierElement.name = tiers.join(',');
      tierElement.type = 'Tier';
      tierElement.multiplier = multiplier;
      if (!this.dupTableElement(this.table, tierElement.name)) {
        this.table.push(tierElement);
      }
    }
    this.table = Array.from(new Set(this.table.map((item: any) => item)));
  }

  createTable() {

    if (arrayIsNotNull(this.table)) {
      this.displayedColumns = ['action', 'name', 'type', 'multiplier'];
      this.table = Array.from(new Set(this.table.map((item: any) => item)));
      this.dataSource = new MatTableDataSource<TableElement>(this.table);
      this.showTable = true;
    }
    this.input.selTiers = [];
    this.input.selGroups = [];
    this.input.multiplier = null;
  }

  closeContent() {
    this.input.selTiers = [];
    this.input.selGroups = [];
    this.input.multiplier = null;
  }

  deleteRow(item: any) {
    let rates: EligibilityRate[] = this.eligibilityRates;
    let row = this.table[item];
    for (let name of row.name.split(',')) {
      let index = rates.findIndex(rate => rate.name === name);
      rates.splice( index , 1);
    }

    this.eligibilityRates = rates;
    this.table.splice(item, 1);
    this.dataSource.data = this.table;
  }

  // create table from Campaign Object from Database
  getEligibility() {
    this.displayedColumns = ['action', 'name', 'type', 'multiplier'];
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
          groupNames.push( column.name);
          groupElement.type = 'Group';
          groupElement.multiplier = row;
        } else if (row === column.rate && column.type === 'Tier') {
          tierNames.push( column.name);
          tierElement.type = 'Tier';
          tierElement.multiplier = row;
        }
      }
      if ( groupNames.length > 0 ) { groupElement.name = groupNames.join(',') } ;
      if ( tierNames.length > 0 ) { tierElement.name = tierNames.join(',') } ;
      if (!(Object.keys( groupElement).length === 0 && groupElement.constructor === Object)) {
        this.table.push( groupElement);
      }
      if (!(Object.keys( tierElement).length === 0 && tierElement.constructor === Object)) {
        this.table.push( tierElement);
      }
    }
    this.dataSource = new MatTableDataSource<TableElement>(this.table);
  }

  dupEligibilityRate(array: EligibilityRate[], element: string): boolean {
    return array.some( function (item) { return item.name === element
    });
  }
  dupTableElement(array: TableElement[], element: string): boolean {
    return array.some(function (item) {
      if (item.name.split(',').some(name => element.split(',').indexOf( name ) >= 0)) {
        return true;
      } else {
        return false;
      }
    });
  }
}
function arrayIsNotNull( array: any): boolean {
  return typeof array !== 'undefined'
    && array != null
    && array.length != null
    && array.length > 0 ;
}

