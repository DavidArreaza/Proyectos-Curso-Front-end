import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'linkbio';
  //items: Observable<any[]>;
  showMenu = false;
  constructor(firestore: AngularFirestore, private router: Router) {
    router.events.subscribe(evento => {
      if(evento instanceof NavigationEnd){
        if(this.router.url == "/"){
          this.showMenu = false;
        }else{
          this.showMenu = true;
        }
      }
    })
  }

}
