import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavigationEnd, Router } from '@angular/router';
import { Msn } from '../shared/models/msn';
import { AuthService } from '../shared/services/auth.service';
import { CrudGamesService } from '../shared/services/crud-games.service';

@Component({
  selector: 'barranav',
  templateUrl: './barranav.component.html',
  styleUrls: ['./barranav.component.css']
})
export class BarranavComponent implements OnInit {

  user : any;
  pulsado = false;
  logueado = false;
  misMsn : Array<Msn> = [];
  contador = 0;

  constructor(private gameService: CrudGamesService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if(this.authService.isLoggedIn()){
      this.user = this.authService.userData();
      this.router.navigate(['home/'+this.user.uid]);
      this.readAllMsn();
      this.logueado = true;
    }else{
      this.router.navigate(['home']);
    }
  }

  login(){
    this.authService.googleAuth().then( success => {
      this.router.navigate(['home/'+this.authService.userData().uid])
      this.logueado = true;
      this.ngOnInit();
    }).catch(error => {
      console.error("Error en el login", error);
    })
  }

  logOut(){
    this.logueado = false;
    this.authService.signOut();
  }

  openEdit(){
    this.router.navigate(["edit/"+this.user.uid]);
  }

  readAllMsn(){
    this.gameService.readAllMsn().subscribe(data => {
      this.misMsn = [];
      data.forEach((doc : any) => {
        let newMsn: Msn = doc.data();
        newMsn.uid = doc.id;
        if(newMsn.idUserAdd != this.user.uid){
          this.misMsn.push(newMsn);
          this.contador = this.misMsn.length;
        }
      })
    })
  }

}
