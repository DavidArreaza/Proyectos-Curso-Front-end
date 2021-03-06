import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Game } from '../shared/models/game';
import { AuthService } from '../shared/services/auth.service';
import { CrudGamesService } from '../shared/services/crud-games.service';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mispartidas',
  templateUrl: './mispartidas.component.html',
  styleUrls: ['./mispartidas.component.css']
})

export class MispartidasComponent implements OnInit {

  miGame : any;
  idUser = '';
  misGames: Array<Game> = [];
  user : any;

  isLoading = false;

  faTrashAlt = faTrashAlt;
  faEdit = faEdit;

  constructor(private authService : AuthService, private gameService : CrudGamesService,
     private notifier : NotifierService, private router: Router) { }

  ngOnInit(): void {
    this.user = this.authService.userData();
    this.idUser = this.authService.userData().uid;
    this.readAllGamesUser();
  }

  readAllGamesUser(){
    this.isLoading = true;
    this.gameService.readAllGames().subscribe(data => {
      this.misGames = [];
      data.forEach((doc : any) => {
        let newGame: Game = doc.data();
        newGame.id = doc.id;
        if(newGame.idUser.trim() == this.idUser.trim()){
          this.misGames.push(newGame);
        }
      })
      this.isLoading = false;
    })
  }

  deleteGame(idGame : any){
    this.gameService.deleteGame(idGame).then(success => {
      this.notifier.notify('success', "Partida eliminada");
      this.readAllGamesUser();
    }).catch(error => {
      this.notifier.notify('error', "Error");
    })
  }

  editPartida(idGame : any){
    this.router.navigate(["editGame/" + idGame]);
  }

  back(){
    if(this.authService.isLoggedIn()){
      this.user = this.authService.userData();
      this.router.navigate(['home/'+this.user.uid]);
    }else{
      this.router.navigate(['home']);
    }
  }

}
