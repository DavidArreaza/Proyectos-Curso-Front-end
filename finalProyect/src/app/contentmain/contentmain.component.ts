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
  game : any;
  misGames: Array<Game> = [];
  gamesSearch : Array<Game> = [];
  showFiller = false;
  isLoading = false;


  constructor(private authService: AuthService, private gameService : CrudGamesService, private notifier: NotifierService,
    private router: Router) { }

  ngOnInit(): void {

    if(this.authService.isLoggedIn()){
      //this.router.navigate(['/profile']);
      this.user = this.authService.userData();
    }
    
    //this.user = this.authService.userData();
    this.loadAllGames();
  }

  loadAllGames(){
    this.isLoading = true;
    this.gameService.readAllGames().subscribe( data => {
      this.misGames = [];
      data.forEach((doc : any) => {
        //console.log(doc.id, "=>", doc.data());
        let newGame: Game = doc.data();
        newGame.id = doc.id;
        this.misGames.push(newGame);
      })
    })
    this.isLoading = false;
  }

  openGame(idGame : any){
    this.router.navigate(["detalles/"+idGame]);
  }

  filtro(){
    this.gameService.readAllGames().subscribe(data => {
      this.gamesSearch = [];
      data.forEach((doc : any) => {
        let newGame: Game = doc.data();
        newGame.id = doc.id;
        if(newGame.categoria == "Rol"){
          this.gamesSearch.push(newGame);
        }
      })
      console.log(this.gamesSearch)
    })
  }

}
