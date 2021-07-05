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
   * Lee todos los datos de una colección
   * @returns todos los datos de esa colección
   */
   readAllPost(){
    return this.fireStore.collection('contacts').get();
  }

}
