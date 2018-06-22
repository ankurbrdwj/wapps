import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import {Campaign, Group, Tier, EligibilityRate,TableElement} from '../campaign';
import { MatTableDataSource } from '@angular/material';

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
    customEligibility: {
      selGroups: null,
      selTiers: null
    }
  };
  table: TableElement[] = [];
  showTable: boolean;
  groupList: string[] = []; // = ['DNCGroup'];
  groupId: string[] = [];
  tierList: string[] = []; // = ['OasisTiers'];
  tierId: string[] = [];
  selgroupList: string[] = []; // = ['DNCGroup'];
  seltierList: string[] = []; // = ['OasisTiers'];
  canSave: boolean;
  displayedColumns = null;
  dataSource = null;

  constructor() {
  }

  ngOnInit() {
   this.input.selGroups = [];
    this.input.selTiers = [];
    for (let group of this.groups) {
      this.groupList.push(group.name);
      this.groupId.push(group.id);
    }
    this.input.groups = [];

    for (let group of this.campaign.groups) {
      this.input.groups.push(this.groupList[this.groupId.indexOf(group)]);
    }
    for (let tier of this.tiers) {
      this.tierList.push(tier.name);
      this.tierId.push(tier.id);
    }
    this.input.tiers = [];
    for (let tier of this.campaign.tiers) {
      this.input.tiers.push(this.tierList[this.tierList.indexOf(tier)]);
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



  getGroups(groups: any) {
    console.log(groups);
    for (let sgroup of groups) {
      console.log("selected group " + sgroup);
      this.selgroupList.push(sgroup);
    }
    this.selgroupList = Array.from(new Set(this.selgroupList.map((item: any) => item)));
  }

  getTiers(tiers: any) {
    for (let tier of tiers) {
      console.log("selected tier " + tier);
      this.seltierList.push(tier)
    }
    this.seltierList = Array.from(new Set(this.seltierList.map((item: any) => item)));

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

    this.save.emit(this.campaign);
  }

  onCancel() {
    this.cancel.emit();
  }

  fillRates(multiplier: any) {
    var groupElement = <TableElement>{};
    var tierElement = <TableElement>{};
    this.campaign.eligibilityRate=[];

    var groups: string[] = [];
    var tiers: string[] = [];
    if (arrayIsNotNull(this.input.selGroups)) {
      for (let item of this.input.selGroups) {
        groups.push(item);
        var rate: EligibilityRate = <EligibilityRate>{};
        rate.id = this.groupId[this.groupList.indexOf(item)];
        rate.name =item;
        rate.type ="Group";
        rate.rate = this.input.multiplier;
        this.campaign.eligibilityRate.push(rate);
      }
      groupElement.name = groups.join(",");
      groupElement.type = "Group";
      groupElement.multiplier = multiplier;
      this.table.push(groupElement);
    }
    if (arrayIsNotNull(this.input.selTiers)) {
      for (let item of this.input.selTiers) {
        tiers.push(item);
        var rate: EligibilityRate = <EligibilityRate>{};
        rate.id = this.tierId[this.tierList.indexOf(item)];
        rate.name =item;
        rate.type ="Tier";
        rate.rate = this.input.multiplier;
        this.campaign.eligibilityRate.push(rate);
      }
      tierElement.name = tiers.join(",");
      tierElement.type = "Tier";
      tierElement.multiplier = multiplier;
      this.table.push(tierElement);
    }
    this.table = Array.from(new Set(this.table.map((item: any) => item)));
  }

  createTable() {

    if (arrayIsNotNull(this.table)) {
      this.displayedColumns = ['action','name', 'type', 'multiplier'];
      this.table = Array.from(new Set(this.table.map((item: any) => item)));
      this.dataSource = new MatTableDataSource<TableElement>(this.table);
      this.showTable = true;
    }
    this.input.selTiers = [];
    this.input.selGroups = [];
    this.input.multiplier = null;
  }

  closeContent(){
    this.input.selTiers = [];
    this.input.selGroups = [];
    this.input.multiplier = null;
  }

  deleteRow(item: any){
    /* var rates: EligibilityRate[] =this.campaign.eligibilityRate;
     var row = this.table[item];
     for (let item of rates){
       if(item.type===row.type && item.name ===row.name && item.rate===row.multiplier){
         this.campaign.eligibilityRate.splice(rates.indexOf(item),1);
       }
     }*/
    this.table.splice(item,1);
    this.dataSource.data = this.table;
  }
  nameTouched() {
    alert('name touched');
    document.getElementById('name_tooltip').style.display = "block";
  }
}

function arrayIsNotNull(array: any): boolean{
  return typeof array != "undefined"
    && array != null
    && array.length != null
    && array.length > 0 ;
}
