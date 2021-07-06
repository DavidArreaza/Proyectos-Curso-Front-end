import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { faHome, faUserPlus, faSortAmountUpAlt, faTimes, faBars } from '@fortawesome/free-solid-svg-icons';
import { ifStmt } from '@angular/compiler/src/output/output_ast';
import { CrudcontactService } from '../shared/services/crudcontact.service';
import { Contact } from '../shared/models/contact';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';

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
  faTimes = faTimes;
  faBars = faBars;
  desplegado = true;
  addContact = false;
  misContacts : Array<Contact> = [];

  constructor(private authService : AuthService, private serviceContacts : CrudcontactService,
    private notifier: NotifierService, private router: Router) { 
    this.loadAllContacts();
  }

  ngOnInit(): void {
    this.user = this.authService.userData();
  }

  logOut(){
    this.authService.signOut();
  }

  openSidebar(){
    if(this.desplegado){
      this.desplegado = false;
    }else{
      this.desplegado = true;
    }
  }

  /*openAddContact(){
    console.log("Pulsado");
    if(!this.addContact){
      this.addContact = true;
      console.log("Abro añadir contacto");
    }else{
      this.addContact = false;
      console.log("Cierro añadir contacto");
    }
  }*/

  buscarContact(event : any){
    /*this.serviceContacts.getContactName(event.target.value).subscribe(data =>{
      this.misContacts = [];
      data.forEach((doc : any) => {
        let myContact : Contact = doc.data();
        myContact.id = doc.id;
        console.log(myContact)
        this.misContacts.push(myContact);
      });
    });*/
  }

  loadAllContacts(){
    this.serviceContacts.readAllContacts().subscribe(data =>{
      this.misContacts = [];
      data.forEach((doc : any) =>{
        let myContact : Contact = doc.data();
        myContact.id = doc.id;
        console.log(myContact)
        this.misContacts.push(myContact);
      })
    })
    console.log(this.misContacts)
  }

  eliminarContacat(idContact: any){
    this.serviceContacts.deleteContact(idContact).then(success => {
      this.notifier.notify('success', 'Eliminado');
      this.loadAllContacts();
    }).catch(error => {
      this.notifier.notify('error', 'Error');
    })
  }

}
