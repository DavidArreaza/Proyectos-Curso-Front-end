import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Game } from '../models/game';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CrudGamesService {

  constructor(private fireStore: AngularFirestore, private authService: AuthService) { }

  createGame(data: Game){
    return this.fireStore.collection('games').add(data);
  }

  /*createGame(data: Game){
    const uid = this.authService.userData().uid; //Busco el id del usuario para guardar la bio en ese usuario
    return this.fireStore.collection('users').doc(uid).collection('games').add(data);
  }*/

  readAllGames(){
    /*return this.fireStore.collection('minibios').get();*/
    //const uid = this.authService.userData().uid;
    return this.fireStore.collection('games').get()
  }

  readGamesUser(id : string){ //Corregir
    /*return this.fireStore.collection('minibios').get();*/
    //const uid = this.authService.userData().uid;
    //return this.fireStore.collection('games').doc(uid).collection('games').get()
    //return this.fireStore.collection('games').doc(id).get();
  }

  updateGame(id: string, data: Game){
    return this.fireStore.collection('games').doc(id).update(data);
  }

  readOneGame(id: any){
    return this.fireStore.collection('games').doc(id).get();
  }

  deleteGame(idGame:string){
    return this.fireStore.collection('games').doc(idGame).delete();
  }
}
