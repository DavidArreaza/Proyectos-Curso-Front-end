import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  login(){
    this.authService.googleAuth().then( success => {
      this.router.navigate(['/'])
    }).catch(error => {
      console.error("Error en el login")
    })
  }

}
