import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { Game } from '../shared/models/game';
import { AuthService } from '../shared/services/auth.service';
import { CrudGamesService } from '../shared/services/crud-games.service';
import { faArrowRight, faStar } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
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

  faArrowRight = faArrowRight;
  faStar = faStar;

  constructor(private authService : AuthService, private gameService : CrudGamesService,
    private fb: FormBuilder, private notifier : NotifierService, private route: ActivatedRoute, private router: Router) {

      this.idUserGame = this.route.snapshot.paramMap.get('id') as string;
  }

  ngOnInit(): void {
    this.readOwner(this.idUserGame);
    this.readAllGamesUser();
  }

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
  
  openGame(idGame : any){ 
    this.router.navigate(["detalles/"+idGame]);
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
