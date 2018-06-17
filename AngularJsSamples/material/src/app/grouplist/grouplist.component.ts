import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Group, Tier} from "../app.modal";

@Component({
  selector: 'app-grouplist',
  templateUrl: './grouplist.component.html',
  styleUrls: ['./grouplist.component.css']
})
export class GrouplistComponent implements OnInit {
  @Input() groups: Group[];
  @Input() tiers: Tier[];
  input = {
    start: null,
    end: null,
    groups: null,
    tiers: null,
    eligibilityRates:null,
    multiplier: null
  };

  constructor() {
  }

  ngOnInit() {
    this.groups = [
      {
        id: "1",
        name: "Jan Budday"
      },
      {
        id: "2",
        name: "March Budday"
      },
      {
        id: "3",
        name: "June Budday"
      }];
    this.tiers = [{
      id: "2",
      name: "Silver"
    },
      {
        id: "3",
        name: "Gold"
      },
      {
        id: "4",
        name: "Platinum"
      }];
    for (let group of this.groups) {
      this.groupList.push(group.name);
      this.groupId.push(group.id);
    }
    /*    this.input.groups = [];
        this.input.eligibilityRates=[];
        for (let group of this.campaign.groups) {
          this.input.groups.push(this.groupList[this.groupId.indexOf(group)]);
            this.input.eligibilityRates.type.push("Group");
            this.input.eligibilityRates.name.push(this.groupList[this.groupId.indexOf(group)]);
        }*/
    for (let tier of this.tiers) {
      this.tierList.push(tier.name);
      this.tierId.push(tier.id);
    }
    /*    this.input.tiers = [];
        for (let tier of this.campaign.tiers) {
          this.input.tiers.push(this.tierList[this.tierId.indexOf(tier)]);
               this.input.eligibilityRates.type.push("Tier");
               this.input.eligibilityRates.name.push(this.tierList[this.tierId.indexOf(tier)]);
        }*/

  }
  groupList: string[] = []; // = ['DNCGroup'];
  groupId: string[] = [];
  tierList: string[] = []; // = ['OasisTiers'];
  tierId: string[] = [];
  groupControl = new FormControl();


  tiernGroups = [
    {
      type: 'Group',
      value: [
        {id: '0', name: 'Jan Birthday'},
        {id: '1', name: 'Feb Birthday'},
        {id: '2', name: 'March Birthday'}
      ],
      multiplier: 4,
    },
    {
      type: 'Tier',
      value: [
        {id: '3', name: 'Gold'},
        {id: '4', name: 'Silver'},
        {id: '5', name: 'Bronze'}
      ], multiplier: 4,
    }
  ];

  getGroups(value: any) {
    console.log(value.toString())
  }

  getTiers(value: any) {
    console.log(value.toString())

  }
}
