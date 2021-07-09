import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudGamesService } from '../shared/services/crud-games.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'add-games',
  templateUrl: './add-games.component.html',
  styleUrls: ['./add-games.component.css']
})
export class AddGamesComponent implements OnInit {

  
  gameForm : FormGroup;
  uploadPercent: Observable<any> | undefined;
  downloadURL: Observable<string> | undefined;
  misFotos :any = [];
  percent : any;

  constructor(private fb: FormBuilder, private gameService: CrudGamesService, private router: Router,
    private route: ActivatedRoute, private storage : AngularFireStorage) {
      this.gameForm = this.fb.group({
        titulo: ["", Validators.required],
        descripcion: ["", Validators.required],
        jugadores: ["", Validators.required],
        duracion: ["", Validators.required],
        date: ["", Validators.required],
        imagenes: ["", Validators.required],
      });
     }


  ngOnInit(): void {
  }

  uploadFile(event: any) {
    const file = event.target.files[0];
    const filePath = Date.now() + file.name;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file)
    console.log(task)
    // observe percentage changes
    task.percentageChanges().subscribe(number => {
      this.percent = number!
    })
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL()
          //this.misFotos.push(this.downloadURL)
          this.downloadURL.subscribe(data => {
            this.gameForm.patchValue({
              image: data
            })
          })
        })
     )
    .subscribe()
  }

  imprimirMisFoto(){
    console.log(this.misFotos);
  }

}
