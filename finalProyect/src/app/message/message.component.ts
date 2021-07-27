import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Msn } from '../shared/models/msn';
import { AuthService } from '../shared/services/auth.service';
import { CrudGamesService } from '../shared/services/crud-games.service';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  user : any;
  misMsn : Array<Msn> = [];

  faEnvelope = faEnvelope;

  constructor(private gameService: CrudGamesService, private authService : AuthService, private router: Router,
    private notifier: NotifierService) { }

  ngOnInit(): void {
    this.user = this.authService.userData();
    this.readAllMsn();
  }

  readAllMsn(){
    this.gameService.readAllMsn().subscribe(data => {
      this.misMsn = [];
      data.forEach((doc : any) => {
        let newMsn: Msn = doc.data();
        newMsn.uid = doc.id;
        if(newMsn.idUserGame == this.user.uid){
          this.misMsn.push(newMsn);
        }
      })
    })
  }

  rechazar(idMsn : any){
    this.gameService.deleteMsn(idMsn).then(success => {
      this.notifier.notify('success', "Mensaje Eliminado");
      this.readAllMsn();
    }).catch(error => {
      this.notifier.notify('error', "Error");
    })
  }

  back(){
    this.router.navigate(['home/'+this.user.uid]);
  }

}
