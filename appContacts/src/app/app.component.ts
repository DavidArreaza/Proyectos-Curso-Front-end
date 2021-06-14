import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'appContacts';

  contacts = [{name: 'Mamá', number: '123456789', save: 'SIM', grupo: 'familia'},
  {name: 'Ángel', number: '987654321', save: 'phone', grupo: 'amigos'},
  {name: 'Fran', number: '147852369', save: 'phone', grupo: 'amigos'},
  {name: 'Papá', number: '369852147', save: 'SIM', grupo: 'familia'}]


}
