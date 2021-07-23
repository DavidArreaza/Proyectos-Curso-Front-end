import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'barranav',
  templateUrl: './barranav.component.html',
  styleUrls: ['./barranav.component.css']
})
export class BarranavComponent implements OnInit {

  user : any;
  pulsado = false;
  logueado = false;

  constructor(private authService: AuthService, private router: Router) { 
    
  }

  ngOnInit(): void {
    if(this.authService.isLoggedIn()){
      this.user = this.authService.userData();
      this.router.navigate(['home/'+this.user.uid]);
      this.logueado = true;
    }else{
      this.router.navigate(['home']);
    }
  }

  login(){
    this.authService.googleAuth().then( success => {
      this.router.navigate(['home/'+this.user.uid])
      this.logueado = true;
    }).catch(error => {
      console.error("Error en el login");
    })
  }

  logOut(){
    this.logueado = false;
    this.authService.signOut();
  }

  openEdit(){
    this.router.navigate(["edit/"+this.user.uid]);
  }

}
