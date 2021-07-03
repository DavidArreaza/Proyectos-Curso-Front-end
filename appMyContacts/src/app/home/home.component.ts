import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { faHome, faUserPlus, faSortAmountUpAlt, faTimes, faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user : any;
  faHome = faHome;
  faUserPlus = faUserPlus;
  faSortAmountUpAlt = faSortAmountUpAlt;
  faTimes = faTimes;
  faBars = faBars;
  desplegado = true;

  constructor(private authService : AuthService) { }

  ngOnInit(): void {
    this.user = this.authService.userData();
  }

  logOut(){
    this.authService.signOut();
  }

  openSidebar(){
    if(this.desplegado){
      this.desplegado = false;
    }else{
      this.desplegado = true;
    }
  }


}
