import { Component, Input, OnInit } from '@angular/core';

type Contacts = {
  name: string;
  numer: number;
  save: string;
  grupo: string;
};


@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})


export class ListComponent implements OnInit {
  @Input() contact: Contacts;

  constructor() { }

  ngOnInit(): void { }

}
