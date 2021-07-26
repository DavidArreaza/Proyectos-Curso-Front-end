import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Game } from '../models/game';
import { Msn } from '../models/msn';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CrudGamesService {

  constructor(private fireStore: AngularFirestore, private authService: AuthService) { }

  createGame(data: Game){ 
    return this.fireStore.collection('games').add(data);
  }

  readAllGames(){
    return this.fireStore.collection('games').get()
  }

  updateGame(id: string, data: Game){
    return this.fireStore.collection('games').doc(id).update(data);
  }

  readOneGame(id: any){
    return this.fireStore.collection('games').doc(id).get();
  }

  deleteGame(id:string){
    return this.fireStore.collection('games').doc(id).delete();
  }

  readOwnerGamer(idUser: string){
    return this.fireStore.collection('users').doc(idUser).get();
  }

  createMsn(data: Msn){
    return this.fireStore.collection('msn').add(data);
  }

  readAllMsn(){
    return this.fireStore.collection('msn').get();
  }

  deleteMsn(id :string){
    return this.fireStore.collection('msn').doc(id).delete();
  }

}
