import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Campaign, Group, Tier, EligibilityRate, TableElement } from '../campaign';
import { MatTableDataSource } from '@angular/material';
import { TdDialogService } from '@covalent/core';

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
    manufacturers: null
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
  manufacturerList: string[] = ['Bally', 'IGT', 'Spielo', 'Sierra Design Group', 'VLT'];

  constructor(
    private _dialogService: TdDialogService
  ) {}

  ngOnInit() {
    this.canSave = true;
    this.input.selGroups = [];
    this.input.selTiers = [];
    this.addEligibility = false;
    this.eligibilityRates = JSON.parse(JSON.stringify(this.campaign.eligibilityRate));
    for (const group of this.groups) {
      this.groupList.push(group.name);
      this.groupId.push(group.id);
    }
    this.input.groups = [];
    for (const group of this.campaign.groups) {
      this.input.groups.push(this.groupList[this.groupId.indexOf(group)]);
    }
    this.fillGroupList();
    for (const tier of this.tiers) {
      this.tierList.push(tier.name);
      this.tierId.push(tier.id);
    }
    this.input.tiers = [];
    for (const tier of this.campaign.tiers) {
      this.input.tiers.push(this.tierList[this.tierList.indexOf(tier)]);
    }
    this.fillTierList();
    this.getEligibility();
    this.input.manufacturers = [];
    for (const manufacturer of this.campaign.manufacturers) {
      this.input.manufacturers.push(manufacturer);
    }
  }

  private fillGroupList() {
    if (this.input.groups.length !== 0) {
      this.selgroupList = JSON.parse(JSON.stringify(this.input.groups));
    } else {
      this.selgroupList = JSON.parse(JSON.stringify(this.groupList));
    }
  }

  private fillTierList() {
    if (this.input.tiers.length !== 0) {
      this.seltierList = JSON.parse(JSON.stringify(this.input.tiers));
    } else {
      this.seltierList = JSON.parse(JSON.stringify(this.tierList));
    }
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

  addGroups(value: string) {
    if (this.table.length !== 0) {
      this._dialogService.openConfirm({
        message: 'Group Updates will clear the multipliers and bonus dates criteria below. Confirm adding.',
        title: 'Please Confirm',
        cancelButton: 'Cancel',
        acceptButton: 'Add',
      }).afterClosed().subscribe((accept: boolean) => {
        if (accept) {
          this.editGroups();
        } else {
          this.input.groups = this.input.groups.filter(item => item !== value);
        }
      });
    } else {
      this.editGroups();
    }
  }

  editGroups() {
    this.input.selGroups = [];
    if (this.input.tiers.length === 0) {
      this.seltierList = [];
    }
    this.eligibilityRates = [];
    this.table = [];
    this.dataSource = new MatTableDataSource<TableElement>(this.table);
    this.fillGroupList();
    this.selgroupList = Array.from(new Set(this.selgroupList.map((item: any) => item)));
  }

  addTiers(value: string) {
    if (this.table.length !== 0) {
      this._dialogService.openConfirm({
        message: 'Tier Updates will clear the multipliers and bonus dates criteria below. Confirm adding.',
        title: 'Please Confirm',
        cancelButton: 'Cancel',
        acceptButton: 'Add',
      }).afterClosed().subscribe((accept: boolean) => {
        if (accept) {
          this.editTiers();
        } else {
          this.input.tiers = this.input.tiers.filter(item => item !== value);
        }
      });
    } else {
      this.editTiers();
    }
  }

  editTiers() {
    this.input.selTiers = [];
    if (this.input.groups.length === 0) {
      this.selgroupList = [];
    }
    this.eligibilityRates = [];
    this.table = [];
    this.dataSource = new MatTableDataSource<TableElement>(this.table);
    this.fillTierList();
    this.seltierList = Array.from(new Set(this.seltierList.map((item: any) => item)));
  }

  removeGroups(value: any) {
    if (this.table.length !== 0) {
      this._dialogService.openConfirm({
        message: 'Group Updates will clear the multipliers and bonus dates criteria below. Confirm removal.',
        title: 'Please Confirm',
        cancelButton: 'Cancel',
        acceptButton: 'Add',
      }).afterClosed().subscribe((accept: boolean) => {
        if (accept) {
          this.confirmGroupRemove(value);
        } else {
          this.input.tiers = this.input.tiers.push(value);
        }
      });
    } else {
      this.confirmGroupRemove(value);
    }
  }

  private confirmGroupRemove(value: any) {
    this.selgroupList = this.selgroupList.filter(item => item !== value);
    if (this.input.selGroups) {
      this.input.selGroups = this.input.selGroups.filter(item => item !== value);
    }
    if (this.input.tiers.length === 0 && this.input.groups.length === 0) {
      this.selgroupList = JSON.parse(JSON.stringify(this.groupList));
      this.seltierList = JSON.parse(JSON.stringify(this.tierList));
    }
    if (this.table) {
      for (const row of this.table) {
        if (row.name.search(value) !== -1) {
          const names = row.name.split(', ');
          names.splice(names.indexOf(value), 1);
          row.name = names.join(', ');
        }
      }
    }
    this.table = this.table.filter(row => row.name.length !== 0);
    this.eligibilityRates = this.eligibilityRates.filter(item => item.name !== value);
    this.dataSource = new MatTableDataSource<TableElement>(this.table);
  }

  removeTiers(value: string) {
    if (this.table.length !== 0) {
      this._dialogService.openConfirm({
        message: 'Tier Updates will clear the multipliers and bonus dates criteria below. Confirm removal.',
        title: 'Please Confirm',
        cancelButton: 'Cancel',
        acceptButton: 'Add',
      }).afterClosed().subscribe((accept: boolean) => {
        if (accept) {
          this.confirmTierRemove(value);
        } else {
          this.input.tiers = this.input.tiers.push(value);
        }
      });
    } else {
      this.confirmTierRemove(value);
    }
  }

  private confirmTierRemove(value: string) {
    this.seltierList = this.seltierList.filter(item => item !== value);
    if (this.input.selTiers) {
      this.input.selTiers = this.input.selTiers.filter(item => item !== value);
    }
    if (this.input.tiers.length === 0 && this.input.groups.length === 0) {
      this.seltierList = JSON.parse(JSON.stringify(this.tierList));
      this.selgroupList = JSON.parse(JSON.stringify(this.groupList));
    }
    if (this.table) {
      for (const row of this.table) {
        if (row.name.search(value) !== -1) {
          const names = row.name.split(', ');
          names.splice(names.indexOf(value), 1);
          row.name = names.join(', ');
        }
      }
    }
    this.table = this.table.filter(row => row.name.length !== 0);
    this.eligibilityRates = this.eligibilityRates.filter(item => item.name !== value);
    this.dataSource = new MatTableDataSource<TableElement>(this.table);
  }

  onSave() {
    if (this.input.selGroups.length !== 0 || this.input.selTiers.length !== 0 || this.input.multiplier) {
      this._dialogService.openAlert({
        message: 'You have unsaved multipliers. ' + 'Please add or remove these multipliers. '
      });
      return false;
    }

    this.campaign.groups = [];
    this.campaign.manufacturers = [];
    for (const group of this.input.groups) {
      this.campaign.groups.push(this.groupId[this.groupList.indexOf(group)].toString());
    }
    this.campaign.tiers = [];
    for (const tier of this.input.tiers) {
      this.campaign.tiers.push(this.tierList[this.tierList.indexOf(tier)]);
    }
    this.campaign.eligibilityRate = [];
    for (const rate of this.eligibilityRates) {
      this.campaign.eligibilityRate.push(rate);
    }
    for (const manufacturer of this.input.manufacturers) {
      this.campaign.manufacturers.push(manufacturer);
    }
    this.save.emit(this.campaign);
  }
  onCancel() {
    this.cancel.emit();
  }

  fillRates(multiplier: any) {
    const groupElement = <TableElement>{};
    const tierElement = <TableElement>{};
    const groups: string[] = [];
    const tiers: string[] = [];
    const errors: string[] = [];
    if (arrayIsNotNull(this.input.selGroups)) {
      for (const item of this.input.selGroups) {
        const rate: EligibilityRate = <EligibilityRate>{};
        rate.id = this.groupId[this.groupList.indexOf(item)];
        rate.type = 'Group';
        rate.rate = this.input.multiplier;
        rate.name = item;
        if (!this.dupEligibilityRate(this.eligibilityRates, item)) {
          this.eligibilityRates.push(rate);
          groups.push(item);
        } else {
          errors.push(item);
        }
      }
      if (groups.length !== 0) {
        groupElement.name = groups.join(', ');
        groupElement.type = 'Group';
        groupElement.multiplier = multiplier;
        if (!this.dupTableElement(this.table, groupElement.name)) {
          this.table.push(groupElement);
        }
      }
    }
    if (arrayIsNotNull(this.input.selTiers)) {
      for (const item of this.input.selTiers) {
        const rate: EligibilityRate = <EligibilityRate>{};
        rate.id = this.tierId[this.tierList.indexOf(item)];
        rate.type = 'Tier';
        rate.rate = this.input.multiplier;
        rate.name = item;
        if (!this.dupEligibilityRate(this.eligibilityRates, item)) {
          this.eligibilityRates.push(rate);
          tiers.push(item);
        } else {
          errors.push(item);
        }
      }
      if (tiers.length !== 0) {
        tierElement.name = tiers.join(', ');
        tierElement.type = 'Tier';
        tierElement.multiplier = multiplier;
        if (!this.dupTableElement(this.table, tierElement.name)) {
          this.table.push(tierElement);
        }
      }
    }
    if (errors.length !== 0) {
      this._dialogService.openAlert({
        message: 'Multiplier : ' + errors.join(', ') + ' already defined, Please remove if you want to modify. '
      });
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
    const rates: EligibilityRate[] = this.eligibilityRates;
    const row = this.table[item];
    for (const name of row.name.split(', ')) {
      const index = rates.findIndex(rate => rate.name === name);
      rates.splice(index, 1);
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
    multipliers = Array.from(new Set(this.eligibilityRates.map(eligibilityRate => eligibilityRate.rate)));
    for (const row of multipliers) {
      const groupElement = <TableElement>{};
      const tierElement = <TableElement>{};
      const groupNames: string[] = [];
      const tierNames: string[] = [];
      for (const column of this.eligibilityRates) {
        if (row === column.rate && column.type === 'Group') {
          groupNames.push(column.name);
          groupElement.type = 'Group';
          groupElement.multiplier = row;
        } else if (row === column.rate && column.type === 'Tier') {
          tierNames.push(column.name);
          tierElement.type = 'Tier';
          tierElement.multiplier = row;
        }
      }
      if (groupNames.length > 0) {
        groupElement.name = groupNames.join(', ');
      }
      if (tierNames.length > 0) {
        tierElement.name = tierNames.join(', ');
      }
      if (!(Object.keys(groupElement).length === 0 && groupElement.constructor === Object)) {
        this.table.push(groupElement);
      }
      if (!(Object.keys(tierElement).length === 0 && tierElement.constructor === Object)) {
        this.table.push(tierElement);
      }
    }
    this.dataSource = new MatTableDataSource<TableElement>(this.table);
  }

  dupEligibilityRate(array: EligibilityRate[], element: string): boolean {
    return array.some(function(item) {
      return item.name === element;
    });
  }
  dupTableElement(array: TableElement[], element: string): boolean {
    return array.some(function(item) {
      if (item.name.split(', ').some(name => element.split(', ').indexOf(name) >= 0)) {
        return true;
      } else {
        return false;
      }
    });
  }
}

function arrayIsNotNull(array: any): boolean {
  return typeof array !== 'undefined' && array != null && array.length != null && array.length > 0;
}
