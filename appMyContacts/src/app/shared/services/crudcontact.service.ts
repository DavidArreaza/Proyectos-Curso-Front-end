import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Contact } from '../models/contact';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CrudcontactService {

  constructor(private fireStore: AngularFirestore, private authService : AuthService) { }

  createContact(data: Contact){
    const uid = this.authService.userData().uid; //Busco el id del usuario para guardar el contanto en ese usuario
    return this.fireStore.collection('users').doc(uid).collection('contacts').add(data);
  }

  /**
   * Lee todos los datos de la colección contacts
   * @returns todos los datos de esa colección
   */
   readAllContacts(){
    const uid = this.authService.userData().uid;
    return this.fireStore.collection('users').doc(uid).collection('contacts').get()
  }

  deleteContact(idContact:string){
    const uid = this.authService.userData().uid;
    return this.fireStore.collection('users').doc(uid).collection('contacts').doc(idContact).delete()
  }

  getContact(idContact:string){
    const uid = this.authService.userData().uid;
    return this.fireStore.collection('users').doc(uid).collection('contacts').doc(idContact).get();
  }

  updateContact(idContact: string, data: any) {
    const uid = this.authService.userData().uid;
    return this.fireStore.collection('users').doc(uid).collection('contacts').doc(idContact).update(data);
  }

}
