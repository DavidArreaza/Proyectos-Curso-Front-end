import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons';
import { Contact } from '../shared/models/contact';
import { CrudcontactService } from '../shared/services/crudcontact.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {

  faCameraRetro = faCameraRetro;
  urlimg = "https://i.imgur.com/lQmWiXN.jpg";

  cForm : FormGroup;

  constructor(private fb: FormBuilder, private serviceContact: CrudcontactService, private notifier: NotifierService) {
    this.cForm = this.fb.group({
      nombre: ["", Validators.required], 
      numero: ["", Validators.required],
      img: ["", Validators.required],
      email: ["", Validators.required],
      grupo: ["", Validators.required]
    });
    
   }

  ngOnInit(): void {
  }

  get f(){
    return this.cForm.controls;
  }

  crearContact(){

    const contact : Contact = {
      nombre: this.f.nombre.value,
      numero: this.f.numero.value,
      img: this.f.img.value,
      email: this.f.email.value,
      grupo: this.f.grupo.value
    }
    
    if(this.cForm.invalid){
      console.error("No es valido");
      return;
    }
    this.serviceContact.createContact(contact).then(success =>{
      this.notifier.notify('success', 'Todo OK!');
    }).catch(error => {
      this.notifier.notify('error', 'Error');
    });
  }

}
