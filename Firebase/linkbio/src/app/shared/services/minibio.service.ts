import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MiniBio } from '../models/minibio';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MinibioService {

  constructor(private fireStore: AngularFirestore, private authService : AuthService) { }

  createMinibio(data: MiniBio){
    const uid = this.authService.userData().uid; //Busco el id del usuario para guardar la bio en ese usuario
    return this.fireStore.collection('users').doc(uid).collection('minibios').add(data);
  }

  readAllBios(){
    /*return this.fireStore.collection('minibios').get();*/
    const uid = this.authService.userData().uid;
    return this.fireStore.collection('users').doc(uid).collection('minibios').get()
  }

  deleteMinibio(idBio:string){
    const uid = this.authService.userData().uid;
    return this.fireStore.collection('users').doc(uid).collection('minibios').doc(idBio).delete()
  }

  getBio(idBio:string){
    const uid = this.authService.userData().uid;
    return this.fireStore.collection('users').doc(uid).collection('minibios').doc(idBio).get();
  }

  updateMinibio(idBio: string, data: any) {
    const uid = this.authService.userData().uid;
    return this.fireStore.collection('users').doc(uid).collection('minibios').doc(idBio).update(data);
  }

  getMiniBioPublic(userid: string, id: string) {
    return this.fireStore.collection('users').doc(userid).collection('minibios').doc(id).get()
  }

}
