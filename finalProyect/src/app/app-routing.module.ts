import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MenulateralComponent } from './menulateral/menulateral.component';
import { ContentmainComponent } from './contentmain/contentmain.component';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';
import { DetallesComponent } from './detalles/detalles.component';
import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes = [
  {path: '', component: ContentmainComponent},
  //{path: 'sidebar', component: MenulateralComponent}
  {path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  {path: 'signin', component: SigninComponent},
  {path: 'detalles', component: DetallesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
