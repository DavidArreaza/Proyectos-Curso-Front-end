import { Component, OnInit } from '@angular/core';
import listaCiudades from 'src/assets/json/ciudades.json';

@Component({
  selector: 'app-editperfil',
  templateUrl: './editperfil.component.html',
  styleUrls: ['./editperfil.component.css']
})
export class EditperfilComponent implements OnInit {

  Ciudades : any = listaCiudades;

  constructor() { }

  ngOnInit(): void {
  }

}
