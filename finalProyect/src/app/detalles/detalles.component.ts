import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Game } from '../shared/models/game';
import { AuthService } from '../shared/services/auth.service';
import { CrudGamesService } from '../shared/services/crud-games.service';
import { faUser, faCalendarDay, faStopwatch, faTachometerAlt, faIndent, faMapPin } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {

  id : string = '';
  miGame : any;
  faUser = faUser;
  faCalendarDay = faCalendarDay;
  faStopwatch = faStopwatch;
  faTachometerAlt = faTachometerAlt;
  faIndent = faIndent;
  faMapPin = faMapPin;

  constructor(private authService: AuthService, private gameService: CrudGamesService,
     private notifer: NotifierService, private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') as string; //Id del juego
    this.readGame();
  }

  readGame(){
    this.gameService.readOneGame(this.id).subscribe(data =>{
      console.log(data.data());
      this.miGame = data.data() as Game;
    })
  }

}
