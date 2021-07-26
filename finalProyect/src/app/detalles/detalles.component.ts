import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Game } from '../shared/models/game';
import { AuthService } from '../shared/services/auth.service';
import { CrudGamesService } from '../shared/services/crud-games.service';
import { faUser, faCalendarDay, faStopwatch, faTachometerAlt, faIndent, faMapPin } from '@fortawesome/free-solid-svg-icons';
import { User } from '../shared/models/user';
import { Msn } from '../shared/models/msn';


@Component({
  selector: 'detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {

  idGame : string = '';
  idUser : string = '';
  owner : any;
  miGame : any;
  faUser = faUser;
  faCalendarDay = faCalendarDay;
  faStopwatch = faStopwatch;
  faTachometerAlt = faTachometerAlt;
  faIndent = faIndent;
  faMapPin = faMapPin;
  imgs : string[] = [];
  jugar = true;

  constructor(private authService: AuthService, private gameService: CrudGamesService,
    private route : ActivatedRoute, private notifier : NotifierService, private router : Router) {}

  ngOnInit(): void {
    this.idUser = this.authService.userData().uid;
    if(this.authService.isLoggedIn()){
      this.idGame = this.route.snapshot.paramMap.get('id') as string; //Id del juego
      this.readGame();
    }else{
      this.idGame = this.route.snapshot.paramMap.get('id') as string; //Id del juego
      this.readGame();
    }
  }

  readGame(){
    this.gameService.readOneGame(this.idGame).subscribe(data =>{ 
      this.miGame = data.data() as Game;
      this.miGame.id = data.id;
      this.imgs.push(this.miGame.imgagenes);
      this.imgs.push(this.miGame.imgagenes2);

      this.readOwner(this.miGame.idUser);
    });
  }

  readOwner(idUser : string){
    this.gameService.readOwnerGamer(idUser).subscribe(data => {
      if(data.exists){
        this.owner = data.data() as User;
        if(this.owner.uid == this.idUser){
          this.jugar = false;
        }
      }else{
        console.log("NO ENCONTRADO")
      }
    })
  }

  sendMsn(){

    const msn : Msn = {
      idUserGame : this.owner.uid, //Id del dueño del juego
      idUserAdd : this.authService.userData().uid,//Id del usuario conectado
      idGame : this.miGame.id,
      nameGame : this.miGame.titulo,
      message : (this.authService.userData().displayName + ' quiere uniser a tu partida')
    }

    this.gameService.createMsn(msn).then(success =>{
      this.notifier.notify('success', 'Todo OK!');
      this.router.navigate(["home/"+this.idUser]);
    }).catch(error => {
      this.notifier.notify('error', 'Error');
    });
  }

}
