import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if(this.authService.isLoggedIn()){
      this.router.navigate(['/profile']);
    }
  }

  login(){
    this.authService.googleAuth().then( success => {
      this.router.navigate(['/profile'])
    }).catch(error => {
      console.error("Error en el login")
    })
  }

}
