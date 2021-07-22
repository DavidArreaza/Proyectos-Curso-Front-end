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
  filter = '';
  showFiller = false;
  isLoading = false;
  isOpen = false;


  constructor(private authService: AuthService, private gameService : CrudGamesService, private notifier: NotifierService,
    private router: Router) { }

  ngOnInit(): void {

    if(this.authService.isLoggedIn()){
      this.user = this.authService.userData();
      this.router.navigate(['home/'+this.user.uid]);
    }
    
    this.loadAllGames();
  }

  loadAllGames(){
    this.isLoading = true;
    this.gameService.readAllGames().subscribe( data => {
      this.misGames = [];
      data.forEach((doc : any) => {
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

  filtroEstrategia(){
    this.gameService.readAllGames().subscribe(data => {
      this.misGames = [];
      data.forEach((doc : any) => {
        let newGame: Game = doc.data();
        newGame.id = doc.id;
        if(newGame.categoria == "Estrategia"){
          this.misGames.push(newGame);
        }
      })
      if(this.misGames.length == 0){
        this.notifier.notify('warning', 'No se han encontrado datos');
      }
    })
  }

  filtroRol(){
    this.gameService.readAllGames().subscribe(data => {
      this.misGames = [];
      data.forEach((doc : any) => {
        let newGame: Game = doc.data();
        newGame.id = doc.id;
        if(newGame.categoria == "Rol"){
          this.misGames.push(newGame);
        }
      })
      if(this.misGames.length == 0){
        this.notifier.notify('warning', 'No se han encontrado datos');
      }
    });
  }

  filtroPuzzle(){
    this.gameService.readAllGames().subscribe(data => {
      this.misGames = [];
      data.forEach((doc : any) => {
        let newGame: Game = doc.data();
        newGame.id = doc.id;
        if(newGame.categoria == "Puzzle"){
          this.misGames.push(newGame);
        }
      })
      if(this.misGames.length == 0){
        this.notifier.notify('warning', 'No se han encontrado datos');
      }
    });
  }

  filtroTablero(){
    this.gameService.readAllGames().subscribe(data => {
      this.misGames = [];
      data.forEach((doc : any) => {
        let newGame: Game = doc.data();
        newGame.id = doc.id;
        if(newGame.categoria == "Tablero"){
          this.misGames.push(newGame);
        }
      })
      if(this.misGames.length == 0){
        this.notifier.notify('warning', 'No se han encontrado datos');
      }
    });
  }

  onSearch(event: any){ 
    this.gameService.readAllGames().subscribe(data => {
      this.misGames = [];
      data.forEach((doc : any) => {
        let newGame: Game = doc.data();
        newGame.id = doc.id;

        if(newGame.titulo.toUpperCase().includes(event.target.value.toUpperCase())){
          this.misGames.push(newGame);
        }

      })
      if(event.target.value == ''){
        this.loadAllGames();
      }
    });
    

  }

}
