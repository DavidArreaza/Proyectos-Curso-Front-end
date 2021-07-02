import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Post } from 'src/app/models/post.model';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private fireStore: AngularFirestore) { }

  /**
   * Crear un objeto en la colección post con id automático
   * @param data nuevos datos
   * @returns creación en firebase
   */
  newPost(data: Post){
    return this.fireStore.collection('posts').add(data);
  }

  /**
   * Lee todos los datos de una colección
   * @returns todos los datos de esa colección
   */
  readAllPost(){
    return this.fireStore.collection('posts').get();
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  getPost(id: string){
    return this.fireStore.collection('posts').doc(id).get();
  }

  /**
   * Actualiza los datos de un post
   * @param id del post para actualizar
   * @param data 
   * @returns 
   */
  updatePost(id: string, data: Post){
    return this.fireStore.collection('posts').doc(id).update(data);
  }

  /**
   * Elimina un post específico
   * @param id del post para borrar 
   * @returns 
   */
  deletePost(id: string){
    return this.fireStore.collection('posts').doc(id).delete();
  }
}
