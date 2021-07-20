import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { faHome, faUserPlus, faSortAmountUpAlt, faTimes, faBars, faUser } from '@fortawesome/free-solid-svg-icons';
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
  faUser = faUser;
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

  editarContacat(idContact : any){
    this.router.navigate(["edit/"+idContact]);
  }

  buscarContact(event: any){
    this.serviceContacts.readAllContacts().subscribe(data =>{
      this.misContacts = [];
      data.forEach((doc : any) =>{
        let myContact : Contact = doc.data();
        myContact.id = doc.id;

        if(myContact.nombre.toUpperCase().includes(event.target.value.toUpperCase())){
          this.misContacts.push(myContact);
        }
        
      })
    })
      if(this.misContacts.length == 0){
        this.notifier.notify('warning', 'No se han encontrado datos');
      }
  }

  filtroAmigos(){
    this.serviceContacts.readAllContacts().subscribe(data => {
      this.misContacts = [];
      data.forEach((doc : any) => {
        let myContact : Contact = doc.data();
        myContact.id = doc.id;
        if(myContact.nombre == "Amigos"){
          this.misContacts.push(myContact);
        }
      })
      if(this.misContacts.length == 0){
        this.notifier.notify('warning', 'No se han encontrado datos');
      }
    });
  }

  filtroFamilia(){
    this.serviceContacts.readAllContacts().subscribe(data => {
      this.misContacts = [];
      data.forEach((doc : any) => {
        let myContact : Contact = doc.data();
        myContact.id = doc.id;
        if(myContact.nombre == "Familia"){
          this.misContacts.push(myContact);
        }
      })
      if(this.misContacts.length == 0){
        this.notifier.notify('warning', 'No se han encontrado datos');
      }
    });
  }

  filtroTrabajo(){
    this.serviceContacts.readAllContacts().subscribe(data => {
      this.misContacts = [];
      data.forEach((doc : any) => {
        let myContact : Contact = doc.data();
        myContact.id = doc.id;
        if(myContact.nombre == "Trabajo"){
          this.misContacts.push(myContact);
        }
      })
      if(this.misContacts.length == 0){
        this.notifier.notify('warning', 'No se han encontrado datos');
      }
    });
  }

  filtroOtros(){
    this.serviceContacts.readAllContacts().subscribe(data => {
      this.misContacts = [];
      data.forEach((doc : any) => {
        let myContact : Contact = doc.data();
        myContact.id = doc.id;
        if(myContact.nombre == "Otros"){
          this.misContacts.push(myContact);
        }
      })
      if(this.misContacts.length == 0){
        this.notifier.notify('warning', 'No se han encontrado datos');
      }
    });
  }

}
