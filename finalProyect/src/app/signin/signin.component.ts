import { Component, OnInit } from '@angular/core';

import listaCiudades from 'src/assets/json/ciudades.json';

@Component({
  selector: 'signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  Ciudades : any = listaCiudades;

  constructor() { }

  ngOnInit(): void {
  }

}
