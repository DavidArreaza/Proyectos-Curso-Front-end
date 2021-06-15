import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MyContacts';

  nombreContacto = '';

  contacts = [{name: 'Mamá', number: '123456789', save: 'SIM', grupo: 'familia', selectDelete: false},
  {name: 'Ángel', number: '987654321', save: 'phone', grupo: 'amigos', selectDelete: false},
  {name: 'Fran', number: '147852369', save: 'phone', grupo: 'amigos', selectDelete: false},
  {name: 'Papá', number: '369852147', save: 'SIM', grupo: 'familia', selectDelete: false}, ];

  /**
   * Método que recibe la información del hijo
   * @param contact 
   */
  add(contact: any){
    contact.selectDelete = false;
    //alert(contact.selectDelete); //Si guarda seletDelete = false
    this.contacts.push(contact);
  }

  reciboLista(nombre: string){
    alert("Recibo: " + nombre);
    this.nombreContacto = nombre;
  }

}
