import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Campaign, Group,  Tier, EligibilityRate} from '../campaign';
import { FormControl} from '@angular/forms';
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
  @Input() eligibilityRates: EligibilityRate[];
  @Output() save = new EventEmitter<Campaign>();
  @Output() fillGroup = new EventEmitter<Group[]>();
  @Output() fillTiers = new EventEmitter<Tier[]>();
  @Output() cancel = new EventEmitter();

  input = {
    start: null,
    end: null,
    groups: null,
    tiers: null,
    eligibilityRates: null,
    multiplier: null
  };

  groupList: string[] = []; // = ['DNCGroup'];
  groupId: string[] = [];
  tierList: string[] = []; // = ['OasisTiers'];
  tierId: string[] = [];
  canSave: boolean;
  groupsControl= new FormControl();
  displayedColumns = [ 'name', 'type', 'multiplier'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  constructor() { }

  ngOnInit() {

    for (const group of this.groups) {
      this.groupList.push(group.name);
      this.groupId.push(group.id);
    }
    this.input.groups = [];
    this.input.eligibilityRates = [];
    for (let group of this.campaign.groups) {
      this.input.groups.push(this.groupList[this.groupId.indexOf(group)]);
    /*  this.input.eligibilityRates.type.push('Group');
      this.input.eligibilityRates.name.push(this.groupList[this.groupId.indexOf(group)]);*/
    }
    for (let tier of this.tiers) {
      this.tierList.push(tier.name);
      this.tierId.push(tier.id);
    }
    this.input.tiers = [];
    for (let tier of this.campaign.tiers) {
      this.input.tiers.push(this.tierList[this.tierId.indexOf(tier)]);
 /*     this.input.eligibilityRates.type.push('Tier');
      this.input.eligibilityRates.name.push(this.tierList[this.tierId.indexOf(tier)]);*/
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

  fillMultiOpts(gtwm, grps, trs) {
    alert('HH');
    for (let grp of grps) {
      alert('hh2' + grp.toString());
      let rate = {} as EligibilityRate;
      rate.id = grp.toString();
      rate.type = 'Groupx';
      alert('vv' + gtwm.values);
      alert('oo' + gtwm.options);
      alert('ee' + gtwm.eligibilityRates);
      alert('atat' + gtwm.attrs);
      gtwm.values = '<option>' + grp + '</option>';

      console.log(gtwm.toString());
    }

  }

  getGroups(groups: Group[]) {
    alert('GG');
    for (let group of groups) {
      let rate = {} as EligibilityRate;
      rate.id = group.id;
      rate.type = 'Group';
      rate.rate = 0;
      this.campaign.eligibilityRates.push(rate);
    }
  }

  getTiers(tiers: Tier[]) {
    alert('TT');
    for (let tier of tiers) {
      let rate = {} as EligibilityRate;
      rate.id = tier.name;
      rate.type = 'Tier';
      rate.rate = 0;
      this.campaign.eligibilityRates.push(rate);
    }
  }
  onSave() {
    this.campaign.groups = [];
    for (let group of this.input.groups) {
      this.campaign.groups.push(this.groupId[this.groupList.indexOf(group)].toString());
    }
    this.campaign.tiers = [];
    for (let tier of this.input.tiers) {
      this.campaign.tiers.push(this.tierId[this.tierList.indexOf(tier)].toString());
    }
   /* this.campaign.eligibilityRates = [];
    for (let eligibilityRate of this.input.eligibilityRates) {
      eligibilityRate.id.push(this.input.eligibilityRates);
      eligibilityRate.rate.push(this.input.multiplier);
      this.campaign.eligibilityRates.push(eligibilityRate);
    }*/
    this.save.emit(this.campaign);
  }

  onCancel() {
    this.cancel.emit();
  }

}
export interface PeriodicElement {
  name: string;
  type: string;
  multiplier: number;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {name: 'Helium',  type: 'Group' , multiplier: 4 },
  {name: 'Lithium', type: 'Tier' ,  multiplier: 4 },
  {name: 'Hydrogen', type: 'Group' , multiplier: 4 },
  {name: 'Boron',   type: 'Tier' ,  multiplier: 4 },
  {name: 'Carbon',  type: 'Group' , multiplier: 4 },
  {name: 'Nitrogen', type: 'Tier' ,  multiplier: 4 },
  {name: 'Oxygen',  type: 'Group' , multiplier: 4 },
  {name: 'Fluorine', type: 'Tier' ,  multiplier: 4 },
  {name: 'Neon',    type: 'Group' , multiplier: 4 }
];
