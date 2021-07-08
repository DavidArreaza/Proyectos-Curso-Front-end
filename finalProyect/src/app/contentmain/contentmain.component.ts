import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-contentmain',
  templateUrl: './contentmain.component.html',
  styleUrls: ['./contentmain.component.css']
})
export class ContentmainComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
