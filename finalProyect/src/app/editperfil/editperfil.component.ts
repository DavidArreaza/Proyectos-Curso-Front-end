import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import listaCiudades from 'src/assets/json/ciudades.json';
import { User } from '../shared/models/user';
import { AuthService } from '../shared/services/auth.service';
import { CrudGamesService } from '../shared/services/crud-games.service';

@Component({
  selector: 'app-editperfil',
  templateUrl: './editperfil.component.html',
  styleUrls: ['./editperfil.component.css']
})
export class EditperfilComponent implements OnInit {

  Ciudades : any = listaCiudades;
  uid = '';
  nick : any = '';
  mForm: FormGroup;
  user : any;

  constructor(private authService : AuthService, private gameService : CrudGamesService,
    private fb: FormBuilder) {

      this.user = this.authService.userData();
      this.uid = this.authService.userData().uid;
      this.nick = this.authService.userData().nick;
      console.log(this.user);

      this.mForm = this.fb.group({

      });
     }

  ngOnInit(): void {

  }

}
