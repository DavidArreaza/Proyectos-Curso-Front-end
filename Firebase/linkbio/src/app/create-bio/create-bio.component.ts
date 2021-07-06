import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { MiniBio } from '../shared/models/minibio';
import { MinibioService } from '../shared/services/minibio.service';

@Component({
  selector: 'create-bio',
  templateUrl: './create-bio.component.html',
  styleUrls: ['./create-bio.component.scss']
})
export class CreateBioComponent implements OnInit {

  bioForm : FormGroup;
  idBio : any;
  isEdit = false;  

  constructor(private fb: FormBuilder, private notifier: NotifierService,
     private bioService: MinibioService, private route: ActivatedRoute, private router: Router) {

    this.bioForm = this.fb.group({
      title: ["", Validators.required],
      description: ["", Validators.required],
      image: ["", Validators.required],
      linktitle1: ["", Validators.required],
      link1: ["", Validators.required],
      linktitle2: ["", Validators.required],
      link2: ["", Validators.required]
    });

    this.idBio = this.route.snapshot.paramMap.get('id') // Lo cojo otra vez de la ruta porque se ejecuta antes que el oninit
    if(this.idBio) { 
      this.isEdit = true;

      this.bioService.getBio(this.idBio).subscribe(data => {

        const minibio: any = data.data()
        minibio.id = data.id

        this.bioForm.patchValue(minibio)

      })
    }

   }

  ngOnInit(): void {
    this.idBio = this.route.snapshot.paramMap.get('id') as string; //Cojo el id de la url
  }

  get f(){
    return this.bioForm.controls;
  }

  saveBio(){
    
    const minibio :  MiniBio = {
      title : this.f.title.value,
      description : this.f.description.value,
      image : this.f.image.value,
      linktitle1 : this.f.linktitle1.value,
      link1 : this.f.url1.value,
      linktitle2 : this.f.linktitle2.value,
      link2 : this.f.url2.value,
    }

    if(this.bioForm.invalid){
      console.error("No es valido");
      return;
    }
    
    console.log("Guarda minibio");
    this.bioService.createMinibio(minibio).then(success =>{
      this.notifier.notify('success', 'Todo OK!');
      this.router.navigate(["/profile"]);
    }).catch(error => {
      this.notifier.notify('error', 'Error');
    });
  }

  updateBio(){
    if(this.bioForm.invalid) {
      this.notifier.notify('error', 'Los datos no son válidos');
      return
    }

    console.log("Actualizar minibio", this.bioForm.value)

    this.bioService.updateMinibio(this.idBio, this.bioForm.value).then(success => {
      this.notifier.notify('success', "Actualizado!")
      this.router.navigate(["/profile"])
    }).catch(error =>  {
      this.notifier.notify('error', 'Ups, ha ocurrido un error');
    })
  }

}
