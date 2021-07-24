import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons';
import { Contact } from '../shared/models/contact';
import { CrudcontactService } from '../shared/services/crudcontact.service';
import { NotifierService } from 'angular-notifier';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {

  faCameraRetro = faCameraRetro;
  percent : any;
  uploadPercent: Observable<any> | undefined;
  downloadURL: Observable<string> | undefined;
  foto = false;
  idUser = '';
  isEdit = false;
  contact : any;

  cForm : FormGroup;

  constructor(private fb: FormBuilder, private serviceContact: CrudcontactService, private storage : AngularFireStorage,
     private notifier: NotifierService, private route: ActivatedRoute, private router: Router) {

    this.cForm = this.fb.group({
      nombre: ["", Validators.required], 
      numero: ["", Validators.required],
      img: [""],
      email: ["", Validators.required],
      grupo: ["", Validators.required]
    });

    this.idUser = this.route.snapshot.paramMap.get('id') as string;
    if(this.idUser){
      this.isEdit = true;
      this.serviceContact.getContact(this.idUser).subscribe(data => {
        this.contact = data.data() as Contact;
        this.contact.id = data.id;
        this.cForm.patchValue(this.contact);
      })
    }
   }

  ngOnInit(): void {}

  get f(){
    return this.cForm.controls;
  }

  crearContact(){

    const contact : Contact = {
      nombre: this.f.nombre.value,
      numero: this.f.numero.value,
      img: this.f.img.value,
      email: this.f.email.value,
      grupo: this.f.grupo.value
    }
    
    if(this.cForm.invalid){
      console.error("No es valido");
      return;
    }
    this.serviceContact.createContact(contact).then(success =>{
      this.notifier.notify('success', 'Todo OK!');
      this.router.navigate(["/home"]);
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
            this.cForm.patchValue({
              img: data
            })
          }), this.foto = true;
        })
     )
    .subscribe()
  }

  actualizarContact(){
    this.serviceContact.updateContact(this.idUser, this.cForm.value).then(success => {
      this.notifier.notify('success', 'Contacto actualizado')
      this.router.navigate(["/home"]);
    }).catch(error => {
      this.notifier.notify('error', 'Contacto actualizado')
    })
  }

  cancelar(){
    this.router.navigate(["/home"]);
  }

}
