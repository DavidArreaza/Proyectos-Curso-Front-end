import { Component, OnInit } from '@angular/core';
import listaCiudades from 'src/assets/json/ciudades.json';
import { AuthService } from '../shared/services/auth.service';
import { CrudGamesService } from '../shared/services/crud-games.service';

@Component({
  selector: 'app-editperfil',
  templateUrl: './editperfil.component.html',
  styleUrls: ['./editperfil.component.css']
})
export class EditperfilComponent implements OnInit {

  Ciudades : any = listaCiudades;

  constructor(private auhtService : AuthService, private gameService : CrudGamesService) { }

  ngOnInit(): void {
  }

}
