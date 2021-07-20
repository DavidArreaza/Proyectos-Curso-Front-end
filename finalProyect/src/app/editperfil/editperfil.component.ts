import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { Game } from '../shared/models/game';
import { AuthService } from '../shared/services/auth.service';
import { CrudGamesService } from '../shared/services/crud-games.service';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { User } from '../shared/models/user';

@Component({
  selector: 'app-editperfil',
  templateUrl: './editperfil.component.html',
  styleUrls: ['./editperfil.component.css']
})
export class EditperfilComponent implements OnInit {

  user : any;
  owner : any;
  idUserGame = '';
  misGames: Array<Game> = [];
  contador = 0;
  faStar = faStar;

  constructor(private authService : AuthService, private gameService : CrudGamesService,
    private fb: FormBuilder, private notifier : NotifierService, private route: ActivatedRoute) {

      //this.user = this.authService.userData();
      this.idUserGame = this.route.snapshot.paramMap.get('id') as string;
     }

  ngOnInit(): void {
    this.readOwner(this.idUserGame);
    this.readAllGamesUser();
  }

  /*saveProfile(){
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
  }*/


  readAllGamesUser(){
    this.gameService.readAllGames().subscribe(data => {
      this.misGames = [];
      data.forEach((doc : any) => {
        let newGame: Game = doc.data();
        newGame.id = doc.id;
        if(newGame.idUser.trim() == this.idUserGame.trim()){
          this.misGames.push(newGame);
          this.contador = this.misGames.length;
        }
      })
    })
  }

  readOwner(idUser : string){
    this.gameService.readOwnerGamer(idUser).subscribe(data => {
      if(data.exists){
        this.owner = data.data() as User;
      }else{
        console.log("NO ENCONTRADO")
      }
    })
  }

}
