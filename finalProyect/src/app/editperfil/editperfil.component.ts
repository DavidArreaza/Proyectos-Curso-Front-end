import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import listaCiudades from 'src/assets/json/ciudades.json';
import { Game } from '../shared/models/game';
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
  name = '';
  nick : any = '';
  mForm: FormGroup;
  user : any;
  misGames: Array<Game> = [];
  contador = 0;

  constructor(private authService : AuthService, private gameService : CrudGamesService,
    private fb: FormBuilder, private notifier : NotifierService) {

      this.user = this.authService.userData();

      this.mForm = this.fb.group({
        nick : ["", Validators.required]
      });
     }

  ngOnInit(): void {
    this.name = this.user.displayName;
    const nick = this.user.nick;
    console.log(nick)
    this.mForm.patchValue({
      nick: this.nick || this.name
    });

    this.countGames();
  }

  saveProfile(){
    if(this.mForm.invalid){
      this.notifier.notify('error', "El nombre introducido es incorrecto");
      return;
    }
    this.authService.updateIdProfile(this.mForm.value).then(success =>{
      this.notifier.notify('success', "Datos actualizados")
      this.authService.updateLocalData(this.mForm.value);

      setTimeout(function(){
        window.location.reload(); //Solución rápida
      }, 500)
      
    }).catch(error => {
      this.notifier.notify('error', "Ha ocurrido un error")
    })
  }

  countGames(){
    this.gameService.readAllGames().subscribe(data => {
      this.misGames = [];
      data.forEach((doc : any) => {
        let newGame: Game = doc.data();
        newGame.id = doc.id;
        if(newGame.idUser == this.authService.userData().uid){
          this.misGames.push(newGame);
          this.contador = this.misGames.length;
        }
      })
      console.log(this.contador)
    });
  }

}
