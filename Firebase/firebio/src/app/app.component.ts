import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Post } from './models/post.model';
import { CrudService } from './shared/services/crud.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Demo Firebase';
  users : Observable<any[]>;
  misPosts : Array<Post> = [];

  constructor(firestore: AngularFirestore, private crudPost : CrudService){
    this.users = firestore.collection('users').valueChanges();

    this.readAllPosts();
    this.loadOnePost();
  }

  createPost(){
    const publicacion : Post = {
      author : 'ROK3FYIZGLmZ3fFMuNPD',
      content : 'Loren ipsum....',
      title : 'Titulo noticia',
      date : new Date()
    };

    this.crudPost.newPost(publicacion).then( success => {
      console.log("OK!");
    }).catch(error => {
      console.error("No se ha creado");
    })

  }

  readAllPosts(){
    this.crudPost.readAllPost().subscribe(data => {

      data.forEach((doc : any) => {
        let myPost : Post = doc.data();
        myPost.id = doc.id;

        this.misPosts.push(myPost);
      })
    })
  }

  loadOnePost(){
    this.crudPost.getPost("DNdqgUpC6or4h6bhoEBP").subscribe( data =>{
      console.log("El id es: ", data.id, " y los datos son ", data.data())
    })
  }

  updatePost(){
    const publicacion : Post = {
      author : '"ROK3FYIZGLmZ3fFMuNPD',
      content : 'Loren ipsum....',
      title : 'Titulo noticia 2 Actualizada',
      date : new Date()
    };

    this.crudPost.updatePost("DNdqgUpC6or4h6bhoEBP", publicacion).then( success => {
      console.log("Post cread", success)
    }).catch( error => {
      console.log("Error ", error)
    })


  }

  deletePost(){
    this.crudPost.deletePost("ROK3FYIZGLmZ3fFMuNPD");
  }

}
