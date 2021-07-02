import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user : any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.user = this.authService.userData();
  }

  logOut(){
    this.authService.signOut();
  }


}
