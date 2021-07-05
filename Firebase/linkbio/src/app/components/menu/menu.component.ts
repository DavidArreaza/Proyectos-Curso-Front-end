import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  user : any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.user = this.authService.userData();
  }

  logOut(){
    this.authService.signOut();
  }

}
