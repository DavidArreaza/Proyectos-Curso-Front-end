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
    const uid = this.authService.userData().uid; //Busco el id del usuario para guardar la bio en ese usuario
    return this.fireStore.collection('users').doc(uid).collection('games').add(data);
  }
}
