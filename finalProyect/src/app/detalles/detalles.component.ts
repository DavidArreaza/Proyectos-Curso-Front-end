import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Game } from '../shared/models/game';
import { AuthService } from '../shared/services/auth.service';
import { CrudGamesService } from '../shared/services/crud-games.service';
import { faUser, faCalendarDay, faStopwatch, faTachometerAlt, faIndent, faMapPin } from '@fortawesome/free-solid-svg-icons';
import { User } from '../shared/models/user';


@Component({
  selector: 'detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {

  idGame : string = '';
  //user : any;
  owner : any;
  miGame : any;
  faUser = faUser;
  faCalendarDay = faCalendarDay;
  faStopwatch = faStopwatch;
  faTachometerAlt = faTachometerAlt;
  faIndent = faIndent;
  faMapPin = faMapPin;

  constructor(private authService: AuthService, private gameService: CrudGamesService,
    private route : ActivatedRoute) {}

  ngOnInit(): void {
    console.log("ENTRO")
    if(this.authService.isLoggedIn()){
      //this.router.navigate(['/profile']);
      //this.user = this.authService.userData();
      this.idGame = this.route.snapshot.paramMap.get('id') as string; //Id del juego
      this.readGame();
    }else{
      this.idGame = this.route.snapshot.paramMap.get('id') as string; //Id del juego
      this.readGame();
    }
  }

  readGame(){
    console.log(this.idGame);
    this.gameService.readOneGame(this.idGame).subscribe(data =>{ 
      this.miGame = data.data() as Game;
      this.miGame.id = data.id;
      console.log(data.id)
      console.log(this.miGame.idUser)
      this.readOwner(this.miGame.idUser);
    });
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
