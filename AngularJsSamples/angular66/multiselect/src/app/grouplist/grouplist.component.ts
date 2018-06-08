import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
@Component({
  selector: 'app-grouplist',
  templateUrl: './grouplist.component.html',
  styleUrls: ['./grouplist.component.css']
})
export class GrouplistComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
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
}
