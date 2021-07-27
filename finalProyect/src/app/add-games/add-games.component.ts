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
import { Game } from '../shared/models/game';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'add-games',
  templateUrl: './add-games.component.html',
  styleUrls: ['./add-games.component.css']
})
export class AddGamesComponent implements OnInit {

  
  gameForm : FormGroup;
  uid : string = '';
  Ciudades : any = listaCiudades;
  idGame = '';
  isEdit = false;
  miGame : any;
  fecha : any;
  percent : any;

  uploadPercent: Observable<any> | undefined;
  downloadURL: Observable<string> | undefined;
  downloadURLImg2: Observable<string> | undefined;

  faArrowLeft = faArrowLeft;

  constructor(private fb: FormBuilder, private gameService: CrudGamesService, private router: Router, private authService: AuthService,
    private route: ActivatedRoute, private storage : AngularFireStorage, private notifier: NotifierService) {
      
      this.uid = this.authService.userData().uid;
      const date = new Date();
      const mes = date.getMonth() + 1
      this.fecha = date.getFullYear() + '-' + mes + '-' + date.getDate();
      console.log(this.fecha)
      
      this.gameForm = this.fb.group({
        idUser: [this.uid],
        titulo: ["", Validators.required, Validators.minLength(4)],
        descripcion: ["", Validators.required],
        jugadores: ["", Validators.required, Validators.min(2)],
        categoria: ["", Validators.required],
        dificultad: ["", Validators.required],
        duracion: ["", Validators.required],
        localizacion: ["", Validators.required],
        date: ["", Validators.required],
        imagenes: ["", Validators.required],
        imagenes2: ["", Validators.required],
      });

      this.idGame = this.route.snapshot.paramMap.get('id') as string;
      if(this.idGame){
        this.isEdit = true;
        this.gameService.readOneGame(this.idGame).subscribe(data => {
          this.miGame = data.data() as Game;
          this.miGame.id = data.id;
          this.gameForm.patchValue(this.miGame);
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
    if(this.gameForm.invalid){
      this.notifier.notify('error', 'Complete el formulario correctamente');
      return;
    }
    
    this.gameService.createGame(this.gameForm.value).then(success =>{
      this.notifier.notify('success', 'Todo OK!');
      this.router.navigate(["home/"+this.uid]);
    }).catch(error => {
      this.notifier.notify('error', 'Error');
    });
  }

  uploadFile(event: any) {
    const file = event.target.files[0];
    const filePath = Date.now() + file.name;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file)
    
    task.percentageChanges().subscribe(number => {
      this.percent = number!
    })
    task.snapshotChanges().pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL()
          this.downloadURL.subscribe(data => {
            this.gameForm.patchValue({
              imagenes: data
            })
          })
        })
    )
    .subscribe()
  }

  uploadFileImg2(event: any) {
    const file = event.target.files[0];
    const filePath = Date.now() + file.name;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file)
    
    task.percentageChanges().subscribe(number => {
      this.percent = number!
    })
    task.snapshotChanges().pipe(
        finalize(() => {
          this.downloadURLImg2 = fileRef.getDownloadURL()
          this.downloadURLImg2.subscribe(data => {
            this.gameForm.patchValue({
              imagenes2: data
            })
          })
        })
    )
    .subscribe()
  }

  updateGame(){
    if(this.gameForm.invalid){
      this.notifier.notify('error', 'Los datos no son válidos');
      return;
    }
    this.gameService.updateGame(this.idGame, this.gameForm.value).then(success => {
      this.notifier.notify('success', 'Actualizado!');
      this.router.navigate(["/home/"+this.uid]);
    }).catch(error => {
      this.notifier.notify('error', '¡Ups! Parace que algo salió mal');
    })
  }

  back(){
      this.router.navigate(["home/"+this.uid]);
  }

}
