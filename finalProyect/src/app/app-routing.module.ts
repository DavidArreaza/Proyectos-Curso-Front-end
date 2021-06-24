import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MenulateralComponent } from './menulateral/menulateral.component';
import { ContentmainComponent } from './contentmain/contentmain.component';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  {path: '', component: ContentmainComponent},
  //{path: 'sidebar', component: MenulateralComponent}
  {path: 'login', component: LoginComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'details', component: DetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
