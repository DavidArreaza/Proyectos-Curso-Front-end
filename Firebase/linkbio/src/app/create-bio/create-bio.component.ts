import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private fb: FormBuilder, private notifier: NotifierService, private bioService: MinibioService) {
    this.bioForm = this.fb.group({
      title: ["", Validators.required],
      description: ["", Validators.required],
      urlimg: ["", Validators.required],
      linktitle1: ["", Validators.required],
      url1: ["", Validators.required],
      linktitle2: ["", Validators.required],
      url2: ["", Validators.required]
    });
   }

  ngOnInit(): void {}

  get f(){
    return this.bioForm.controls;
  }

  saveBio(){
    
    const minibio :  MiniBio = {
      title : this.f.title.value,
      description : this.f.description.value,
      image : this.f.urlimg.value,
      linktitle1 : this.f.linktitle1.value,
      link1 : this.f.url1.value,
      linktitle2 : this.f.linktitle2.value,
      link2 : this.f.url2.value,
    }

    if(this.bioForm.valid){
      console.error("No es valido");
      return;
    }
    
    console.log("Guarda minibio");
    this.bioService.createMinibio(minibio).then(success =>{
      this.notifier.notify('success', 'Todo OK!')
    }).catch(error => {
      this.notifier.notify('error', 'Error')
    });
  }

}
