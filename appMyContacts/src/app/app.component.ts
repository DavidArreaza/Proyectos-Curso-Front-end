import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'appMyContacts';

  constructor(firestore: AngularFirestore) {  } //Esto se pone en todos los sitios donde se haga crud


}
