import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudGamesService } from '../shared/services/crud-games.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { NotifierService } from 'angular-notifier';
import { AuthService } from '../shared/services/auth.service';
import listaCiudades from 'src/assets/json/ciudades.json';

@Component({
  selector: 'add-games',
  templateUrl: './add-games.component.html',
  styleUrls: ['./add-games.component.css']
})
export class AddGamesComponent implements OnInit {

  
  gameForm : FormGroup;
  uploadPercent: Observable<any> | undefined;
  downloadURL: Observable<string> | undefined;
  misFotos : string[] = [];
  percent : any;
  uid : string = '';
  Ciudades : any = listaCiudades;
  idGame = '';
  isEdit = false;

  constructor(private fb: FormBuilder, private gameService: CrudGamesService, private router: Router, private authService: AuthService,
    private route: ActivatedRoute, private storage : AngularFireStorage, private notifier: NotifierService) {
      
      this.uid = this.authService.userData().uid;
      
      this.gameForm = this.fb.group({
        idUser: [this.uid],
        titulo: ["", Validators.required],
        descripcion: ["", Validators.required],
        jugadores: ["", Validators.required],
        categoria: ["", Validators.required],
        dificultad: ["", Validators.required],
        duracion: ["", Validators.required],
        localizacion: ["", Validators.required],
        date: ["", Validators.required],
        imagenes: ["", Validators.required],
      });

      this.idGame = this.route.snapshot.paramMap.get('id') as string;
      if(this.idGame){
        this.isEdit = true;
        this.gameService.readOneGame(this.idGame).subscribe(data => {
          const migame : any = data.data();
          migame.id = data.id;
          this.gameForm.patchValue(migame);
        })
      }
      
     }


  ngOnInit(): void {
    this.uid = this.authService.userData().uid;
    this.idGame = this.route.snapshot.paramMap.get('id') as string; //Cojo el id de la url
  }
  

  get f(){
    return this.gameForm.controls;
  }

  saveGame(){
    this.gameForm.patchValue({})

    if(this.gameForm.invalid){
      console.error("No es valido");
      console.log(this.gameForm.value)
      return;
    }
    
    console.log("Creado!");
    this.gameService.createGame(this.gameForm.value).then(success =>{
      this.notifier.notify('success', 'Todo OK!');
      //this.router.navigate(["/profile"]);
    }).catch(error => {
      this.notifier.notify('error', 'Error');
    });
  }


  uploadFile(event: any) {
    const file = event.target.files[0];
    const filePath = Date.now() + file.name;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file)
    //console.log(task)
    // observe percentage changes
    task.percentageChanges().subscribe(number => {
      this.percent = number!
    })
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL()
          this.downloadURL.subscribe(data => {
            this.gameForm.patchValue({
              imagenes: data
            }), console.log("ADFAFAF "+ this.misFotos)
          })
        })
     )
    .subscribe()
  }


}
