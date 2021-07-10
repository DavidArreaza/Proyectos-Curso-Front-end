import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Game } from '../shared/models/game';
import { AuthService } from '../shared/services/auth.service';
import { CrudGamesService } from '../shared/services/crud-games.service';

@Component({
  selector: 'app-contentmain',
  templateUrl: './contentmain.component.html',
  styleUrls: ['./contentmain.component.css']
})
export class ContentmainComponent implements OnInit {

  user : any;
  misGames: Array<Game> = [];


  constructor(private authService: AuthService, private gamesService : CrudGamesService, private notifier: NotifierService,
    private router: Router) { }

  ngOnInit(): void {
    this.user = this.authService.userData();
    this.loadAllBios();
  }

  loadAllBios(){
    this.gamesService.readAllGames().subscribe( data => {
      this.misGames = [];
      data.forEach((doc : any) => {

        console.log(doc.id, "=>", doc.data());

        let newGame: Game = doc.data();
        newGame.id = doc.id;
        this.misGames.push(newGame);
      })
    })
  }

}
