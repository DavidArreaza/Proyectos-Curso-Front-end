import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { MiniBio } from '../shared/models/minibio';
import { AuthService } from '../shared/services/auth.service';
import { MinibioService } from '../shared/services/minibio.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user : any;
  misMinibios: Array<MiniBio> = [];
  isEdit = false;

  constructor(private authService: AuthService, private bioService: MinibioService,
     private notifier: NotifierService, private router: Router) { }

  ngOnInit(): void {
    this.user = this.authService.userData();
    this.loadAllBios();
  }

  logOut(){
    this.authService.signOut();
  }

  loadAllBios(){
    this.bioService.readAllBios().subscribe( data => {
      this.misMinibios = [];
      data.forEach((doc : any) => {

        console.log(doc.id, "=>", doc.data());

        let newBio: MiniBio = doc.data();
        newBio.id = doc.id;
        this.misMinibios.push(newBio);
      })
    })
  }

  deleteBio(idbio : any){
    this.bioService.deleteMinibio(idbio).then(success => {
      this.notifier.notify('success', 'Eliminado')
      this.loadAllBios();
    }).catch(error => {
      this.notifier.notify('error', 'Error')
    })
  }

  editBio(idBio : any){
    this.router.navigate(["edit/" + idBio]);
  }

  visit(id: any) {
    const uid = this.authService.userData().uid
    this.router.navigate(["bio/" + uid + "/" + id])
  }

}
