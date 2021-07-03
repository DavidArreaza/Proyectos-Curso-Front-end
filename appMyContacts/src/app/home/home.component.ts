import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { faHome, faUserPlus, faSortAmountUpAlt } from '@fortawesome/free-solid-svg-icons';

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

  constructor(private authService : AuthService) { }

  ngOnInit(): void {
    this.user = this.authService.userData();
  }

}
