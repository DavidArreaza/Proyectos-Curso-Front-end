import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { throwError } from 'rxjs';
import fireapp from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireStore: AngularFirestore, private fireAuth: AngularFireAuth, private router: Router) { }

  /**
   * Guardar datos de un usuario
   * @param user 
   * @returns 
   */
  setUserData(user: any) {
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return this.fireStore.doc(`users/${user.uid}`).set(userData, {
      merge: true
    })
  }

  /**
   * Para saber si esta loggeado
   * @returns true si está loggeado y false si no lo está
   */
  isLoggedIn(): boolean {
    const user = localStorage.getItem('user');
    if(user) {
      return true
    }
    return false
  }

  /**
   * Registo con Google
   * @returns 
   */
  googleAuth(): Promise<any> {
    return this.fireAuth.signInWithPopup(new fireapp.auth.GoogleAuthProvider())
     .then((result) => {
       localStorage.setItem('user', JSON.stringify(result.user)); //Llama a setUserData para guardarlo en Firebase
       this.setUserData(result.user);
     }).catch((error) => {
        throwError(error)
     })
   }

  /**
   * 
   * @returns 
   */
  userData(): User {
    return JSON.parse(localStorage.getItem('user')!)
  }

  /**
   * 
   * @returns 
   */
  signOut() {
    return this.fireAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/']);
    })
  }
}
